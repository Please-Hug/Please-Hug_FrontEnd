import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <ul>
            <li>
              <Link to="#">이용약관</Link>
            </li>
            <li>
              <Link to="#">개인정보처리방침</Link>
            </li>
          </ul>
          <p className={styles.footerText}>© hug Inc. All rights reserved.</p>
          <ul>
            <li>
              <Link to="#">한국어</Link>
            </li>
            <li>
              <Link to="#">English</Link>
            </li>
            <li>
              <Link to="#">日本語</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
