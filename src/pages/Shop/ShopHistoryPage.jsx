import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ShopHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const isShopPage = location.pathname === "/shop";

    const fetchHistory = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            let url = "http://localhost:8080/api/v1/shop/history";
            if (startDate && endDate) {
                url += `?startDate=${startDate}&endDate=${endDate}`;
            }

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            setOrders(response.data?.data || []);
        } catch (err) {
            console.error("구매 내역 요청 실패:", err);
            setError("구매 내역을 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleResend = (order) => {
        alert(`재발송 요청: ${order.name} (${order.receiverPhoneNumber})`);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>구매 현황</h1>

            {/* 버튼 + 날짜 필터 영역 */}
            <div
                style={{
                    marginBottom: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* 좌측: 버튼 */}
                <div style={{ display: "flex", gap: "1rem" }}>
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

                {/* 우측: 날짜 필터 */}
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                    <label>시작일:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={inputStyle}
                    />
                    <label>종료일:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={inputStyle}
                    />
                    <button style={{ ...buttonStyle, backgroundColor: "#e0f7df" }} onClick={fetchHistory}>
                        조회
                    </button>
                </div>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {orders.length === 0 ? (
                <p>구매 내역이 없습니다.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                        <th style={thStyle}>이미지</th>
                        <th style={thStyle}>브랜드</th>
                        <th style={thStyle}>상품명</th>
                        <th style={thStyle}>포인트</th>
                        <th style={thStyle}>수령자 번호</th>
                        <th style={thStyle}>주문 시간</th>
                        <th style={thStyle}>재발송</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, idx) => (
                        <tr key={idx}>
                            <td style={tdStyle}>
                                <img
                                    src={order.imageUrl ? `http://localhost:8080${order.imageUrl}` : "/default-product.png"}
                                    alt={order.name}
                                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                                />
                            </td>
                            <td style={tdStyle}>{order.brand}</td>
                            <td style={tdStyle}>{order.name}</td>
                            <td style={tdStyle}>{order.price}</td>
                            <td style={tdStyle}>{order.receiverPhoneNumber}</td>
                            <td style={tdStyle}>{new Date(order.orderTime).toLocaleString("ko-KR")}</td>
                            <td style={tdStyle}>
                                <button style={buttonStyle} onClick={() => handleResend(order)}>
                                    📦 재발송
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    backgroundColor: "#fff",
};

const thStyle = {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
};

const tdStyle = {
    padding: "0.75rem",
    borderBottom: "1px solid #eee",
};

const inputStyle = {
    padding: "0.4rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
};

export default ShopHistoryPage;
