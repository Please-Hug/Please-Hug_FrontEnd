import api from "./axiosInstance";


// 칭찬 제출 시 백엔드로 전달
export const submitPraise = async ({ receivers, praiseContent, praiseType }) => {
    try{
        const payload = {
            receiverUsername: receivers.map((r) => r.username),
            content: praiseContent,
            type: praiseType,
        };

        await api.post("/api/v1/praises", payload);
    
    } catch (err){
        console.error("칭찬 제출 실패:", err);
        throw err;
    }
};
        


// 반응 좋은 칭찬글 가져오기
export const getPopularPraises = async (startDate, endDate) => {
    try{
        const response = await api.get("/api/v1/praises/popular", {
            params: { startDate, endDate }
        });
        return response.data.data;
    } catch(err){
        console.error("인기 칭찬글 불러오기 실패:", err);
        throw err;
    }
};

// 칭찬 리스트 조회 ( 검색, 날짜, me 포함 )
export const getPraises = async ({ keyword, me, startDate, endDate }) => {
    try {
        const response = await api.get("/api/v1/praises/search", {
            params: {
                keyword,
                me,
                startDate,
                endDate,
            },
        });
        return response.data.data;
    } catch (err) {
        console.error("칭찬 조회 실패:", err);
        throw err;
    }
};

// 칭찬 게시물에 이모지 반응 추가
export const addEmojiReaction = async (praiseId, emoji) => {
    try{
        const response = await api.post(`/api/v1/praises/${praiseId}/emojis`,{
            emoji: emoji
        });
        return response.data.data;
    }catch(err){
        console.error("이모지 반응 등록 실패:", err);
        throw err;
    }
};

// 칭찬 게시물에 이모지 반응 삭제
export const deleteEmojiReaction = async (praiseId, emojiId) => {
    try{
        await api.delete(`/api/v1/praises/${praiseId}/emojis/${emojiId}`);
    } catch (err){
        console.error("이모지 반응 삭제 실패:",err);
        throw err;
    }
};
