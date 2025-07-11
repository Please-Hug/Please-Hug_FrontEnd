import React from 'react';

export default function UserForm({ form, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">이름</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </div>
  );
}
