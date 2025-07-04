import { useEffect, useState } from "react";
import apiInstance from "../../api/axiosInstance.jsx";
import ProductCard from "../../components/Shop/ProductCard";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ShopPage.module.scss";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [userPoint, setUserPoint] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isShopPage = location.pathname === "/shop";

  const fetchShopItems = async () => {
    try {
      const response = await apiInstance.get("/api/v1/shop");

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
    <div className={styles.container}>
      <h2>상점</h2>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${isShopPage ? styles.active : ""}`}
          onClick={() => navigate("/shop")}
        >
          상품 목록
        </button>
        <button
          className={`${styles.button} ${!isShopPage ? styles.active : ""}`}
          onClick={() => navigate("/shopHistory")}
        >
          구매 현황
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.productList}>
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

export default ShopPage;
