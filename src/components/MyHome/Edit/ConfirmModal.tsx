import React from 'react';
import ConfirmModalBase from '../../Common/ConfirmModalBase';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

// 스타일/레이아웃은 ConfirmModalBase로 그대로 유지
const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <ConfirmModalBase
      isOpen={isOpen}
      message="변경된 사항을 저장하시겠습니까?"
      confirmText="저장"
      cancelText="아니오"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default ConfirmModal;