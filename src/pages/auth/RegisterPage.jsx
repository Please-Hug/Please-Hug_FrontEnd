import React from "react";
import styles from "./RegisterPage.module.scss";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div>
      <form className={styles.registerForm} action="/login" method="POST">
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="이메일 또는 아이디"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            required
          />
          <FaEyeSlash className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password-confirmation"
            name="password-confirmation"
            placeholder="비밀번호 확인"
            required
          />
          <FaEyeSlash className={styles.inputIcon} />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름 (2-32자)"
            required
          />
        </div>
        <div>
          <button type="submit">회원가입</button>
        </div>
        <div className={styles.footer}>
          <div className={styles.areYouUser}>
            이미 계정이 있으세요?
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
