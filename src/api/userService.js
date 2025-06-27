import api from "./axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/v1/user");
    return response.data;
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    throw error;
  }
};

export const searchUsers = async (keyword = "") => {
  try{
    const response = await api.get("/api/v1/users",{
      params: { keyword },
    });
    return response.data.data;
  } catch (error){
    console.error("유저 검색 실패:", error);
    throw [];
  } 
};