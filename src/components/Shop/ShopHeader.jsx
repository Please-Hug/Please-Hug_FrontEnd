import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ShopHeader.module.scss";

const ShopHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isHistoryPage = location.pathname.includes("shopHistory");

    return (
        <div className={styles.shopHeader}>
            <h1>상점</h1>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${!isHistoryPage ? styles.active : ''}`}
                    onClick={() => navigate("/shop")}
                >
                    상품 목록
                </button>
                <button
                    className={`${styles.button} ${isHistoryPage ? styles.active : ''}`}
                    onClick={() => navigate("/shopHistory")}
                >
                    구매 현황
                </button>
            </div>
        </div>
    );
};

export default ShopHeader;