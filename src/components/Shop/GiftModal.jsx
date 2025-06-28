import { useState } from "react";
import axios from "axios";

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
            const accessToken = localStorage.getItem("accessToken");

            await axios.post(
                "http://localhost:8080/api/v1/shop/purchase",
                {
                    productId: product.id,
                    receiverUsername,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

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
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>🎁 {product.name} 선물하기</h2>

                <p>가격: {product.price} 포인트</p>

                <label>
                    받는 사람 Username:
                    <input
                        type="text"
                        value={receiverUsername}
                        onChange={(e) => setReceiverUsername(e.target.value)}
                        style={inputStyle}
                        placeholder="상대 username 입력"
                    />
                </label>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
                    <button onClick={onClose}>취소</button>
                    <button onClick={handlePurchase} disabled={loading}>
                        {loading ? "주문 중..." : "주문하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
};

const modalStyle = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

const inputStyle = {
    width: "100%",
    marginTop: "0.5rem",
    padding: "0.5rem",
    fontSize: "1rem",
};

export default GiftModal;