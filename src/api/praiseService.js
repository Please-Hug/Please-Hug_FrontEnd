import api from "./axiosInstance";


{/* 칭찬 제출 시 백엔드로 전달 */}
export const submitPraise = async ({ receivers, praiseContent, praiseType, onClose }) => {
    try{
        const payload = {
            receiverUsername: receivers.map((r) => r.username),
            content: praiseContent,
            type: praiseType,
        };

        await api.post("/api/v1/praises", payload);
        onClose();
    } catch (err){
        console.error("칭찬 제출 실패:", err);
    }
};
        