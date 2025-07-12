import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, changeUserRole } from '../../api/adminService';

export default function AdminUserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: '',
    name: '',
    description: '',
    phoneNumber: '',
    role: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('사용자 상세 API 호출 시작, username:', username);
        const res = await getUser(username);
        console.log('사용자 상세 API 응답:', res);
        console.log('res.data:', res.data);
        
        // 여러 가능한 구조 확인
        const userData = res.data.data || res.data; // 방어적 코딩
        console.log('userData:', userData);
        
        if (userData) {
          setUser(userData);
          setForm({
            username: userData.username || '',
            name: userData.name || '',
            description: userData.description || '',
            phoneNumber: userData.phoneNumber || '',
            role: userData.role || '',
          });
        }
      } catch (err) {
        console.error('사용자 상세 정보 가져오기 실패:', err);
      }
    };
    if (username) {
      fetchUser();
    }
  }, [username]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await updateUser(username, form);
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = async e => {
    const newRole = e.target.value;
    try {
      await changeUserRole(username, newRole);
      setForm({ ...form, role: newRole });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteUser(username);
        navigate('/admin');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">회원 상세 정보</h2>
      {user ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">사용자명</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-1">전화번호</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
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
              <option value="LECTURE">LECTURE</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          
          {/* 읽기 전용 정보 */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">추가 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">ID:</span> {user.id}
              </div>
              <div>
                <span className="font-medium">레벨:</span> {user.level}
              </div>
              <div>
                <span className="font-medium">현재 경험치:</span> {user.currentTotalExp}
              </div>
              <div>
                <span className="font-medium">다음 레벨 경험치:</span> {user.nextLevelTotalExp}
              </div>
              <div>
                <span className="font-medium">포인트:</span> {user.point}
              </div>
            </div>
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