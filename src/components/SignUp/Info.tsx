import React from "react";

const emailDomains = ["직접입력", "naver.com", "gmail.com", "daum.net", "hanmail.net"];

interface SignUpInfoProps {
  values: {
    name: string;
    birth: string;
    gender: "male" | "female";
    nickname: string;
    id: string;
    password: string;
    passwordCheck: string;
    email: string;
    emailDomain: string;
    phone: string;
    agree: boolean;
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
  return (
    <form className="w-[540px] bg-white flex flex-col space-y-6" onSubmit={e => { e.preventDefault(); onNext(); }}>
      {/* 이름 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">성명</label>
        <input className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="성명을 입력하세요."
          value={values.name} onChange={e => onChange("name", e.target.value)} />
      </div>
      {/* 생년월일 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-36 text-base font-medium">생년월일(6자리)</label>
        <input className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="예) XXXXXX(숫자만 입력해주세요)"
          value={values.birth} onChange={e => onChange("birth", e.target.value)} />
      </div>
      {/* 성별 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">성별</label>
        <div className="flex items-center ml-4 space-x-6">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" checked={values.gender === "male"} onChange={() => onChange("gender", "male")}
              className="accent-blue-600 w-5 h-5 mr-2" />남자
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" checked={values.gender === "female"} onChange={() => onChange("gender", "female")}
              className="accent-blue-600 w-5 h-5 mr-2" />여자
          </label>
        </div>
      </div>
      {/* 닉네임 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">닉네임</label>
        <input className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="닉네임을 입력하세요."
          value={values.nickname} onChange={e => onChange("nickname", e.target.value)} />
        <button type="button" className="ml-4 px-4 py-2 bg-[#DBE6FF] text-black rounded-md font-medium" onClick={onCheckNickname}>닉네임 확인</button>
      </div>
      {/* 아이디 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">아이디</label>
        <input className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="아이디를 입력하세요."
          value={values.id} onChange={e => onChange("id", e.target.value)} />
        <button type="button" className="ml-4 px-4 py-2 bg-[#DBE6FF] text-black rounded-md font-medium" onClick={onCheckId}>아이디 확인</button>
      </div>
      {/* 비밀번호 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">비밀번호</label>
        <input type="password" className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="소문자, 대문자, 특수기호 포함 8글자 이상"
          value={values.password} onChange={e => onChange("password", e.target.value)} />
      </div>
      {/* 비밀번호 확인 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-32 text-base font-medium">비밀번호 확인</label>
        <input type="password" className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="소문자, 대문자, 특수기호 포함 8글자 이상"
          value={values.passwordCheck} onChange={e => onChange("passwordCheck", e.target.value)} />
      </div>
      {/* 이메일 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">이메일</label>
        <input className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="이메일을 입력하세요."
          value={values.email} onChange={e => onChange("email", e.target.value)} />
        <span className="mx-2">@</span>
        <select className="border border-gray-200 rounded-md px-2 py-2" value={values.emailDomain} onChange={e => onChange("emailDomain", e.target.value)}>
          {emailDomains.map((domain) => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>
      {/* 연락처 */}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-sm bg-[#1D68FF] mr-4" />
        <label className="w-24 text-base font-medium">연락처</label>
        <input className="flex-1 border border-gray-200 rounded-md px-4 py-2 ml-4" placeholder="연락처를 입력하세요."
          value={values.phone} onChange={e => onChange("phone", e.target.value)} />
      </div>
      {/* 동의 */}
      <div className="flex items-center mt-2">
        <input type="checkbox" checked={values.agree} onChange={e => onChange("agree", e.target.checked)} className="w-5 h-5" />
        <span className="text-gray-400 ml-2"> -- 동의하십니까?</span>
      </div>
      {/* 버튼 */}
      <div className="flex items-center justify-between mt-8">
        <button type="button" className="px-10 py-3 bg-[#DBE6FF] text-black rounded-full text-lg font-semibold shadow-md" onClick={onPrev}>이전</button>
        <button type="submit" className="px-10 py-3 bg-[#1D68FF] text-white rounded-full text-lg font-semibold shadow-md">다음</button>
      </div>
    </form>
  );
};

export default SignUpInfo; 