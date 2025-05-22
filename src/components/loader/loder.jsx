import React from 'react';
import styles from './loader.module.css';

const LoaderBar = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.progress}>
        <div className={styles.indicator}></div>
      </div>
    </div>
  );
};

export default LoaderBar;
