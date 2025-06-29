import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiInstance from "../../api/axiosInstance.jsx";
import styles from "./ShopHistoryPage.module.scss";

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
            let url = "/api/v1/shop/history";
            if (startDate && endDate) {
                url += `?startDate=${startDate}&endDate=${endDate}`;
            }

            const response = await apiInstance.get(url);
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
        <div className={styles.container}>
            <h1>구매 현황</h1>

            <div className={styles.filterContainer}>
                <div className={styles.buttonGroup}>
                    <button
                        className={`${styles.button} ${isShopPage ? styles.active : ''}`}
                        onClick={() => navigate("/shop")}
                    >
                        상품 목록
                    </button>
                    <button
                        className={`${styles.button} ${!isShopPage ? styles.active : ''}`}
                        onClick={() => navigate("/shopHistory")}
                    >
                        구매 현황
                    </button>
                </div>

                <div className={styles.dateFilter}>
                    <label>시작일:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.input}
                    />
                    <label>종료일:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.input}
                    />
                    <button className={`${styles.button} ${styles.searchButton}`} onClick={fetchHistory}>
                        조회
                    </button>
                </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {orders.length === 0 ? (
                <p>구매 내역이 없습니다.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>이미지</th>
                        <th>브랜드</th>
                        <th>상품명</th>
                        <th>포인트</th>
                        <th>수령자 번호</th>
                        <th>주문 시간</th>
                        <th>재발송</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, idx) => (
                        <tr key={idx}>
                            <td>
                                <img
                                    src={order.imageUrl ? `${order.imageUrl}` : "/default-product.png"}
                                    alt={order.name}
                                    className={styles.productImage}
                                />
                            </td>
                            <td>{order.brand}</td>
                            <td>{order.name}</td>
                            <td>{order.price}</td>
                            <td>{order.receiverPhoneNumber}</td>
                            <td>{new Date(order.orderTime).toLocaleString("ko-KR")}</td>
                            <td>
                                <button className={styles.button} onClick={() => handleResend(order)}>
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

export default ShopHistoryPage;