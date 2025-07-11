import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, changeUserRole } from '../../api/adminService';

export default function AdminUserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', role: '' });

  useEffect(() => {
    getUser(username)
      .then(res => {
        const userData = res.data.data;  
        setUser(userData);
        setForm({
          username: userData.username,
          email:    userData.email,
          role:     userData.role,
        });
      })
      .catch(err => console.error(err));
  }, [username]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    updateUser(username, form)
      .then(() => navigate('/admin'))
      .catch(err => console.error(err));
  };

  const handleRoleChange = e => {
    const newRole = e.target.value;
    changeUserRole(username, newRole)
      .then(() => setForm({ ...form, role: newRole }))
      .catch(err => console.error(err));
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteUser(username)
        .then(() => navigate('/admin'))
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">회원 상세 정보</h2>
      {user ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">이름</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">권한</label>
            <select
              name="role"
              value={form.role}
              onChange={handleRoleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex space-x-2 pt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              저장
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}