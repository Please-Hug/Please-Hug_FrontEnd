import { useLocation, useNavigate } from "react-router-dom";

const ShopHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isHistoryPage = location.pathname.includes("shopHistory");

    return (
        <>
            <h1>상점</h1>
            <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: isHistoryPage ? "#f0f0f0" : "#007bff",
                        color: isHistoryPage ? "#000" : "#fff",
                    }}
                    onClick={() => navigate("/shop")}
                >
                    상품 목록
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: isHistoryPage ? "#007bff" : "#f0f0f0",
                        color: isHistoryPage ? "#fff" : "#000",
                    }}
                    onClick={() => navigate("/shop/shopHistory")}
                >
                    구매 현황
                </button>
            </div>
        </>
    );
};

const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
};

export default ShopHeader;