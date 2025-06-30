import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BookmarkModal({ 
  isOpen, 
  initialData = null, // 수정 모드일 때 전달되는 객체
  onClose, 
  onCreate, // 추가 콜백
  onSave, // 수정 콜백 
}) {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  // 초기값 설정
  useEffect(() => {
    if (initialData) {
      setLink(initialData.link);
      setTitle(initialData.title);
    } else {
      setLink('');
      setTitle('');
    }
  }, [initialData]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            initialData ? onSave({ title, link }) : onCreate({ title, link });
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {initialData ? "북마크 수정" : "북마크 추가"}
          </h3>
          {/* URL 입력 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL
            </label>
            <input
              type="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* 표시 텍스트 입력 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              표시할 텍스트 (선택)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="링크를 나타낼 텍스트를 작성해주세요"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* 버튼 */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              {initialData ? "저장하기" : "추가하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Portal 사용: document.body 아래로 렌더
  return createPortal(modalContent, document.body);
}



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (initialData) {
//       onSave({ title, link });
//     } else {
//       onCreate({ title, link});
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6"
//       >
//         <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//           {initialData ? "북마크 수정" : "북마크 추가"}
//         </h3>

//         <div className="space-y-1">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//             URL
//           </label>
//           <input
//             type="url"
//             required
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             placeholder="https://example.com"
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//             표시할 텍스트 (선택)
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="링크를 나타낼 텍스트를 작성해주세요"
//             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
//           >
//             {initialData ? "저장하기" : "추가하기"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }