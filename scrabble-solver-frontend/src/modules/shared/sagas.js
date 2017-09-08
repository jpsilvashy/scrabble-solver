import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { Result } from 'scrabble-solver-commons/models';
import { applyResult } from 'board/state';
import { CHANGE_CONFIG } from 'config/state';
import {
  changeInput as changeDictionaryInput,
  submit as submitDictionary
} from 'dictionary/state';
import { HIGHLIGHT_RESULT, UNHIGHLIGHT_RESULT, changeResults, clearFilter } from 'results/state';
import { APPLY_RESULT, changeResultCandidate } from 'shared/state';
import { SUBMIT as SUBMIT_TILES, clearInput as clearTiles } from 'tiles/state';
import { selectBoard } from 'board/selectors';
import { selectResultsList } from 'results/selectors';
import { selectInputTiles } from 'tiles/selectors';
import { selectConfig } from 'config/selectors';
import { submitSolve, submitSolveFailure, submitSolveSuccess } from './state';
import { postSolve } from 'api';

export default function* modulesSagas() {
  yield takeLatest(APPLY_RESULT, onApplyResult);
  yield takeLatest(HIGHLIGHT_RESULT, onHighlightResult);
  yield takeLatest(UNHIGHLIGHT_RESULT, onUnhighlightResult);
  yield takeEvery([ SUBMIT_TILES, CHANGE_CONFIG ], onTilesSubmit);
}

function* onApplyResult({ payload: id }) {
  const results = yield select(selectResultsList);
  const result = getResultById(results, id);
  yield put(applyResult(result));
  yield put(clearFilter());
  yield put(clearTiles());
  yield put(changeResults([]));
}

function* onHighlightResult({ payload: id }) {
  const results = yield select(selectResultsList);
  const result = getResultById(results, id);
  yield put(changeDictionaryInput(result.word));
  yield put(submitDictionary());
  yield put(changeResultCandidate(result));
}

function* onUnhighlightResult() {
  yield put(changeResultCandidate(null));
}

function* onTilesSubmit() {
  const config = yield select(selectConfig);
  const board = yield select(selectBoard);
  const tiles = yield select(selectInputTiles);
  if(tiles.length > 0) {
    try {
      yield put(submitSolve());
      const results = yield call(postSolve, {
        config: config.toJson(),
        board: board.toJson(),
        tiles: tiles.map((tile) => tile.toJson())
      });
      yield put(submitSolveSuccess());
      yield put(changeResults(results.map(Result.fromJson)));
    } catch (error) {
      yield put(changeResults([]));
      yield put(submitSolveFailure(error));
    }
  }
}

const getResultById = (results, id) => results.find((result) => result.id === id);