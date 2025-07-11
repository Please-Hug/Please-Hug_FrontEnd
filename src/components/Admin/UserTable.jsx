import React from 'react';
import { Link } from 'react-router-dom';

export default function UserTable({ users }) {

    // users가 배열이 아니면 로딩 메시지나 빈 상태 표시
  if (!Array.isArray(users)) {
    return <p>회원 목록을 불러오는 중입니다…</p>;
  }

  if (users.length === 0) {
    return <p>회원이 없습니다.</p>;
  }

  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">이름</th>
          <th className="px-4 py-2">이메일</th>
          <th className="px-4 py-2">권한</th>
          <th className="px-4 py-2">액션</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-t">
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">
              <Link to={`/admin/users/${user.username}`}>
                {user.username}
              </Link>
            </td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">
              <Link
                to={`/admin/users/${user.username}`}
                className="text-blue-500 hover:underline"
              >상세보기</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}