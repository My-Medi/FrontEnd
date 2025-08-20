import React, { useState } from "react";

const emailDomains = ["직접입력", "naver.com", "gmail.com", "daum.net", "hanmail.net"];

interface SignUpInfoProps {
  values: {
    name: string;
    birthDate: string;
    gender: "MALE" | "FEMALE";
    nickname: string;
    loginId: string;
    password: string;
    passwordCheck: string;
    email: string;
    emailDomain: string;
    phoneNumber: string;
    profileImgUrl?: string;
  };
  onChange: (field: string, value: string | boolean) => void;
  onCheckNickname: () => void;
  onCheckId: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const SignUpInfo: React.FC<SignUpInfoProps> = ({
  values,
  onChange,
  onCheckNickname,
  onCheckId,
  onPrev,
  onNext,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
  const passwordMeetsComplexityRequirements = passwordComplexityRegex.test(values.password);
  const hasPassword = values.password.trim().length > 0;
  const hasConfirmPassword = values.passwordCheck.trim().length > 0;
  const passwordsMatch = hasConfirmPassword && values.password === values.passwordCheck;

  const isNameError = submitted && values.name.trim().length === 0;
  const isBirthDateError = submitted && !/^\d{6}$/.test(values.birthDate.trim());
  const isNicknameError = submitted && values.nickname.trim().length === 0;
  const isLoginIdError = submitted && values.loginId.trim().length === 0;
  const isEmailError = submitted && values.email.trim().length === 0;
  const isPhoneError = submitted && values.phoneNumber.trim().length === 0;

  const handleNext = () => {
    setSubmitted(true);

    const isNameValid = values.name.trim().length > 0;
    const isBirthDateValid = /^\d{6}$/.test(values.birthDate.trim());
    const isNicknameValid = values.nickname.trim().length > 0;
    const isLoginIdValid = values.loginId.trim().length > 0;
    const isPasswordValid = hasPassword && passwordMeetsComplexityRequirements;
    const isConfirmValid = hasConfirmPassword && passwordsMatch;
    const isEmailValid = values.email.trim().length > 0;
    const isPhoneValid = values.phoneNumber.trim().length > 0;

    const allValid = isNameValid && isBirthDateValid && isNicknameValid && isLoginIdValid && isPasswordValid && isConfirmValid && isEmailValid && isPhoneValid;
    if (!allValid) return;

    onNext();
  };

  return (
    <form className='pt-[10px] pl-[190px]' onSubmit={e => { e.preventDefault(); handleNext(); }}>
        {/* 성명 */}
        <div className={`flex items-center ${isNameError ? ' ' : ' mb-[24px]'}`}> {/* 있을 때: 빈칸 없음, 없을 때: 빈칸 있음 */}
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>성명</label>
          <input
            placeholder='성명을 입력하세요.'
            type='text'
            value={values.name}
            onChange={(e) => onChange('name', e.target.value)}
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[122.2px]'
          />
          
        </div>
        {isNameError && (
            <div className='ml-[180px] mt-[3px] mb-[6px] text-[10px] text-red-500'>성명을 입력해주세요.</div>
          )}

        {/* 생년월일 */}
        <div className={`flex items-center ${isBirthDateError ? ' ' : ' mb-[24px]'}`}>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>생년월일(6자리)</label>
          <input
            type='text'
            value={values.birthDate}
            onChange={(e) => onChange('birthDate', e.target.value)}
            placeholder='예) 000926'
            maxLength={6}
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[45px]'
          />

        </div>
        {isBirthDateError && (
            <div className='ml-[180px] mt-[3px] mb-[6px] text-[10px] text-red-500'>생년월일 6자리를 입력해주세요.</div>
          )}

        {/* 성별 */}
        <div className='flex items-center mb-[24px]'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>성별</label>
          <div className='flex space-x-4 ml-[122.2px] gap-[36px]'>
            <label className="flex items-center cursor-pointer text-[14px]">
              <input 
                type="checkbox" 
                checked={values.gender === "MALE"} 
                onChange={() => onChange("gender", "MALE")}
                className="hidden"
              />
              <div className="mr-[8px]">
                {values.gender === "MALE" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                    <rect x="0.203125" width="18" height="18" rx="4.8" fill="#1D68FF"/>
                    <path d="M5.60156 8.72089L8.40577 11.4002L12.8016 7.2002" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                    <rect x="0.203125" width="18" height="18" rx="4.8" fill="white" stroke="#9DA0A3" strokeWidth="0.6"/>
                    <path d="M5.60156 8.72089L8.40577 11.4002L12.8016 7.2002" stroke="#9DA0A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>남자
            </label>
            <label className="flex items-center cursor-pointer text-[14px]">
              <input 
                type="checkbox" 
                checked={values.gender === "FEMALE"} 
                onChange={() => onChange("gender", "FEMALE")}
                className="hidden"
              />
              <div className="mr-[8px]">
                {values.gender === "FEMALE" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                    <rect x="0.203125" width="18" height="18" rx="4.8" fill="#1D68FF"/>
                    <path d="M5.60156 8.72089L8.40577 11.4002L12.8016 7.2002" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                    <rect x="0.203125" width="18" height="18" rx="4.8" fill="white" stroke="#9DA0A3" strokeWidth="0.6"/>
                    <path d="M5.60156 8.72089L8.40577 11.4002L12.8016 7.2002" stroke="#9DA0A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>여자
            </label>
          </div>
        </div>

        {/* 닉네임 */}
        <div className={`flex items-center ${isNicknameError ? ' ' : ' mb-[24px]'}`}>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>닉네임</label>
          <input
            type='text'
            value={values.nickname}
            onChange={(e) => onChange('nickname', e.target.value)}
            placeholder='닉네임을 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[107px]'
          />

          <button
            type='button'
            onClick={onCheckNickname}
            className='w-[101px] h-[36px] text-[12px] text-black bg-[#DBE6FF] rounded-[8.4px] ml-[24.4px]'
          >
            닉네임 확인
          </button>
        </div>
        {isNicknameError && (
            <div className='ml-[180px] mt-[3px] mb-[6px] text-[10px]  text-red-500'>닉네임을 입력해주세요.</div>
          )}
        
        {/* 닉네임 아래 점선 */}
        <div className='flex justify-center mb-[24px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="700" height="2" viewBox="0 0 700 2" fill="none">
            <path d="M1 1L700 1.00005" stroke="#DBE6FF" strokeWidth="0.5" strokeLinecap="square" strokeLinejoin="round" strokeDasharray="1.8 1.8"/>
          </svg>
        </div>

        {/* 아이디 */}
        <div className={`flex items-center ${isLoginIdError ? ' ' : ' mb-[24px]'}`}>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>아이디</label>
          <input
            type='text'
            value={values.loginId}
            onChange={(e) => onChange('loginId', e.target.value)}
            placeholder='아이디를 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[107px]'
          />

          <button
            type='button'
            onClick={onCheckId}
            className='w-[101px] h-[36px] text-[12px] text-black bg-[#DBE6FF] rounded-[8.4px] ml-[24.4px]'
          >
            아이디 확인
          </button>
        </div>
        {isLoginIdError && (
            <div className='ml-[180px] mt-[3px] mb-[6px] text-[10px] text-red-500'>아이디를 입력해주세요.</div>
          )}

        {/* 비밀번호 */}
        <div className="flex items-center ">
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>비밀번호</label>
          <div className='relative ml-[93px]'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e) => onChange('password', e.target.value)}
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
        <div className={`ml-[180px] text-[10px]  ${
            submitted && !hasPassword
              ? 'text-red-500'
              : (!hasPassword || passwordMeetsComplexityRequirements ? 'text-gray-400' : 'text-red-500')
          } mb-[24px] mt-[3px]`}>
          {submitted && !hasPassword
            ? '비밀번호를 입력해주세요.'
            : '소문자, 대문자, 특수기호 포함 8글자 이상'}
        </div>
        

        {/* 비밀번호 확인 */}
        <div className='flex items-center '>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>비밀번호 확인</label>
          <div className='relative ml-[63px]'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={values.passwordCheck}
              onChange={(e) => onChange('passwordCheck', e.target.value)}
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
        <div className='ml-[180px] mt-[3px] mb-[24px]'>
          {submitted && !hasConfirmPassword && (
            <div className='text-[10px] text-red-500 mb-[-18px]'>비밀번호 확인을 입력해주세요.</div>
          )}
          {hasConfirmPassword && !passwordsMatch && (
            <div className='text-[10px] text-red-500 mb-[-18px]'>비밀번호가 일치하지 않습니다</div>
          )}
        </div>

        {/* 비밀번호 확인 아래 점선 */}
        <div className='flex justify-center mb-[24px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="700" height="2" viewBox="0 0 700 2" fill="none">
            <path d="M1 1L700 1.00005" stroke="#DBE6FF" strokeWidth="0.5" strokeLinecap="square" strokeLinejoin="round" strokeDasharray="1.8 1.8"/>
          </svg>
        </div>

        {/* 이메일 */}
        <div className={`flex items-center space-x-3${isEmailError ? '' : ' mb-[24px]'}`}>
        <div className='flex items-center'>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>이메일</label>
          <input
            type='text'
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder='이메일을 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[107px]'
          />
          </div>

          <span className='text-gray-500 text-[19.5px]'>@</span>
          <div className='relative'>
            <select
              value={values.emailDomain}
              onChange={(e) => onChange('emailDomain', e.target.value)}
              className='w-[88px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white pl-2 pr-8 appearance-none'
            >
              {emailDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#121218"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='pointer-events-none absolute top-1/2 -translate-y-1/2 right-[10px]'
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {isEmailError && (
            <div className='ml-[180px] mt-[3px] mb-[6px] text-[10px] text-red-500'>이메일을 입력해주세요.</div>
          )}

        {/* 연락처 */}
        
        <div className={`flex items-center ${isPhoneError ? ' ' : ' mb-[24px]'}`}>
          <div className='w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px] flex-shrink-0'></div>
          <label className='text-gray-700 font-medium flex items-center h-[36px] ml-[15px]'>연락처</label>
          <input
            type='text'
            value={values.phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            placeholder='연락처를 입력하세요.'
            className='w-[208px] h-[36px] flex-shrink-0 rounded-[8.4px] text-[14px] border border-[#9DA0A3] bg-white px-3 ml-[107px]'
          />
        </div>
        {isPhoneError && (
            <div className='ml-[180px] mt-[3px] mb-[6px] text-[10px] text-red-500'>연락처를 입력해주세요.</div>
          )}

        {/* 연락처 아래 점선 */}
        
        <div className='flex justify-center mb-[24px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="700" height="2" viewBox="0 0 700 2" fill="none">
            <path d="M1 1L700 1.00005" stroke="#DBE6FF" strokeWidth="0.5" strokeLinecap="square" strokeLinejoin="round" strokeDasharray="1.8 1.8"/>
          </svg>
        </div>


        <div className="flex gap-[185px]">
          <button onClick={onPrev} className="px-10 py-3 rounded-[30px] cursor-pointer bg-[#dbe6ff] text-[18px] text-[#121218] font-semibold">이전</button>
          
          <button type="submit" className="w-[216px] px-10 py-3 rounded-[30px] cursor-pointer bg-[#1d68ff] text-[18px] text-white font-semibold">다음</button>
        </div>

    </form>
  );
};

export default SignUpInfo; 