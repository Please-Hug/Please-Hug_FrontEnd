import { useState } from "react";
import apiInstance from "../../api/axiosInstance.js";
import Modal from "../../components/common/Modal/Modal.jsx";

function AdminShopPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    quantity: 0,
    price: 0,
    image: null,
  });

  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      await apiInstance.post("/api/v1/admin/shop", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ 상품 등록 완료!");
      setFormData({ name: "", brand: "", quantity: 0, price: 0, image: null });
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
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2>🛒 상품 등록</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          name="name"
          placeholder="상품명"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="브랜드"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="수량"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="포인트 가격"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
          상품 등록
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>🗑️ 상품 삭제</h2>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="number"
          placeholder="삭제할 상품 ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={{ flex: 1 }}
        />
        <button
          onClick={handleDelete}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          삭제
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.includes("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AdminShopPage;
