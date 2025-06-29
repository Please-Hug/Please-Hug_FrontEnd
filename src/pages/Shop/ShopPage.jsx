import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/Shop/ProductCard";
import { useNavigate, useLocation } from "react-router-dom";

function ShopPage() {
    const [products, setProducts] = useState([]);
    const [userPoint, setUserPoint] = useState(0);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const isShopPage = location.pathname === "/shop";

    const fetchShopItems = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await axios.get("http://localhost:8080/api/v1/shop", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const items = response.data?.data;
            setProducts(Array.isArray(items) ? items : []);

            if (response.data?.userPoint != null) {
                setUserPoint(response.data.userPoint);
            }
        } catch (err) {
            console.error("상품 목록 요청 실패:", err);
            setError("상품을 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        fetchShopItems();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>상점</h1>

            {/* 상단 버튼 */}
            <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: isShopPage ? "#d0f0ff" : "#f0f0f0",
                    }}
                    onClick={() => navigate("/shop")}
                >
                    상품 목록
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: !isShopPage ? "#d0f0ff" : "#f0f0f0",
                    }}
                    onClick={() => navigate("/shopHistory")}
                >
                    구매 현황
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {products.length === 0 ? (
                    <p>상품이 없습니다.</p>
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            userPoint={userPoint}
                            onPurchaseSuccess={fetchShopItems}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
};

export default ShopPage;
