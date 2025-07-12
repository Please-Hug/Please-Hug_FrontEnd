import React, { useState, useEffect } from 'react';
import { getUsers }  from '../../api/adminService';
import UserTable from '../../components/Admin/UserTable';

export default function AdminUsersList() {
  const [users, setUsers] = useState([]);

  console.log('AdminUsersList 컴포넌트 렌더링'); // 추가

  useEffect(() => {
    console.log('useEffect 실행됨'); // 추가
    
    const fetchUsers = async () => {
      try {
        console.log('API 호출 시작'); // 추가
        const res = await getUsers();
        console.log('API 호출 성공:', res);
        setUsers(res.data.content || []);
      } catch (err) {
        console.error('API 호출 실패:', err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  console.log('현재 users 상태:', users); // 추가

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">전체 회원</h2>
      <UserTable users={users} />
    </div>
  );
}