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
