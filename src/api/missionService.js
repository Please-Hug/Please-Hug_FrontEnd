import api from "./axiosInstance";

export const getMyMissionGroups = async () => {
  try {
    const response = await api.get("/api/v1/mission-groups/my");
    return response.data;
  } catch (error) {
    console.error("미션 그룹 가져오기 실패:", error);
    throw error;
  }
};

export const getMissions = async (groupId) => {
  try {
    const response = await api.get(
      `/api/v1/mission-groups/${groupId}/missions`
    );
    return response.data;
  } catch (error) {
    console.error("미션 그룹 상세 정보 가져오기 실패:", error);
    throw error;
  }
};
