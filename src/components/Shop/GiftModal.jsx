import { useState } from "react";
import styles from "./GiftModal.module.scss";
import apiInstance from "../../api/axiosInstance.js";

const GiftModal = ({ product, onClose, onSuccess }) => {
  const [receiverUsername, setReceiverUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePurchase = async () => {
    if (!receiverUsername) {
      setError("받는 사람의 username을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await apiInstance.post("/api/v1/shop/purchase", {
        productId: product.id,
        receiverUsername,
      });

      alert("주문이 완료되었습니다.");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "주문에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>🎁 {product.name} 선물하기</h2>

        <p>가격: {product.price} 포인트</p>

        <label>
          받는 사람 Username:
          <input
            type="text"
            value={receiverUsername}
            onChange={(e) => setReceiverUsername(e.target.value)}
            className={styles.input}
            placeholder="상대 username 입력"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonContainer}>
          <button onClick={onClose}>취소</button>
          <button onClick={handlePurchase} disabled={loading}>
            {loading ? "주문 중..." : "주문하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftModal;
