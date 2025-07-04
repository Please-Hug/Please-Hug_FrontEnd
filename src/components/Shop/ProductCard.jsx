import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../../stores/userStore";
import apiInstance from "../../api/axiosInstance.js";
import styles from "./ProductCard.module.scss";
import GiftModal from "./GiftModal.jsx";
import { FaGift } from "react-icons/fa6";
import useTokenPayload from "../../stores/tokenPayloadStore.js";
import { deleteShopItem } from "../../api/shopService.js";

const ProductCard = ({ product, onPurchaseSuccess, onEdit }) => {
  const { id, name, brand, imageUrl, available, price, quantity } = product;
  const [imageSrc, setImageSrc] = useState("/default-product.png");
  const [showGiftModal, setShowGiftModal] = useState(false);

  const userInfo = useUserStore((state) => state.userInfo);
  const userPoint = userInfo?.point ?? 0;

  const tokenPayload = useTokenPayload((state) => state.tokenPayload);

  useEffect(() => {
    let objectUrl;

    const fetchImage = async () => {
      if (!imageUrl) return;

      try {
        const response = await apiInstance.get(imageUrl, {
          responseType: "blob",
        });
        objectUrl = URL.createObjectURL(response.data);
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
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const decoded = jwtDecode(accessToken);
      const receiverUsername = decoded.sub;

      await apiInstance.post("/api/v1/shop/purchase", {
        productId: id,
        receiverUsername,
      });

      alert("구매 완료!");
      if (onPurchaseSuccess) onPurchaseSuccess();
    } catch (error) {
      console.error("구매 실패:", error);
      alert("구매에 실패했습니다.");
    }
  };

  const isAffordable = userPoint >= price;

  return (
    <div className={styles.productCard}>
      <img src={imageSrc} alt={name} className={styles.productImage} />
      <div className={styles.productInfo}>
        {["ADMIN", "ROLE_ADMIN"].includes(tokenPayload?.role) && (
          <div className={styles.adminActions}>
            <button
              className={styles.editButton}
              onClick={() => {
                if (onEdit) onEdit(product);
              }}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => {
                if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
                  deleteShopItem(id)
                    .then(() => {
                      alert("상품이 삭제되었습니다.");
                      if (onPurchaseSuccess) onPurchaseSuccess(); // Refresh UI without reload
                      // 추가적인 삭제 후 작업
                    })
                    .catch((error) => {
                      console.error("상품 삭제 중 오류 발생:", error);
                      alert("상품 삭제에 실패했습니다.");
                    });
                }
              }}
            >
              Delete
            </button>
          </div>
        )}
        <p className={styles.brand}>{brand}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.quantity}>{quantity}개 남음</p>
        <div className={styles.price}>가격 : {price} 포인트</div>

        {isAffordable && available ? (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => setShowGiftModal(true)}
              className={[styles.button, styles.gift].join(" ")}
            >
              <FaGift />
            </button>
            <button
              onClick={handlePurchase}
              className={[styles.button, styles.buy].join(" ")}
            >
              구매
            </button>
          </div>
        ) : (
          <div className={styles.unavailable}>구름 조각이 부족해요!</div>
        )}
      </div>

      {showGiftModal && (
        <GiftModal
          product={product}
          onClose={() => setShowGiftModal(false)}
          onSuccess={() => {
            setShowGiftModal(false);
            if (onPurchaseSuccess) onPurchaseSuccess();
          }}
        />
      )}
    </div>
  );
};

export default ProductCard;
