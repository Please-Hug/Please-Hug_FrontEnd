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

export const myChallenges = async (groupId) => {
  try {
    const response = await api.get(
      `/api/v1/mission-groups/${groupId}/challenges`
    );
    return response.data;
  } catch (error) {
    console.error("내 도전 과제 가져오기 실패:", error);
    throw error;
  }
};

export const challengeMission = async (missionId) => {
  try {
    const response = await api.post(`/api/v1/missions/${missionId}/challenges`);
    return response.data;
  } catch (error) {
    console.error("미션 도전 실패:", error);
    throw error;
  }
};
