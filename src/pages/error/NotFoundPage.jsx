import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div style={{ textAlign: "center", marginTop: "10vh" }}>
    <h1>404</h1>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</p>
    <Link to="/">홈으로 돌아가기</Link>
  </div>
);

export default NotFoundPage;
