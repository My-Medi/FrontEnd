import React, { useState, useEffect } from 'react';
import backSvg from '../../../assets/Expert/back.svg';
import closeSvg from '../../../assets/Expert/close.svg';
import ConfirmRequestModal from './ConfirmRequestModal';
import { useQueryClient } from '@tanstack/react-query';
import SuccessModal from './SuccessModal';
import { getUserRequestNote } from '../../../apis/userApi/user';
import useModalScrollLock from '../../../hooks/useModalScrollLock';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  expertId: number;
  expertName: string;
  expertPosition: string;
  expertRealName: string;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onBack, expertId, expertName, expertPosition, expertRealName }) => {
  const [requestText, setRequestText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryClient = useQueryClient();

  useModalScrollLock(isOpen && !showConfirmModal && !showSuccessModal);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (requestText.trim()) {
      setShowConfirmModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // 모든 상위 모달들 닫기 (ExpertDetailModal 포함)
    onClose();
    // 성공 모달이 닫힐 때 쿼리 무효화 실행 (지연 반영)
    queryClient.invalidateQueries({ queryKey: ['matchedExperts'] });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-[#121218]/40 transition-opacity duration-300 ${
            isVisible && !showConfirmModal && !showSuccessModal ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        
        {/* Modal */}
        <div 
          className={`relative w-[744px] h-[632px] bg-white/96 rounded-[40px] transition-all duration-300 ${
            isVisible && !showConfirmModal && !showSuccessModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            boxShadow: '0px 2px 20px rgba(144, 181, 255, 0.5), inset 0px -4px 6px rgba(255, 255, 255, 0.25), inset 0px 4px 8px #FFFFFF'
          }}
        >
          {/* Content */}
          <div className="px-15 py-12.5 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col items-center">
              {/* Step indicator */}
              <div className="text-center mb-6">
                <div className="text-base font-semibold text-[#1D68FF] leading-[1.375] tracking-[-3%]">
                  1/2
                </div>
                <div className="text-lg font-medium text-[#4D5053] leading-[2] tracking-[-3%]">
                  요청사항 작성
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-[#121218] leading-[1.5] tracking-[-3%]">
                  전문가에게 전달할 요청사항을 적어주세요!
                </h2>
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col">
              <div className="w-[600px] h-[211px] border border-[#C5C8CB] rounded-lg p-3">
                <textarea
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ex) 야근이 많은 직장인, 교대 근무, 하루 10시간 앉아 있음, 어떤 관리를 받고 싶어요!"
                  className="w-full h-full resize-none outline-none text-lg font-medium text-[#121218] leading-[1] tracking-[-3%] placeholder-[#9DA0A3] placeholder:text-lg"
                />
              </div>
              
              {/* 요청사항 미리보기 */}
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const res = await getUserRequestNote();
                        const note = res?.result?.requestNote ?? '';
                        setRequestText(note);
                      } catch (e) {
                        console.error('요청사항 불러오기 실패', e);
                      }
                    }}
                    className="text-[20px] font-medium text-[#121218] leading-[100%] tracking-[-3%] hover:underline cursor-pointer"
                  >
                    작성해 둔 요청사항 그대로 불러오기
                  </button>
                </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSubmit}
                disabled={!requestText.trim()}
                className="w-[300px] h-14 rounded-full bg-[#1D68FF] text-white text-xl font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0px_0px_2px_4px_rgba(29,104,255,0.04),0px_0px_4px_4px_rgba(29,104,255,0.02),0px_0px_6px_0px_rgba(29,104,255,0)]"
              >
                다음
              </button>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // RequestModal만 닫고 ExpertDetailModal은 유지
              if (onBack) {
                onBack();
              }
            }}
            className="absolute top-12 left-12 w-[17px] h-[35px] flex items-center justify-center"
          >
            <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
          </button>

          <button
            onClick={onClose}
            className="absolute top-12 right-12 w-4 h-4 flex items-center justify-center"
          >
            <img src={closeSvg} alt="닫기" className="w-full h-full object-contain" />
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmRequestModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          // 모든 모달 닫기 (RequestModal, ExpertDetailModal)
          // ExpertDetailModal의 onClose를 직접 호출
          onClose();
        }}
        onBack={() => {
          setShowConfirmModal(false);
          // ConfirmRequestModal만 닫고 RequestModal은 유지
        }}
        onConfirm={() => {
          // 여기에 실제 요청사항 제출 로직을 추가할 수 있습니다
          // 예: API 호출, 상태 업데이트 등
          
          setRequestText('');
          setShowConfirmModal(false);
          setShowSuccessModal(true);
          // onClose() 제거 - 성공 모달에서 확인 버튼 클릭 시에만 닫기
        }}
        expertId={expertId}
        expertName={expertName}
        expertPosition={expertPosition}
        expertRealName={expertRealName}
        comment={requestText}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default RequestModal; 