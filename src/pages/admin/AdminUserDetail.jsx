import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, changeUserRole } from '../../api/adminService';
import styles from './AdminUserDetail.module.scss';

export default function AdminUserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: '',
    name: '',
    description: '',
    phoneNumber: '',
    role: '',
    level: 0,
    currentTotalExp: 0,
    exp: 0, 
    point: 0
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
            level: userData.level || 0,
            currentTotalExp: userData.currentTotalExp || 0,
            exp: userData.exp || 0,
            point: userData.point || 0
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
      console.log('저장 시작');
      console.log('username:', username);
      console.log('form 데이터:', form);
      
      const response = await updateUser(username, form);
      console.log('저장 성공:', response);
      alert('저장되었습니다!');
    } catch (err) {
      console.error('저장 실패 상세:', err);
      console.error('에러 메시지:', err.message);
      console.error('에러 응답:', err.response);
      
      if (err.response) {
        const errorMessage = err.response.data?.message || '알 수 없는 오류';
        
        if (errorMessage.includes('phoneNumber') && errorMessage.includes('일치해야 합니다')) {
          alert('전화번호 형식이 올바르지 않습니다. 전화번호의 양식은 010-0000-0000 입니다.');
        } else {
          alert(`저장 실패: ${err.response.status} - ${errorMessage}`);
        }
      } else {
        alert('저장에 실패했습니다.');
      }
    }
  };

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    console.log('권한 변경 시도:', newRole);
    
    try {
      // 권한 변경 전용 API 사용
      const response = await changeUserRole(username, newRole);
      console.log('권한 변경 성공:', response);
      
      // 폼 상태 업데이트
      setForm({ ...form, role: newRole });
      
      // 사용자 정보도 업데이트
      setUser({ ...user, role: newRole });
      
      alert(`권한이 ${newRole}로 변경되었습니다.`);
      
    } catch (err) {
      console.error('권한 변경 실패 상세:', err);
      console.error('에러 응답:', err.response);
      
      if (err.response) {
        alert(`권한 변경 실패: ${err.response.status} - ${err.response.data?.message || '알 수 없는 오류'}`);
      } else {
        alert('권한 변경에 실패했습니다.');
      }
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
    <div className={styles.AdminUserDetail}>
      <h2 className={styles.title}>회원 상세 정보</h2>
      {user ? (
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.readOnlyField}>
              <span className={styles.readOnlyLabel}>아이디:</span>
              <span className={styles.readOnlyValue}>{user.username}</span>
            </div>
            
            <div className={styles.formGroup}>
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>설명</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>전화번호</label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="010-0000-0000"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>권한</label>
              <select
                name="role"
                value={form.role}
                onChange={handleRoleChange}
              >
                <option value="USER">USER</option>
                <option value="LECTURER">LECTURER</option> 
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            
            <div className={styles.numericInfo}>
              <h3>수치 정보</h3>
              <div className={styles.numericFields}>
                <div>
                  <span className={styles.fieldLabel}>레벨:</span>
                  <span className={styles.fieldValue}>{user.level}</span>
                </div>
                <div>
                  <span className={styles.fieldLabel}>현재 총 경험치:</span>
                  <span className={styles.fieldValue}>{user.currentTotalExp}</span>
                </div>
                <div>
                  <span className={styles.fieldLabel}>다음 레벨 경험치:</span>
                  <span className={styles.fieldValue}>{user.nextLevelTotalExp}</span>
                </div>
                <div>
                  <label className={styles.fieldLabel}>경험치 (강제 리셋):</label>
                  <input
                    type="number"
                    name="exp"
                    value={form.exp}
                    onChange={handleChange}
                    className={styles.numberInput}
                    min="0"
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>포인트 (강제 리셋):</label>
                  <input
                    type="number"
                    name="point"
                    value={form.point}
                    onChange={handleChange}
                    className={styles.numberInput}
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                onClick={handleSave}
                className={styles.saveButton}
              >
                저장
              </button>
              <button
                onClick={handleDelete}
                className={styles.deleteButton}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loadingMessage}>로딩 중...</p>
      )}
    </div>
  );
}