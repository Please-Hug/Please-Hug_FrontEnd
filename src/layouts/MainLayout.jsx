import React from "react";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb";
import styles from "./MainLayout.module.scss";

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <Sidebar />
      <div className={styles.content}>
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
