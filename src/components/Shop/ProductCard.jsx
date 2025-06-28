import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../../stores/userStore";

const ProductCard = ({ product, onPurchaseSuccess }) => {
    const { id, name, brand, imageUrl, available, price, quantity } = product;
    const [imageSrc, setImageSrc] = useState("/default-product.png");

    const userInfo = useUserStore((state) => state.userInfo);
    const userPoint = userInfo?.point ?? 0;

    useEffect(() => {
        let objectUrl;

        const fetchImage = async () => {
            if (!imageUrl) return;

            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await fetch(`http://localhost:8080${imageUrl}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (!response.ok) throw new Error(`이미지 로드 실패: ${response.status}`);

                const blob = await response.blob();
                objectUrl = URL.createObjectURL(blob);
                setImageSrc(objectUrl);
            } catch (err) {
                console.error("이미지 불러오기 실패:", err);
                setImageSrc("/default-product.png");
            }
        };

        fetchImage();
        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [imageUrl]);

    const handlePurchase = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const decoded = jwtDecode(accessToken);
            const receiverUsername = decoded.sub;

            await axios.post(
                "http://localhost:8080/api/v1/shop/purchase",
                { productId: id, receiverUsername },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            alert("구매 완료!");
            if (onPurchaseSuccess) onPurchaseSuccess();
        } catch (error) {
            console.error("구매 실패:", error);
            alert("구매에 실패했습니다.");
        }
    };

    const isAffordable = userPoint >= price;

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "600px",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "#fff",
                gap: "1rem",
            }}
        >
            <img
                src={imageSrc}
                alt={name}
                style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                }}
            />
            <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.9rem", color: "#888", margin: 0 }}>{brand}</p>
                <h3 style={{ fontSize: "1.1rem", margin: "0.2rem 0" }}>{name}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem", margin: "0.2rem 0 0.8rem" }}>
                    {quantity}개 남음
                </p>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "1rem" }}>
                    가격 : {price} 포인트
                </div>

                {isAffordable && available ? (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => alert("선물 기능은 유지")} style={buttonStyle}>
                            🎁 선물
                        </button>
                        <button onClick={handlePurchase} style={buttonStyle}>
                            🛒 구매
                        </button>
                    </div>
                ) : (
                    <div
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#f0f0f5",
                            color: "#888",
                            borderRadius: "8px",
                            textAlign: "center",
                            fontWeight: "500",
                            width: "fit-content",
                        }}
                    >
                        구름 조각이 부족해요!
                    </div>
                )}
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};

export default ProductCard;
