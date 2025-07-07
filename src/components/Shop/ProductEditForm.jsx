import React from "react";
import { useState } from "react";
import styles from "./ProductEditForm.module.scss";
import { editShopItem } from "../../api/shopService.js";

function ProductEditForm({ product, onChange }) {
  const [selectedProductEdit, setSelectedProductEdit] = useState(product);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", selectedProductEdit.name);
    formData.append("brand", selectedProductEdit.brand);
    formData.append("price", selectedProductEdit.price);
    formData.append("quantity", selectedProductEdit.quantity);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await editShopItem(selectedProductEdit.id, formData);
      alert("상품이 수정되었습니다.");
      if (onChange) {
        onChange(selectedProductEdit);
      }
    } catch (error) {
      console.error("상품 수정 실패:", error);
      alert("상품 수정에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>상품명:</label>
        <input
          type="text"
          value={selectedProductEdit?.name || ""}
          onChange={(e) =>
            setSelectedProductEdit({
              ...selectedProductEdit,
              name: e.target.value,
            })
          }
          required
        />
        <label>브랜드:</label>
        <input
          type="text"
          value={selectedProductEdit?.brand || ""}
          onChange={(e) =>
            setSelectedProductEdit({
              ...selectedProductEdit,
              brand: e.target.value,
            })
          }
          required
        />
        <label>가격:</label>
        <input
          type="number"
          value={selectedProductEdit?.price || ""}
          onChange={(e) =>
            setSelectedProductEdit({
              ...selectedProductEdit,
              price: e.target.value,
            })
          }
          required
        />
        <label>수량:</label>
        <input
          type="number"
          value={selectedProductEdit?.quantity || ""}
          onChange={(e) =>
            setSelectedProductEdit({
              ...selectedProductEdit,
              quantity: e.target.value,
            })
          }
          required
        />
        <label>이미지</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImageFile(file);
            }
          }}
        />

        <input type="submit" value="수정" className={styles.submitButton} />
      </div>
    </form>
  );
}

export default ProductEditForm;
