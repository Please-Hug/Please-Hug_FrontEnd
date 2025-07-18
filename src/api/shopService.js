import api from "./axiosInstance";

export const getShopItems = async () => {
  try {
    const response = await api.get("/api/v1/shop");
    return response.data;
  } catch (error) {
    console.error("상품 목록 요청 실패:", error);
    throw new Error("상품을 불러오지 못했습니다.");
  }
};

export const deleteShopItem = async (itemId) => {
  try {
    const response = await api.delete(`/api/v1/admin/shop/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("상품 삭제 실패:", error);
    throw new Error("상품 삭제에 실패했습니다.");
  }
};

export const editShopItem = async (itemId, formData) => {
  try {
    const response = await api.put(`/api/v1/admin/shop/${itemId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("상품 수정 실패:", error);
    throw new Error("상품 수정에 실패했습니다.");
  }
};
