import React from 'react';
import ConfirmModalBase from '../../Common/ConfirmModalBase';

interface ResumeConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

// 기존 스타일/크기 동일 유지 (베이스 활용)
const ResumeConfirmModal: React.FC<ResumeConfirmModalProps> = ({ isOpen, onConfirm }) => {
  return (
    <ConfirmModalBase
      isOpen={isOpen}
      message="이력서를 저장되었습니다."
      confirmText="확인"
      onConfirm={onConfirm}
    />
  );
};

export default ResumeConfirmModal;

