/*
 * @Author: puck.solo 
 * @Date: 2017-09-30 23:56:02 
 * @Last Modified by: puck.solo
 * @Last Modified time: 2017-11-20 18:16:14
 */

import React from 'react';
import styles from './styles.css';

const qs = (key) => {
  key = key.replace(/[*+?^$.[\]{}()|\\/]/g, '\\$&'); // escape RegEx meta chars
  const match = window.location.search.match(new RegExp(`[?&]${key}=([^&]+)(&|$)`));
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const App = () => (
  <div className={styles.block}>
    <div className={styles.block__header}>
      Get Access Token
    </div>
    <div className={styles.block__body}>
      {(qs('token') &&
        <div className={styles.success}>
          <div className={styles.success__header}>
            Your token
          </div>
          <div className={styles.success__data}>
            Access token: {qs('token')}
          </div>
          <div className={styles.success__data}>
            Refresh token: {qs('refresh_token')}
          </div>
          <div className={styles.success__header}>
            Scope
          </div>
          <div className={styles.success__data}>
            identify
          </div>
        </div>
      )
      ||
        <a
          href="/api/moph/login"
          className={styles.login_button}
        >
          Login through KKH
        </a>
      }
    </div>
    {/* <div className={styles.block__footer}>
      This website is not affiliated with <a href="https://www.moph.go.th/">MINISTRY OF PUBLIC HEALTH</a>
    </div> */}
    <div className={styles.block__footer}>
      I do not save anything. <a href="https://github.com/devilhanzo/moph-token-generator">See sources</a>
    </div>
  </div>
);

export default App;
