import React, { useState } from "react";

interface TermsAgreementProps {
  onNext: () => void;
  onPrev: () => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ onNext, onPrev }) => {
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    if (agreed) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen py-10">

      {/* 하단 약관 영역 */}
      <div className="flex flex-col items-start bg-white border border-[#DBE6FF]  shadow-md w-[1000px] rounded-[20px]">
        <p className="text-[30px] font-medium mt-10 ml-15 text-[#121212] mb-[32px]">약관동의</p>
        <div className="ml-15 mb-10 w-[900px] h-[544px] overflow-y-auto bg-[#e7e9ec] relative z-10 p-5 rounded-[15px]">
          <div className="text-[20px] font-medium text-black whitespace-pre-line break-words leading-normal">
            {` MyMedi 이용약관

            서비스 이용약관 주요 조항

            제1조 (목적)
            이 약관은 MyMedi(이하 '회사')가 제공하는 건강정보 중개 서비스(이하 '서비스')의 이용 조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.

            제2조 (용어의 정의)
            1. ‘서비스’란 회사가 제공하는 건강검진 결과 해석, 전문가 매칭, 건강관리 캘린더 등의 정보를 말합니다.
            2. ‘이용자’란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원을 말합니다.
            3. ‘전문가’란 영양사, 건강관리사 등 회사와 협약을 맺고 정보를 제공하는 비의료인을 의미합니다.

            제3조 (약관의 효력 및 변경)
            1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 가집니다.
            2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경 시 공지사항을 통해 고지합니다.

            제4조 (회원가입 및 계정관리)
            1. 이용자는 회사가 정한 가입 양식에 따라 정보를 기입하고 본 약관에 동의함으로써 회원가입을 신청합니다.
            2. 회사는 회원가입 신청자에게 서비스를 제공합니다. 단, 허위 정보를 기재한 경우 서비스 제공이 제한될 수 있습니다.

            제5조 (서비스의 제공)
            1. 회사는 이용자에게 건강 정보 해석, 전문가 매칭, 건강관리 캘린더 등의 서비스를 제공합니다.
            2. 회사는 서비스 제공과 관련된 시스템 유지·보수를 위해 일시적으로 서비스 제공을 중단할 수 있습니다.

            제6조 (의료행위의 비제공)
            1. 회사는 의료기관이 아니며, 의학적 진단·처방·치료를 제공하지 않습니다.
            2. 회사가 제공하는 건강 정보는 일반적인 참고용이며, 개인 건강 상태에 대한 판단은 반드시 의료전문가와 상담해야 합니다.

            제7조 (이용자의 의무)
            1. 이용자는 타인의 정보를 도용하거나 부정한 행위를 하여서는 안 됩니다.
            2. 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.

            제8조 (회사의 의무)
            1. 회사는 안정적인 서비스 제공을 위하여 최선을 다합니다.
            2. 회사는 개인정보 보호법 등 관련 법령을 준수하며, 이용자의 정보를 보호합니다.

            제9조 (지적재산권)
            1. 회사가 작성한 콘텐츠에 대한 저작권은 회사에 귀속됩니다.
            2. 이용자는 서비스를 통해 얻은 정보를 회사의 사전 동의 없이 복제, 전송, 배포할 수 없습니다.

            제10조 (면책조항)
            1. 회사는 전문가가 제공한 정보의 정확성, 신뢰성에 대해 보장하지 않습니다.
            2. 회사는 이용자가 서비스를 통해 얻은 정보를 토대로 행한 행위에 대해 책임을 지지 않습니다.

            제11조 (관할법원 및 준거법)
            1. 본 약관에 따른 분쟁은 대한민국 법률에 따르며, 분쟁 발생 시 회사 본사 소재지를 관할하는 법원을 제1심의 관할법원으로 합니다.

            부칙
            • 제1조(정보의 제공 및 광고의 게재)
            회사는 이용자가 서비스 이용 중 필요하다고 인정되는 각종 정보 및 광고를 배너 게재, 전자우편, 휴대폰 메시지, 전화, 우편 등의 방법으로 이용자에게 제공(또는 전송)할 수 있습니다. 다만, 이용자는 이를 원하지 않을 경우 회사가 제공하는 방법에 따라 수신을 거부할 수 있습니다.

            • 제2조(관할법원 및 준거법)
            서비스와 관련하여 분쟁이 발생한 경우 관할법원은 민사소송법에 따른 관할법원으로 정하며, 준거법은 대한민국의 법령을 적용합니다.

            • 제1조(시행일)
            본 약관은 2025.08.24.부터 시행됩니다.`}
            </div>
        </div>
        <div className=" font-medium  ml-15 text-[#121212] mb-[32px]">
          <label htmlFor="agree" className="flex items-center cursor-pointer">
          <input
            id="agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2 h-5 w-5"
          />
          <span className="text-[20px] text-#9DA0A3">서비스 이용약관에 모두 동의합니다.</span>
        </label>
        </div>
      </div>
      
      <button
        onClick={handleNext}
        disabled={!agreed}
        className={`w-[300px] h-[70px] py-2 text-xl mt-10 font-bold text-white rounded-full ${
          agreed ? "bg-[#1D68FF] hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        } mt-4`}
      >
        다음
      </button>
    </div>
  );
};

export default TermsAgreement;