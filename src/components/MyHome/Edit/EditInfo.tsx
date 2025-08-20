import React, { useState, useEffect } from 'react';
import unionSvg from '../../../assets/Expert/Union.svg';
import { DEFAULT_PROFILE_IMAGES } from '../../../constants/profileImages';
import CustomCheckboxButton from '../../Common/CustomCheckboxButton';
import { useAuth } from '../../../contexts/AuthContext';
import SuccessModal from './SuccessModal';
import ConfirmModal from './ConfirmModal';
import ProfileSelectModal from './ProfileSelectModal';
import { useUserProfileQuery } from '../../../hooks/users/queries/useUserProfileQuery';
import { useUserProfileUpdateMutation } from '../../../hooks/users/mutations/useUserProfileMutation';
import { useExpertProfileQuery } from '../../../hooks/experts/queries/useExpertProfileQuery';
import { checkNicknameDuplication } from '../../../apis/duplicationApi/duplication';
import { useExpertProfileUpdateMutation } from '../../../hooks/experts/mutations/useExpertProfileMutation';
import backSvg from "../../../assets/Expert/back.svg";

interface EditInfoProps {
  userType: 'patient' | 'expert';
  onBack?: () => void;
  onMenuSelect?: (menuIndex: number) => void;
  onProfileModalChange?: (isOpen: boolean) => void;
}

