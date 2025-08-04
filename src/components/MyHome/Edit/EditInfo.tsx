import React, { useState, useEffect } from 'react';
import CustomCheckboxButton from '../../Common/CustomCheckboxButton';
import { useAuth } from '../../../contexts/AuthContext';
import SuccessModal from './SuccessModal';
import ConfirmModal from './ConfirmModal';
import { useUserProfileQuery } from '../../../hooks/users/useUserProfileQuery';

interface EditInfoProps {
  userType: 'patient' | 'expert';
  onBack?: () => void;
  onMenuSelect?: (menuIndex: number) => void;
  onHasChanges?: (hasChanges: boolean) => void;
}

const EditInfo: React.FC<EditInfoProps> = ({ onBack, onHasChanges }) => {
  const { userInfo, setUserInfo } = useAuth();
  
  // 사용자 프로필 API 데이터 가져오기
  const { data: userProfile } = useUserProfileQuery();
  
  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    birthDate: userInfo?.birthDate || '',
    gender: userInfo?.gender || 'male',
    nickname: userInfo?.nickname || '',
    userId: userInfo?.userId || '',
    password: '',
    confirmPassword: '',
    email: userInfo?.email || '',
    emailDomain: userInfo?.emailDomain || '직접입력',
    contact: userInfo?.contact || ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialData, setInitialData] = useState(formData);

  // API 데이터로 폼 초기화 (기존 userInfo가 없을 때만)
  useEffect(() => {
    if (userProfile && !userInfo) {
      const emailParts = userProfile.email.split('@');
      const emailDomain = emailParts.length > 1 ? emailParts[1] : '직접입력';
      
      const newFormData = {
        name: userProfile.name || '',
        birthDate: userProfile.birthDate ? userProfile.birthDate.replace(/-/g, '').slice(0, 6) : '', // YYYY-MM-DD를 6자리로 변환
        gender: (userProfile.gender === 'MALE' ? 'male' : 'female') as 'male' | 'female',
        nickname: userProfile.name || '', // API에는 nickname이 없으므로 name 사용
        userId: userProfile.username || '',
        password: '',
        confirmPassword: '',
        email: emailParts[0] || '',
        emailDomain: emailDomain,
        contact: userProfile.phoneNumber || ''
      };
      
      setFormData(newFormData);
      setInitialData(newFormData);
    }
  }, [userProfile, userInfo]);

  // 초기 데이터 설정
  useEffect(() => {
    if (!userProfile && !userInfo) {
      setInitialData(formData);
    }
  }, []);

  // 변경사항 추적
  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
    setHasChanges(hasFormChanges);
    // 부모 컴포넌트에 변경사항 상태 전달
    if (onHasChanges) {
      onHasChanges(hasFormChanges);
    }
  }, [formData, initialData, onHasChanges]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackClick = () => {
    if (hasChanges) {
      setShowConfirmModal(true);
    } else {
      onBack?.();
    }
  };

  const handleConfirmSave = () => {
    handleSave();
    setShowConfirmModal(false);
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    onBack?.();
  };

  const handleSave = () => {
    console.log('저장된 데이터:', formData);
    
    // 비밀번호가 입력된 경우에만 업데이트
    const updatedUserInfo = {
      name: formData.name,
      birthDate: formData.birthDate,
      gender: formData.gender,
      nickname: formData.nickname,
      userId: formData.userId,
      email: formData.email,
      emailDomain: formData.emailDomain,
      contact: formData.contact
    };
    
    setUserInfo(updatedUserInfo);
    setShowSuccessModal(true);
  };

  const emailDomains = ['직접입력', 'gmail.com', 'naver.com', 'daum.net', 'hanmail.net'];


  return (
    <div className='max-w-2xl mx-auto'>
      <div className='flex items-center mb-8'>
        {onBack && (
          <button
            onClick={handleBackClick}
            className='text-blue-500 hover:text-blue-700 mr-4 mt-[50px]'
          >
            ← 뒤로가기
          </button>
        )}
        <h1 className='text-2xl font-bold text-gray-800 flex-1 text-center mt-[50px]'>회원정보 수정</h1>
      </div>
      <form className='mt-[40px]'>
        {/* 성명 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>성명</label>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[180px]'
          />
        </div>

        {/* 생년월일 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[120px] flex items-center h-[36px]'>생년월일(6자리)</label>
          <input
            type='text'
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            placeholder='예) XXXXXX(6자리를 입력하세요)'
            maxLength={6}
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[140px]'
          />
        </div>

        {/* 성별 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>성별</label>
          <div className='flex space-x-4 ml-[180px]'>
            <CustomCheckboxButton
              checked={formData.gender === 'male'}
              onClick={() => handleInputChange('gender', 'male')}
              label='남자'
            />
            <CustomCheckboxButton
              checked={formData.gender === 'female'}
              onClick={() => handleInputChange('gender', 'female')}
              label='여자'
            />
          </div>
        </div>

        {/* 닉네임 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>닉네임</label>
          <input
            type='text'
            value={formData.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            placeholder='닉네임을 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[180px]'
          />
          <button
            type='button'
            className='w-[101px] h-[36px] bg-gray-100 text-black rounded-[8.4px] ml-[24.4px]'
          >
            닉네임 확인
          </button>
        </div>
        
        {/* 닉네임 아래 점선 */}
        <div className='flex justify-center mb-[32px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="700" height="2" viewBox="0 0 700 2" fill="none">
            <path d="M1 1L700 1.00005" stroke="#1D68FF" strokeWidth="0.5" strokeLinecap="square" strokeLinejoin="round" strokeDasharray="1.8 1.8"/>
          </svg>
        </div>

        {/* 아이디 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>아이디</label>
          <input
            type='text'
            value={formData.userId}
            onChange={(e) => handleInputChange('userId', e.target.value)}
            placeholder='아이디를 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[180px]'
          />
          <button
            type='button'
            className='w-[101px] h-[36px] bg-gray-100 text-black rounded-[8.4px] ml-[24.4px]'
          >
            아이디 확인
          </button>
        </div>

        {/* 비밀번호 */}
        <div className='flex items-center space-x-3'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>비밀번호</label>
          <div className='relative ml-[180px]'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 pr-10'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                <path d="M4.95 2.44273C5.29417 2.36055 5.64653 2.31948 6 2.32033C9.5 2.32033 11.5 6.40043 11.5 6.40043C11.1965 6.9796 10.8345 7.52487 10.42 8.02737M7.06 7.48166C6.92268 7.63198 6.75707 7.75255 6.57308 7.83618C6.38908 7.91981 6.19045 7.96477 5.98904 7.9684C5.78764 7.97202 5.58758 7.93423 5.4008 7.85728C5.21403 7.78032 5.04436 7.66579 4.90192 7.5205C4.75949 7.37521 4.6472 7.20214 4.57175 7.01162C4.49631 6.82111 4.45926 6.61704 4.46282 6.4116C4.46637 6.20616 4.51045 6.00356 4.59244 5.81588C4.67442 5.62819 4.79263 5.45928 4.94 5.3192M8.97 9.42991C8.11529 10.0945 7.07455 10.4626 6 10.4805C2.5 10.4805 0.5 6.40043 0.5 6.40043C1.12194 5.21817 1.98457 4.18524 3.03 3.37095L8.97 9.42991Z" stroke="#9DA0A3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className='ml-[300px] text-[10px] text-gray-400 mb-[32px] mt-[5px]'>
          소문자, 대문자, 특수기호 포함 8글자 이상
        </div>
        

        {/* 비밀번호 확인 */}
        <div className='flex items-center space-x-3'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[120px] flex items-center h-[36px]'>비밀번호 확인</label>
          <div className='relative ml-[140px]'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 pr-10'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                <path d="M4.95 2.44273C5.29417 2.36055 5.64653 2.31948 6 2.32033C9.5 2.32033 11.5 6.40043 11.5 6.40043C11.1965 6.9796 10.8345 7.52487 10.42 8.02737M7.06 7.48166C6.92268 7.63198 6.75707 7.75255 6.57308 7.83618C6.38908 7.91981 6.19045 7.96477 5.98904 7.9684C5.78764 7.97202 5.58758 7.93423 5.4008 7.85728C5.21403 7.78032 5.04436 7.66579 4.90192 7.5205C4.75949 7.37521 4.6472 7.20214 4.57175 7.01162C4.49631 6.82111 4.45926 6.61704 4.46282 6.4116C4.46637 6.20616 4.51045 6.00356 4.59244 5.81588C4.67442 5.62819 4.79263 5.45928 4.94 5.3192M8.97 9.42991C8.11529 10.0945 7.07455 10.4626 6 10.4805C2.5 10.4805 0.5 6.40043 0.5 6.40043C1.12194 5.21817 1.98457 4.18524 3.03 3.37095L8.97 9.42991Z" stroke="#9DA0A3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className='ml-[300px] text-[10px] text-gray-400 mb-[32px] mt-[5px]'>
            소문자, 대문자, 특수기호 포함 8글자 이상
        </div>

        {/* 비밀번호 확인 아래 점선 */}
        <div className='flex justify-center mb-[32px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="700" height="2" viewBox="0 0 700 2" fill="none">
            <path d="M1 1L700 1.00005" stroke="#1D68FF" strokeWidth="0.5" strokeLinecap="square" strokeLinejoin="round" strokeDasharray="1.8 1.8"/>
          </svg>
        </div>

        {/* 이메일 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>이메일</label>
          <input
            type='text'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder='이메일을 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[180px]'
          />
          <span className='text-gray-500'>@</span>
          <select
            value={formData.emailDomain}
            onChange={(e) => handleInputChange('emailDomain', e.target.value)}
            className='w-[100px] h-[36px] text-[14px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-2'
          >
            {emailDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* 연락처 */}
        <div className='flex items-center space-x-3 mb-[32px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>연락처</label>
          <input
            type='text'
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            placeholder='연락처를 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[180px]'
          />
        </div>

        {/* 저장하기 버튼 */}
        <div className='flex justify-center mt-[50px]'>
          <button
            type='button'
            onClick={handleSave}
            className='w-[216px] h-[47px] bg-white text-black rounded-[36px] shadow-[0_0_6px_4px_rgba(29,104,255,0.10)] transition-shadow font-medium text-[16px] mb-[50px]'
          >
            저장하기
          </button>
        </div>
      </form>

      {/* 성공 모달 */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="변경된 회원정보가 저장되었습니다."
      />

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        onCancel={handleConfirmCancel}
      />
    </div>
  );
};

export default EditInfo;
