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
    <form className="w-[1000px] bg-white flex flex-col space-y-8" onSubmit={e => { e.preventDefault(); onNext(); }}>
      {/* 이름 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">성명</label>
        <input className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="성명을 입력하세요."
          value={values.name} onChange={e => onChange("name", e.target.value)} />
      </div>
      {/* 생년월일 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-60 shrink-0 whitespace-nowrap text-[32px] font-medium">생년월일(6자리)</label>
        <input className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px]" placeholder="예) XXXXXX(숫자만 입력해주세요)"
          value={values.birth} onChange={e => onChange("birth", e.target.value)} />
      </div>
      {/* 성별 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">성별</label>
        <div className="flex items-center ml-4 space-x-10 ml-14">
          <label className="flex items-center cursor-pointer text-[22px]">
            <input type="checkbox" checked={values.gender === "male"} onChange={() => onChange("gender", "male")}
              className="accent-blue-600 w-8 h-8 mr-2" />남자
          </label>
          <label className="flex items-center cursor-pointer text-[22px]">
            <input type="checkbox" checked={values.gender === "female"} onChange={() => onChange("gender", "female")}
              className="accent-blue-600 w-8 h-8 mr-2" />여자
          </label>
        </div>
      </div>
      {/* 닉네임 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">닉네임</label>
        <input className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="닉네임을 입력하세요."
          value={values.nickname} onChange={e => onChange("nickname", e.target.value)} />
        <button type="button" className="ml-4 px-8 py-3 bg-[#DBE6FF] text-black rounded-[14px] text-[22px] font-medium" onClick={onCheckNickname}>닉네임 확인</button>
      </div>
      {/* 아이디 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">아이디</label>
        <input className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="아이디를 입력하세요."
          value={values.id} onChange={e => onChange("id", e.target.value)} />
        <button type="button" className="ml-4 px-8 py-3 bg-[#DBE6FF] text-black rounded-[14px] text-[22px] font-medium" onClick={onCheckId}>아이디 확인</button>
      </div>
      {/* 비밀번호 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">비밀번호</label>
        <input type="password" className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="소문자, 대문자, 특수기호 포함 8글자 이상"
          value={values.password} onChange={e => onChange("password", e.target.value)} />
      </div>
      {/* 비밀번호 확인 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">비밀번호 확인</label>
        <input type="password" className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="소문자, 대문자, 특수기호 포함 8글자 이상"
          value={values.passwordCheck} onChange={e => onChange("passwordCheck", e.target.value)} />
      </div>
      {/* 이메일 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">이메일</label>
        <input className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="이메일을 입력하세요."
          value={values.email} onChange={e => onChange("email", e.target.value)} />
        <span className="mx-2 text-[32px]">@</span>
        <select className="border border-gray-200 rounded-[14px] px-4 py-3 text-[22px]" value={values.emailDomain} onChange={e => onChange("emailDomain", e.target.value)}>
          {emailDomains.map((domain) => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>
      {/* 연락처 */}
      <div className="flex items-center mb-15">
        <span className="w-5 h-5 rounded-[6px] bg-[#1D68FF] mr-4" />
        <label className="w-48 text-[32px] font-medium">연락처</label>
        <input className="flex-1 h-[60px] border border-gray-200 rounded-[14px] px-6 text-[22px] ml-12" placeholder="연락처를 입력하세요."
          value={values.phone} onChange={e => onChange("phone", e.target.value)} />
      </div>
      {/* 동의 */}
      <div className="flex items-center mt-2">
        <input type="checkbox" checked={values.agree} onChange={e => onChange("agree", e.target.checked)} className="w-6 h-6" />
        <span className="text-gray-400 ml-4 text-[22px]"> -- 동의하십니까?</span>
      </div>
      {/* 버튼 */}
      <div className="flex gap-[400px]">
        <button onClick={onPrev} className="px-20 py-5 rounded-[60px] cursor-pointer bg-[#dbe6ff] text-[32px] text-[#121218] font-medium">이전</button>
        <button className="w-[380px] px-20 py-5 rounded-[60px] cursor-pointer bg-[#1d68ff] text-[32px] text-white font-semibold">다음</button>
      </div>
    </form>
  );
};

export default SignUpInfo; 