const EditInfo: React.FC<EditInfoProps> = ({ userType, onBack, onProfileModalChange }) => {
  const { userInfo, setUserInfo } = useAuth();
  
  // 사용자 타입에 따라 적절한 프로필 훅만 사용
  const userProfileQuery = userType !== 'expert' ? useUserProfileQuery() : { data: undefined };
  const expertProfileQuery = userType === 'expert' ? useExpertProfileQuery() : { data: undefined };
  
  // 사용자 타입에 따라 적절한 프로필 데이터 선택
  const userProfile = userType === 'expert' ? expertProfileQuery.data : userProfileQuery.data;

  // 사용자 타입에 따라 적절한 업데이트 뮤테이션 사용
  const userProfileUpdateMutation = userType !== 'expert' ? useUserProfileUpdateMutation() : null;
  const expertProfileUpdateMutation = userType === 'expert' ? useExpertProfileUpdateMutation() : null;
  
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
    contact: userInfo?.contact || '',
    height: '',
    weight: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string | null>(null);
  // 닉네임 중복 확인 상태 (닉네임 변경 시 필수)
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);

  const [hasChanges, setHasChanges] = useState(false);
  const [initialData, setInitialData] = useState(formData);
  const [initializedFromApi, setInitializedFromApi] = useState(false);

  // API 데이터로 폼 초기화 (한 번만 초기화, userInfo 존재 여부와 무관하게 서버 값을 우선 반영)
  useEffect(() => {
    if (userProfile && !initializedFromApi) {
      const emailStr = userProfile.email || '';
      const [emailLocal, emailDomain] = emailStr.includes('@') ? emailStr.split('@') : [emailStr, '직접입력'];
      const newFormData = {
        name: userProfile.name || '',
        birthDate: userProfile.birthDate || '',
        gender: (userProfile.gender === 'MALE' ? 'male' : 'female') as 'male' | 'female',
        nickname: userProfile.nickname || '',
        userId: '', // API 응답에 로그인 아이디가 없으므로 빈 값 유지
        password: '',
        confirmPassword: '',
        email: emailLocal,
        emailDomain: emailDomain || '직접입력',
        contact: userProfile.phoneNumber || '',
        height: (userProfile.height ?? '') !== '' ? String(userProfile.height) : '',
        weight: (userProfile.weight ?? '') !== '' ? String(userProfile.weight) : ''
      };

      setFormData((prev) => ({ ...prev, ...newFormData }));
      setInitialData((prev) => ({ ...prev, ...newFormData }));
      // 프로필 이미지 초기 반영 (GET /users 응답)
      const initialProfileImg = (userProfile as any).profileImgUrl || (userProfile as any).profileImageUrl || '';
      if (initialProfileImg) {
        setSelectedProfileImage(initialProfileImg);
      }
      setInitializedFromApi(true);
    }
  }, [userProfile, initializedFromApi]);

  // 전문가 프로필 데이터로 초기화 (전문가 모드)
  useEffect(() => {
    if (expertProfileQuery.data && userType === 'expert' && !userInfo) {
      const expert = expertProfileQuery.data as any;
      const emailStr = expert.email || '';
      const [emailLocal, emailDomain] = emailStr.includes('@') ? emailStr.split('@') : [emailStr, '직접입력'];
      const newFormData = {
        name: expert.name || '',
        birthDate: expert.birthDate || '',
        gender: (expert.gender === 'MALE' ? 'male' : 'female') as 'male' | 'female',
        nickname: expert.nickname || '',
        userId: '',
        password: '',
        confirmPassword: '',
        email: emailLocal,
        emailDomain: emailDomain || '직접입력',
        contact: expert.phoneNumber || '',
        height: '',
        weight: ''
      };
      setFormData(newFormData);
      setInitialData(newFormData);
      // 전문가 프로필 이미지 초기 반영 (GET /experts/profile 응답)
      const initialExpertProfileImg = expert.profileImgUrl || expert.profileImageUrl || '';
      if (initialExpertProfileImg) {
        setSelectedProfileImage(initialExpertProfileImg);
      }
    }
  }, [expertProfileQuery.data, userType, userInfo]);

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
    // if (onHasChanges) { // Removed as per edit hint
    //   onHasChanges(hasFormChanges);
    // }
  }, [formData, initialData]); // Removed onHasChanges from dependency array

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'nickname') {
      // 닉네임이 변경되면 확인 상태 초기화
      setNicknameChecked(false);
      setNicknameAvailable(null);
    }
  };

  const handleNumericInputChange = (field: 'height' | 'weight') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: onlyDigits
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
    // 저장 후 마이홈 화면으로 이동
    onBack?.();
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    onBack?.();
  };

  const handleProfileSelect = (profileIndex: number) => {
    // S3 사전 업로드/환경변수 URL 우선, 없으면 로컬 폴백
    const selectedImage = DEFAULT_PROFILE_IMAGES[profileIndex - 1]; // profileIndex는 1부터 시작
    setSelectedProfileImage(selectedImage);
    setShowProfileModal(false);
    onProfileModalChange?.(false);
    
    // 변경사항 추적을 위해 hasChanges를 true로 설정
    setHasChanges(true);
  };

  const handleSave = () => {
    // 닉네임이 변경된 경우, 중복 확인을 통과해야 저장 가능
    const originalNickname = initialData.nickname ?? '';
    const currentNickname = formData.nickname?.trim() ?? '';
    if (currentNickname !== originalNickname) {
      if (!nicknameChecked || nicknameAvailable !== true) {
        alert('닉네임 중복 확인을 완료해주세요.');
        return;
      }
    }

    if (userType === 'expert') {
      // 전문가 프로필 업데이트
      const expertUpdateData = {
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender === 'male' ? 'MALE' : 'FEMALE' as 'MALE' | 'FEMALE',
        nickname: formData.nickname,
        phoneNumber: formData.contact,
        profileImgUrl: selectedProfileImage || '' // 선택된 프로필 이미지 URL
      };
      
      if (expertProfileUpdateMutation) {
        expertProfileUpdateMutation.mutate(expertUpdateData, {
          onSuccess: () => {
            // 저장 성공 후 변경사항 상태 초기화
            setHasChanges(false);
            setInitialData(formData);
            setShowSuccessModal(true);
          },
          onError: (error) => {
            console.error('전문가 프로필 업데이트 실패:', error);
            alert('프로필 업데이트에 실패했습니다.');
          }
        });
      }
    } else {
      // 일반 사용자 프로필 업데이트
      const toNumberOrUndefined = (v: string) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
      };
      const userUpdateData = {
        name: formData.name,
        birthDate: formData.birthDate,
        nickname: formData.nickname,
        phoneNumber: formData.contact,
        profileImgUrl: selectedProfileImage || '', // 선택된 프로필 이미지 URL
        height: toNumberOrUndefined(formData.height),
        weight: toNumberOrUndefined(formData.weight)
      };
      
      if (userProfileUpdateMutation) {
        userProfileUpdateMutation.mutate(userUpdateData, {
          onSuccess: () => {
            // 저장 성공 후 변경사항 상태 초기화
            setHasChanges(false);
            setInitialData(formData);
            setShowSuccessModal(true);
          },
          onError: (error) => {
            console.error('사용자 프로필 업데이트 실패:', error);
            alert('프로필 업데이트에 실패했습니다.');
          }
        });
      }
    }
    
    // 기존 로컬 상태 업데이트 (백업용)
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
  };

  const emailDomains = ['직접입력', 'gmail.com', 'naver.com', 'daum.net', 'hanmail.net'];


  return (
    <div className='max-w-2xl mx-auto'>
      <div className='relative mb-8'>
        {onBack && (
          <button
          onClick={handleBackClick}
          className="absolute w-[17px] h-[35px] top-[-2px] left-[0px]"
          aria-label="뒤로가기"
        >
          <img src={backSvg} alt="뒤로가기" className="w-full h-full object-contain" />
        </button>
        )}
        <h1 className='text-2xl font-bold text-gray-800 text-center mt-[50px]'>회원정보 수정</h1>
      </div>

      
      <form className={`mt-[40px] transition-all duration-300 ${showProfileModal ? 'filter brightness-80 pointer-events-none' : ''}`}>
        {/* 사용자 프로필 섹션 */}
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            {/* 프로필 이미지 컨테이너 */}
            <div 
              className='w-[158px] h-[158px] bg-[#EDF0F3] border-[0.5px] border-[#1D68FF] rounded-[156px] flex items-center justify-center hover:border-[2px] hover:shadow-[0px_3px_6px_0px_rgba(29,104,255,0.07),0px_11px_11px_0px_rgba(29,104,255,0.06),0px_26px_15px_0px_rgba(29,104,255,0.03),0px_46px_18px_0px_rgba(29,104,255,0.01),0px_71px_20px_0px_rgba(29,104,255,0)] transition-all duration-200 cursor-pointer'
              onClick={() => {
                setShowProfileModal(true);
                onProfileModalChange?.(true);
              }}
            >
              {/* 선택된 프로필 이미지 또는 기본 아이콘 */}
              {selectedProfileImage ? (
                <img 
                  src={selectedProfileImage} 
                  alt="선택된 프로필 이미지" 
                  className='w-[158px] h-[158px] object-cover rounded-[156px]'
                />
              ) : (
                <img 
                  src={unionSvg} 
                  alt="프로필 이미지" 
                  className='w-[97.58px] h-[99.6px] object-contain'
                />
              )}
            </div>
          </div>
        </div>

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
            onClick={async () => {
              const nickname = formData.nickname.trim();
              if (!nickname) {
                alert('닉네임을 입력해주세요.');
                return;
              }
              try {
                const isDuplicate = await checkNicknameDuplication(nickname);
                setNicknameChecked(true);
                setNicknameAvailable(!isDuplicate);
                if (isDuplicate) alert('이미 사용 중인 닉네임입니다.');
                else alert('사용 가능한 닉네임입니다.');
              } catch (_) {
                alert('닉네임 확인 중 오류가 발생했습니다.');
              }
            }}
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
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path d="M0.5 6.40043C0.5 6.40043 2.5 2.32033 6 2.32033C9.5 2.32033 11.5 6.40043 11.5 6.40043C11.5 6.40043 9.5 10.4805 6 10.4805C2.5 10.4805 0.5 6.40043 0.5 6.40043Z" stroke="#9DA0A3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="6.40043" r="1.7" stroke="#9DA0A3" strokeWidth="0.9"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path d="M4.95 2.44273C5.29417 2.36055 5.64653 2.31948 6 2.32033C9.5 2.32033 11.5 6.40043 11.5 6.40043C11.1965 6.9796 10.8345 7.52487 10.42 8.02737M7.06 7.48166C6.92268 7.63198 6.75707 7.75255 6.57308 7.83618C6.38908 7.91981 6.19045 7.96477 5.98904 7.9684C5.78764 7.97202 5.58758 7.93423 5.4008 7.85728C5.21403 7.78032 5.04436 7.66579 4.90192 7.5205C4.75949 7.37521 4.6472 7.20214 4.57175 7.01162C4.49631 6.82111 4.45926 6.61704 4.46282 6.4116C4.46637 6.20616 4.51045 6.00356 4.59244 5.81588C4.67442 5.62819 4.79263 5.45928 4.94 5.3192M8.97 9.42991C8.11529 10.0945 7.07455 10.4626 6 10.4805C2.5 10.4805 0.5 6.40043 0.5 6.40043C1.12194 5.21817 1.98457 4.18524 3.03 3.37095L8.97 9.42991Z" stroke="#9DA0A3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
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
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path d="M0.5 6.40043C0.5 6.40043 2.5 2.32033 6 2.32033C9.5 2.32033 11.5 6.40043 11.5 6.40043C11.5 6.40043 9.5 10.4805 6 10.4805C2.5 10.4805 0.5 6.40043 0.5 6.40043Z" stroke="#9DA0A3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="6.40043" r="1.7" stroke="#9DA0A3" strokeWidth="0.9"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path d="M4.95 2.44273C5.29417 2.36055 5.64653 2.31948 6 2.32033C9.5 2.32033 11.5 6.40043 11.5 6.40043C11.1965 6.9796 10.8345 7.52487 10.42 8.02737M7.06 7.48166C6.92268 7.63198 6.75707 7.75255 6.57308 7.83618C6.38908 7.91981 6.19045 7.96477 5.98904 7.9684C5.78764 7.97202 5.58758 7.93423 5.4008 7.85728C5.21403 7.78032 5.04436 7.66579 4.90192 7.5205C4.75949 7.37521 4.6472 7.20214 4.57175 7.01162C4.49631 6.82111 4.45926 6.61704 4.46282 6.4116C4.46637 6.20616 4.51045 6.00356 4.59244 5.81588C4.67442 5.62819 4.79263 5.45928 4.94 5.3192M8.97 9.42991C8.11529 10.0945 7.07455 10.4626 6 10.4805C2.5 10.4805 0.5 6.40043 0.5 6.40043C1.12194 5.21817 1.98457 4.18524 3.03 3.37095L8.97 9.42991Z" stroke="#9DA0A3" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
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

        {userType !== 'expert' && (
          <>
            {/* 키(cm) */}
            <div className='flex items-center space-x-3 mb-[32px]'>
              <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
              <label className='text-gray-700 font-medium min-w-[80px] flex items-center h-[36px]'>키(cm)</label>
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                value={formData.height}
                onChange={handleNumericInputChange('height')}
                placeholder='키를 입력하세요.'
                className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[180px]'
              />
            </div>

            {/* 몸무게(kg) */}
            <div className='flex items-center space-x-3 mb-[32px]'>
              <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
              <label className='text-gray-700 font-medium min-w-[120px] flex items-center h-[36px]'>몸무게(kg)</label>
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                value={formData.weight}
                onChange={handleNumericInputChange('weight')}
                placeholder='몸무게를 입력하세요.'
                className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[140px]'
              />
            </div>
          </>
        )}

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

      {/* 프로필 선택 모달 */}
      <ProfileSelectModal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          onProfileModalChange?.(false);
        }}
        onProfileSelect={handleProfileSelect}
      />
    </div>
  );
};

export default EditInfo;
