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

export const getMissionTasks = async (missionId) => {
  try {
    const response = await api.get(`/api/v1/missions/${missionId}/tasks`);
    return response.data;
  } catch (error) {
    console.error("미션 작업 가져오기 실패:", error);
    throw error;
  }
};

export const getMissionMyTasks = async (missionId) => {
  try {
    const response = await api.get(`/api/v1/missions/${missionId}/my-tasks`);
    return response.data;
  } catch (error) {
    console.error("내 미션 작업 가져오기 실패:", error);
    throw error;
  }
};

export const changeMissionTaskState = async (taskId, state) => {
  try {
    const response = await api.post(`/api/v1/mission-tasks/${taskId}/${state}`);
    return response.data;
  } catch (error) {
    console.error("미션 작업 상태 변경 실패:", error);
    throw error;
  }
};

export const getMissionGroupMembers = async (groupId) => {
  try {
    const response = await api.get(`/api/v1/mission-groups/${groupId}/users`);
    return response.data;
  } catch (error) {
    console.error("미션 그룹 멤버 가져오기 실패:", error);
    throw error;
  }
};

export const changeChallengeState = async (challengeId, state) => {
  try {
    const response = await api.patch(
      `/api/v1/challenges/${challengeId}?newProgress=${state}`,
      "no content"
    );
    return response.data;
  } catch (error) {
    console.error("챌린지 상태 변경 실패:", error);
    throw error;
  }
};

export const getMissionDetail = async (missionId) => {
  try {
    const response = await api.get(`/api/v1/missions/${missionId}`);
    return response.data;
  } catch (error) {
    console.error("미션 상세 정보 가져오기 실패:", error);
    throw error;
  }
};
