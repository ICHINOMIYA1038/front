import React from 'react';
import axios from 'axios';

interface DeleteButtonProps {
  tableName: string;
  primaryColumnName: string;
  id: number;
  endpointUrl: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ tableName, primaryColumnName, id, endpointUrl }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${endpointUrl}/${id}`);
      console.log(response.data); // 削除成功時のレスポンスデータを表示（任意）
      // ここで必要な追加の処理を実行することもできます
    } catch (error) {
      console.error(error); // エラーハンドリング
      // エラー処理を行うこともできます
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete {tableName} {primaryColumnName}: {id}
    </button>
  );
};

export default DeleteButton;