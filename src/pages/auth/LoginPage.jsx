import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../api/baseUrl";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.username.trim().length < 4 || form.username.length > 32) {
      alert("아이디는 4자 이상 32자 이하로 입력해야 합니다.");
      return;
    }

    if (form.password.length < 8 || form.password.length > 60) {
      alert("비밀번호는 8자 이상 60자 이하로 입력해야 합니다.");
      return;
    }

    try {
      const response = await axios.post(
        BASE_URL + "/api/login",
        {
          username: form.username.trim(),
          password: form.password,
        },
        { withCredentials: true }
      );

      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert(
        err.response?.data?.message || "로그인 요청 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="이메일 또는 아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <FaEyeSlash className={styles.inputIcon} />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div className={styles.footer}>
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">로그인 상태 유지</label>
          </div>
          <div className={styles.links}>
            <Link to="/reset-password">비밀번호 재설정</Link>
            <Link to="/register">회원가입</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
