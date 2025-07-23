import React, { useState } from "react";
import CustomCheckboxButton from "./CustomCheckboxButton";

// import CustomButton from "../Common/CustomButton"; // Removed as per edit hint

const healthFields = [
  "체중감량 / 비만",
  "불면/수면문제, 만성피로(무기력, 업무집중력저하 등)",
  "콜레스테롤 / 중성지방 수치 조절",
  "간 기능 개선 (SGOT/SGPT 등)",
  "수면 / 피로회복",
  "식습관 개선",
  "운동 루틴 설정",
  "스트레스 / 생활습관 전반",
  "기타"
];

const healthAbnormalFields = [
  "공복혈당",
  "중성지방/콜레스테롤/LDL",
  "혈압",
  "간수치(AST, ALT)",
  "BMI/체지방률",
  "건강검진 결과가 없어요"
];

const helpFields = [
  "영양사",
  "건강관리사",
  "피트니스 코치",
  "운동처방사",
  "기타"
];

const MOCK_LIST = [
  "마이메디컬리포트 3회차",
  "마이메디컬리포트 2회차",
  "마이메디컬리포트 1회차"
];

const RequestForm = () => {
  const [checkedFields, setCheckedFields] = useState<string[]>([]);
  const [reportInput, setReportInput] = useState("");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [reportList] = useState(MOCK_LIST);
  const [showReportList, setShowReportList] = useState(false);

  const handleCheck = (field: string) => {
    setCheckedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleSelectReport = (item: string) => {
    if (!selectedReports.includes(item)) setSelectedReports([...selectedReports, item]);
  };
  const handleRemoveReport = (item: string) => {
    setSelectedReports(selectedReports.filter(i => i !== item));
  };
  const handleToggleReportList = () => {
    setShowReportList((prev) => !prev);
  };

  return (
    <section className="p-8 xl:p-16">
      <h2 className="text-2xl font-bold text-center mb-2">건강 관리 요청서</h2>
      <p className="text-center text-gray-500 mb-6">건강 고민들을 최대한 자세하게 작성해주세요!</p>
      {/* 건강검진 내역 불러오기 UI */}
      <div className="bg-white rounded-2xl p-4 shadow mb-8">
        <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-wrap gap-2 border rounded-2xl bg-[#F7F8F9] h-12 items-center px-2 overflow-x-auto max-w-[600px] min-w-[200px]">
            {selectedReports.map(item => (
              <span
                key={item}
                className="flex items-center border border-gray-300 rounded-full px-4 py-1 text-gray-700 text-sm bg-white"
              >
                {item}
                <button
                  className="ml-2 text-gray-400 hover:text-red-400"
                  onClick={() => handleRemoveReport(item)}
                  type="button"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            className="h-14 px-8 rounded-[60px] bg-[#93B8FF] text-white text-lg font-semibold whitespace-nowrap shadow"
            style={{ boxShadow: "0px 2px 8px 0px rgba(29,104,255,0.10), 0px 1px 4px 0px rgba(29,104,255,0.17)" }}
            onClick={handleToggleReportList}
          >
            내 건강검진 내역 불러오기
          </button>
        </div>


        {/* 리스트: 버튼 클릭 시에만 노출 */}
        {showReportList && (
          <div className="divide-y divide-gray-200 border rounded-xl overflow-hidden mt-4">
            {reportList.map(item => (
              <div
                key={item}
                className={`h-12 flex items-center px-6 cursor-pointer text-gray-500 hover:bg-blue-50 ${selectedReports.includes(item) ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleSelectReport(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <form className="space-y-8">
        {/* 1. 직업 및 생활패턴 */}
        <div>
          <label className="block font-semibold mb-2">1. 직업 및 생활패턴</label>
          <textarea
            rows={3}
            placeholder="ex) 야근이 많은 직장인, 교대 근무, 하루 10시간 앉아 있음 등"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* 2. 건강 관심 분야 */}
        <div>
          <label className="block font-semibold mb-2">2. 건강 관심 분야 (중복 선택 가능)</label>
          <div className="flex flex-col gap-2">
            {healthFields.map((field, idx) => (
              <div key={field} className={field === "기타" ? "col-span-2" : ""}>
                <CustomCheckboxButton
                  checked={checkedFields.includes(field)}
                  onClick={() => handleCheck(field)}
                  label={field}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. 최근 건강검진 결과 중 이상 수치 */}
        <div>
          <label className="block font-semibold mb-2">3. 최근 건강검진 결과 중 이상 수치가 있던 항목이 있다면 선택해주세요.</label>
          <div className="flex flex-col gap-2">
            {healthAbnormalFields.map((field, idx) => (
              <div key={field} className={field === "건강검진 결과가 없어요" ? "col-span-2" : ""}>
                <CustomCheckboxButton
                  checked={checkedFields.includes(field)}
                  onClick={() => handleCheck(field)}
                  label={field}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. 어떤 전문가에게 도움을 받고 싶으신가요? */}
        <div>
          <label className="block font-semibold mb-2">4. 어떤 전문가에게 도움을 받고 싶으신가요?</label>
          <div className="flex flex-col gap-2">
            {helpFields.map((field, idx) => (
              <div key={field} className={field === "잘 모르겠어요" ? "col-span-2" : ""}>
                <CustomCheckboxButton
                  checked={checkedFields.includes(field)}
                  onClick={() => handleCheck(field)}
                  label={field}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 5. 건강 관리 목표 */}
        <div>
          <label className="block font-semibold mb-2">5. 목표나 기대하는 변화가 있다면 적어주세요.</label>
          <textarea
            rows={3}
            placeholder="ex) 혈당 수치를 정상화하고 싶어요. / 건강하게 체중을 감량하고 싶어요."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* 6. 요청사항*/}
        <div>
          <label className="block font-semibold mb-2">6. 전문가에게 전달할 요청사항을 적어주세요.</label>
          <textarea
            rows={3}
            placeholder="ex) 야근이 많은 직장인, 교대 근무, 하루 10시간 앉아 있음 등"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        {/* 제출 버튼 */}
        <div className="flex gap-40 justify-center">
          <button
            type="button"
            className="w-full max-w-[320px] h-14 text-lg font-semibold rounded-[60px] bg-white text-[#222]"
            style={{
              boxShadow:
                "0px 2px 8px 0px rgba(29,104,255,0.06), 0px 1px 4px 0px rgba(29,104,255,0.10)"
            }}
          >
            수정하기
          </button>
          <button
            type="submit"
            className="w-full max-w-[320px] h-14 text-lg font-semibold rounded-[60px] bg-[#1D68FF] text-white"
            style={{
              boxShadow:
                "0px 2px 8px 0px rgba(29,104,255,0.10), 0px 1px 4px 0px rgba(29,104,255,0.17)"
            }}
          >
            등록하기
          </button>
        </div>
        
      </form>
    </section>
  );
};

export default RequestForm;
