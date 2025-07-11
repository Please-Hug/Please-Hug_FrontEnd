import React from 'react';

export default function RoleSelector({ role, onChange }) {
  return (
    <div>
      <label className="block mb-1">권한</label>
      <select
        name="role"
        value={role}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
    </div>
  );
}
