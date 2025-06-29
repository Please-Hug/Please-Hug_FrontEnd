import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styles from "./MissionBoard.module.scss";
import { myChallenges, changeChallengeState } from "../../api/missionService";

/* 1. 컬럼 정의 */
const COLUMNS = [
  { id: "NOT_STARTED", title: "시작 전" },
  { id: "ABORTED", title: "중단 됨" },
  { id: "IN_PROGRESS", title: "진행 중" },
  { id: "COMPLETED", title: "완료" },
  { id: "IN_FEEDBACK", title: "피드백 중" },
  { id: "FEEDBACK_DONE", title: "피드백 완료" }, // FEEDBACK_COMPLETED + REWARD_RECEIVED
];

/* 3. state별 배열로 묶어 state화 */
function groupByState(list) {
  const grouped = {};
  COLUMNS.forEach((c) => (grouped[c.id] = []));
  list.forEach((t) => grouped[t.progress].push(t));
  return grouped;
}

function MissionBoard({ groupId }) {
  const [missions, setMissions] = useState([]);
  const [columns, setColumns] = useState(groupByState([]));
  const pendingRequests = useRef(new Set());

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await myChallenges(groupId);
        console.log("Fetched missions:", response.data);
        const newMissions = response.data.map((mission) => ({
          ...mission,
          kId: "k" + mission.id,
        }));
        setMissions(newMissions);
      } catch (error) {
        console.error("미션을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchMissions();
  }, [groupId]);

  useEffect(() => {
    setColumns(groupByState(missions));
  }, [missions]);

  /* 4. 드래그 종료 시 state 갱신 */
  const onDragEnd = ({ source, destination }) => {
    //draggableId
    if (!destination) return; // 밖으로 놓기 → 무시
    if (destination.droppableId === "FEEDBACK_DONE") return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return; // 제자리 → 무시

    setColumns((prev) => {
      // 1) 원본 컬럼 배열 복사
      const sourceTasks = Array.from(prev[source.droppableId]);
      // 2) 꺼낸 카드
      const [moved] = sourceTasks.splice(source.index, 1);

      // 3) 목적지 컬럼 배열 복사(같은 컬럼이면 sourceTasks 사용)
      const destTasks =
        source.droppableId === destination.droppableId
          ? sourceTasks
          : Array.from(prev[destination.droppableId]);

      // 4) state 바꿔주고 삽입
      moved.progress = destination.droppableId;
      handleStateChangeOnce(moved.id, destination.droppableId);
      destTasks.splice(destination.index, 0, moved);

      return {
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      };
    });
  };

  const handleStateChangeOnce = async (missionId, newState) => {
    const requestKey = `${missionId}-${newState}`;

    if (pendingRequests.current.has(requestKey)) {
      return; // 이미 요청 중이면 무시
    }

    pendingRequests.current.add(requestKey);

    try {
      await changeChallengeState(missionId, newState);
      console.log(`미션 ${missionId} 상태 변경 완료: ${newState}`);
    } catch (error) {
      console.error("상태 변경 실패:", error);
    } finally {
      pendingRequests.current.delete(requestKey);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} className={styles.kanbanBoard}>
      <div className={styles.board}>
        {COLUMNS.map((col) => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided, snapshot) => (
              <div
                className={`${styles.column} ${
                  snapshot.isDraggingOver ? styles.draggingOver : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{col.title}</h3>

                {columns[col.id].map((task, idx) => (
                  <Draggable key={task.kId} draggableId={task.kId} index={idx}>
                    {(prov, snap) => (
                      <div
                        className={`${styles.card} ${snap.isDragging ? styles.dragging : ""}`}
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                      >
                        {task.mission.name}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder /* 공간 유지용 */}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default MissionBoard;
