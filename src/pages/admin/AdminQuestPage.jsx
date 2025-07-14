import React, { useState } from "react";
import apiInstance from "../../api/axiosInstance";

function AdminQuestPage() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleAssignQuests = async () => {
        if (!username) {
            setMessage("⚠️ username을 입력해주세요.");
            return;
        }
        try {
            await apiInstance.post(`/api/v1/admin/quest/assign/${username}`);
            setMessage(`✅ ${username}에게 퀘스트 할당 완료`);
        } catch (error) {
            console.error(error);
            setMessage("❌ 퀘스트 할당 실패");
        }
    };

    const handleResetQuests = async () => {
        try {
            await apiInstance.put("/api/v1/admin/quest/reset");
            setMessage("✅ 퀘스트 리셋 완료");
        } catch (error) {
            console.error(error);
            setMessage("❌ 퀘스트 리셋 실패");
        }
    };

    return (
        <div>
            <h2>🛠️ Admin 퀘스트 페이지</h2>

            <div>
                <input
                    type="text"
                    placeholder="username 입력"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleAssignQuests} >
                    퀘스트 할당 (assign)
                </button>
            </div>

            <div>
                <button onClick={handleResetQuests}>
                    퀘스트 리셋 (매일 자정 00:00시 주기적으로 호출되는 기능)
                </button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminQuestPage;