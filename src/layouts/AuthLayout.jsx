import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import Footer from "../components/AuthLayout/Footer";

function AuthLayout() {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContent}>
        <h1 className={styles.logo}>HUG EXP</h1>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
