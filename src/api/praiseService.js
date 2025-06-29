import { th } from "date-fns/locale";
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

// 칭찬 상세조회
export const getPraiseDetail = async (praiseId) => {
    try{
        const response = await api.get(`/api/v1/praises/${praiseId}`);
        return response.data.data;
    } catch (error){
        console.error("칭찬 상세 조회 실패:", error);
        throw error;
    }
};

// 댓글 작성
export const postComment = async (praiseId, content) => {
    try{
        const response = await api.post(`/api/v1/praises/${praiseId}/comments`, {
            content: content
        });
        return response.data.data;
    } catch (error){
        console.error("댓글 작성 실패:", error);
        throw error;
    }
};

// 댓글에 반응 작성
export const addCommentEmojiReaction = async (praiseId, commentId, emoji) => {
    try{
        const response = await api.post(`/api/v1/praises/${praiseId}/comments/${commentId}/emojis`, {
            emoji,
        });
        return response.data.data;
    } catch(error){
        console.error("댓글 이모지 반응 등록 실패:", error);
        throw error;
    }
};

// 댓글에 반응 삭제
export const deleteCommentEmojiReaction = async (praiseId,commentId,emojiId) => {
    try{
        await api.delete(`/api/v1/praises/${praiseId}/comments/${commentId}/emojis/${emojiId}`);
    } catch (error){
        console.error("댓글 이모지 반응 삭제 실패:",error);
        throw err;
    }
}