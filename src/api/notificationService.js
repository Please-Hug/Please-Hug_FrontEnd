import api from "./axiosInstance";
import { EventSourcePolyfill } from "event-source-polyfill";

// 알림 목록 조회
export async function fetchNotifications() {
    try {
        const response = await api.get("/api/v1/notifications");
        console.log("알림 목록 조회 성공:", response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("알림 목록 조회 실패:", error);
        return [];  // 기본값으로 빈 배열 반환
    }
}

// 알림 전체 읽음 처리
export async function markAllAsRead() {
    try {
        await api.patch("/api/v1/notifications/read-all");
    } catch (error) {
        console.error("전체 읽음 처리 실패:", error);
    }
}

// 개별 알림 읽음 처리
export async function markAsRead(notificationId) {
    try {
        await api.patch(`/api/v1/notifications/${notificationId}/read`);
    } catch (error) {
        console.error(`알림 ID ${notificationId} 읽음 처리 실패:`, error);
    }
}



// 알림 SSE 구독 함수 (헤더 방식)
export function subscribeToNotifications(onMessageCallback) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        console.warn("accessToken이 없습니다. 로그인 상태를 확인하세요.");
        return null;
    }

    const eventSource = new EventSourcePolyfill(
        "http://localhost:8080/api/v1/notifications/subscribe",  // 백엔드에서 사용자 정보는 토큰으로 파싱
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true, // 쿠키 기반 인증을 함께 사용할 경우 필요
        }
    );

    eventSource.onopen = () => {
        console.log("SSE 연결이 열렸습니다.");
    };

    eventSource.addEventListener("notification", (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log("SSE 수신 데이터:", data);
            onMessageCallback(data);
        } catch (error) {
            console.error("SSE 수신 데이터 파싱 실패:", error);
        }
    });

    eventSource.onerror = (error) => {
        console.error("SSE 연결 오류 발생:", error);
        eventSource.close();
    };

    eventSource.onclose = () => {
        console.log("SSE 연결이 닫혔습니다.");
    };

    return eventSource;
}