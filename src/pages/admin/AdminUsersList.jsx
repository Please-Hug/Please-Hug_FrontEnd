import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/adminService';
import UserTable from '../../components/Admin/UserTable';
import styles from './AdminUsersList.module.scss';

export default function AdminUsersList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 0) => {
    setLoading(true);
    try {
      const res = await getUsers(page);
      
      console.log('=== 응답 구조 분석 ===');
      console.log('res:', res);
      console.log('res의 타입:', typeof res);
      console.log('res.data:', res?.data);
      console.log('res.data의 타입:', typeof res?.data);
      console.log('res.data가 배열인가?:', Array.isArray(res?.data));
      console.log('res.content:', res?.content);
      console.log('res.content가 배열인가?:', Array.isArray(res?.content));
      console.log('========================');
      
      let userData = [];
      let pageInfo = { number: 0, totalPages: 1, totalElements: 0 };
      
      // 응답 구조 분석 및 데이터 추출
      if (res) {
        // 1. res.data가 배열인 경우
        if (res.data && Array.isArray(res.data)) {
          userData = res.data;
          pageInfo.totalElements = userData.length;
          console.log('✅ res.data 배열 구조로 처리:', userData.length, '개');
        }
        // 2. res.content가 배열인 경우 (페이징 구조)
        else if (res.content && Array.isArray(res.content)) {
          userData = res.content;
          pageInfo = {
            number: res.number || 0,
            totalPages: res.totalPages || 1,
            totalElements: res.totalElements || userData.length
          };
          console.log('✅ res.content 페이징 구조로 처리:', userData.length, '개');
        }
        // 3. res 자체가 배열인 경우
        else if (Array.isArray(res)) {
          userData = res;
          pageInfo.totalElements = userData.length;
          console.log('✅ res 배열 구조로 처리:', userData.length, '개');
        }
        // 4. res.data.content 구조인 경우
        else if (res.data && res.data.content && Array.isArray(res.data.content)) {
          userData = res.data.content;
          pageInfo = {
            number: res.data.number || 0,
            totalPages: res.data.totalPages || 1,
            totalElements: res.data.totalElements || userData.length
          };
          console.log('✅ res.data.content 페이징 구조로 처리:', userData.length, '개');
        }
        // 5. res.data.data 구조인 경우
        else if (res.data && res.data.data && Array.isArray(res.data.data)) {
          userData = res.data.data;
          pageInfo.totalElements = userData.length;
          console.log('✅ res.data.data 구조로 처리:', userData.length, '개');
        }
        else {
          console.log('❌ 예상치 못한 응답 구조:', res);
        }
      }
      
      console.log('최종 설정될 사용자 데이터:', userData);
      console.log('최종 설정될 페이지 정보:', pageInfo);
      
      setUsers(userData);
      setCurrentPage(pageInfo.number);
      setTotalPages(pageInfo.totalPages);
      setTotalElements(pageInfo.totalElements);
      
    } catch (err) {
      console.error('API 호출 실패:', err);
      setUsers([]);
      setCurrentPage(0);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchUsers(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 0) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className={styles.pageButton}
        >
          이전
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${i === currentPage ? styles.active : ''}`}
        >
          {i + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className={styles.pageButton}
        >
          다음
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.AdminUsersList}>
      <h2 className={styles.title}>전체 회원</h2>
      
      <div className={styles.stats}>
        <span>총 {totalElements}명의 회원</span>
        {totalPages > 1 && <span>페이지 {currentPage + 1} / {totalPages}</span>}
      </div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <UserTable users={users} loading={loading} />
        </div>
        
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
}