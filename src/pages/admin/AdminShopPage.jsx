import { useState } from "react";
import apiInstance from "../../api/axiosInstance.js";
import styles from './AdminShopPage.module.scss';

function AdminShopPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("imageUrl", formData.imageUrl);

    try {
      await apiInstance.post("/api/v1/admin/shop", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ 상품 등록 완료!");
      setFormData({ name: "", description: "", price: "", category: "", imageUrl: "" });
    } catch (err) {
      console.error("상품 등록 실패:", err);
      setMessage("❌ 상품 등록 실패");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      setMessage("❌ 삭제할 상품 ID를 입력하세요.");
      return;
    }

    try {
      await apiInstance.delete(`/api/v1/admin/shop/${deleteId}`);
      setMessage(`✅ 상품 ID ${deleteId} 삭제 완료`);
      setDeleteId("");
    } catch (err) {
      console.error("상품 삭제 실패:", err);
      setMessage("❌ 상품 삭제 실패");
    }
  };

  return (
    <div className={styles.AdminShopPage}>
      <h2 className={styles.title}>상점 관리</h2>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <h3>상품 등록</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="상품명"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <textarea
              name="description"
              placeholder="상품 설명"
              value={formData.description}
              onChange={handleChange}
              className={styles.textareaInput}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="가격"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="카테고리"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="url"
              name="imageUrl"
              placeholder="이미지 URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              상품 등록
            </button>
          </form>
        </div>

        <div className={styles.card}>
          <h3>상품 삭제</h3>
          <div className={styles.formGroup}>
            <input
              type="number"
              placeholder="삭제할 상품 ID"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className={styles.input}
            />
            <button 
              onClick={handleDelete} 
              className={`${styles.button} ${styles.deleteButton}`}
            >
              삭제
            </button>
          </div>
        </div>

        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
}

export default AdminShopPage;
