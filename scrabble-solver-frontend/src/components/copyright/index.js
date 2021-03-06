import React from 'react';
import Link from 'components/link';
import styles from './styles.scss';

const Copyright = () => (
  <div className={styles.copyright}>
    Copyright &copy; 2017
    <Link className={styles.name} href="http://kamilmielnik.com/">
      Kamil Mielnik
    </Link>
  </div>
);

export default Copyright;
