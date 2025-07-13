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

export const submitChallengeSubmission = async (missionId, formData) => {
  try {
    const response = await api.post(
      `/api/v1/challenges/${missionId}/submissions`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("챌린지 제출 실패:", error);
    throw error;
  }
};

export const getChallenge = async (missionId) => {
  try {
    const response = await api.get(`/api/v1/missions/${missionId}/challenges`);
    return response.data;
  } catch (error) {
    console.error("챌린지 정보 가져오기 실패:", error);
    throw error;
  }
};

export const getReward = async (userMissionId) => {
  try {
    const response = await api.post(
      `/api/v1/submissions/${userMissionId}/reward`
    );
    return response.data;
  } catch (error) {
    console.error("보상 받기 실패:", error);
    throw error;
  }
};

export const getMissionFeedback = async (userMissionId) => {
  try {
    const response = await api.get(`/api/v1/submissions/${userMissionId}`);
    return response.data;
  } catch (error) {
    console.error("미션 피드백 가져오기 실패:", error);
    throw error;
  }
};

export const updateMissionGroup = async (groupId, name, teacherUsername) => {
  try {
    const response = await api.put(`/api/v1/mission-groups/${groupId}`, {
      name,
      teacherUsername,
    });
    return response.data;
  } catch (error) {
    console.error("미션 그룹 수정 실패:", error);
    throw error;
  }
};

export const deleteMissionGroup = async (groupId) => {
  try {
    const response = await api.delete(`/api/v1/mission-groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("미션 그룹 삭제 실패:", error);
    throw error;
  }
};

export const addMissionGroup = async (name, teacherUsername) => {
  try {
    const response = await api.post("/api/v1/mission-groups", {
      name,
      teacherUsername,
    });
    return response.data;
  } catch (error) {
    console.error("미션 그룹 추가 실패:", error);
    throw error;
  }
};

export const addMission = async (newMission) => {
  try {
    const response = await api.post(`/api/v1/missions`, newMission);
    return response.data;
  } catch (error) {
    console.error("미션 추가 실패:", error);
    throw error;
  }
};

export const updateMission = async (missionId, updatedMission) => {
  try {
    const response = await api.put(
      `/api/v1/missions/${missionId}`,
      updatedMission
    );
    return response.data;
  } catch (error) {
    console.error("미션 수정 실패:", error);
    throw error;
  }
};

export const deleteMission = async (missionId) => {
  try {
    const response = await api.delete(`/api/v1/missions/${missionId}`);
    return response.data;
  } catch (error) {
    console.error("미션 삭제 실패:", error);
    throw error;
  }
};

export const updateMissionTask = async (taskId, updatedTask) => {
  try {
    const response = await api.put(
      `/api/v1/mission-tasks/${taskId}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    console.error("미션 태스크 수정 실패:", error);
    throw error;
  }
};

export const deleteMissionTask = async (taskId) => {
  try {
    const response = await api.delete(`/api/v1/mission-tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("미션 태스크 삭제 실패:", error);
    throw error;
  }
};

export const addMissionTask = async (missionId, newTask) => {
  try {
    const response = await api.post(
      `/api/v1/missions/${missionId}/tasks`,
      newTask
    );
    return response.data;
  } catch (error) {
    console.error("미션 태스크 추가 실패:", error);
    throw error;
  }
};

export const getChallengeList = async () => {
  try {
    const response = await api.get("/api/v1/challenges");
    return response.data;
  } catch (error) {
    console.error("챌린지 목록 가져오기 실패:", error);
    throw error;
  }
};

export const getChallengeDetail = async (challengeId) => {
  try {
    const response = await api.get(`/api/v1/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error("챌린지 상세 정보 가져오기 실패:", error);
    throw error;
  }
};

export const getChallengeSubmissions = async (challengeId) => {
  try {
    const response = await api.get(`/api/v1/submissions/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error("챌린지 제출물 가져오기 실패:", error);
    throw error;
  }
};

export const feedbackChallengeSubmission = async (challengeId, feedback) => {
  try {
    const response = await api.patch(
      `/api/v1/submissions/${challengeId}/feedback`,
      {
        feedback: feedback,
      }
    );
    return response.data;
  } catch (error) {
    console.error("챌린지 제출물 피드백 실패:", error);
    throw error;
  }
};
