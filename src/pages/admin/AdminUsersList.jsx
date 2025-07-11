import React, { useState, useEffect } from 'react';
import { getUsers }  from '../../api/adminService';
import UserTable from '../../components/Admin/UserTable';

export default function AdminUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(res => {
        console.log('API 응답:', res.data);
        setUsers(res.data.data.content);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">전체 회원</h2>
      <UserTable users={users} />
    </div>
  );
}