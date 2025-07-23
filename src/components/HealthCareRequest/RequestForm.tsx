import React from "react";

const RequestForm = () => {
  return (
    <section className="p-8 xl:p-16">
      <h2 className="text-2xl font-bold text-center mb-2">건강 관리 요청서</h2>
      <p className="text-center text-gray-500 mb-6">건강 고민들을 최대한 자세하게 작성해주세요!</p>
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
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" className="mr-2" />체중감량 / 비만</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />불면/수면문제, 만성피로(무기력, 업무집중력저하 등)</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />콜레스테롤 / 중성지방 수치 조절</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />간 기능 개선 (SGOT/SGPT 등)</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />수면 / 피로회복</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />식습관 개선</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />운동 루틴 설정</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />스트레스 / 생활습관 전반</label>
            <label className="flex items-center col-span-2"><input type="checkbox" className="mr-2" />기타</label>
          </div>
        </div>

        {/* 3. 최근 건강검진 결과 중 이상 수치 */}
        <div>
          <label className="block font-semibold mb-2">3. 최근 건강검진 결과 중 이상 수치가 있던 항목이 있다면 선택해주세요.</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" className="mr-2" />공복혈당</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />중성지방/콜레스테롤/LDL</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />혈압</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />간수치(AST, ALT)</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />BMI/체지방률</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />건강검진 결과가 없어요</label>
          </div>
        </div>

        {/* 4. 어떤 전문가에게 도움을 받고 싶으신가요? */}
        <div>
          <label className="block font-semibold mb-2">4. 어떤 전문가에게 도움을 받고 싶으신가요?</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" className="mr-2" />영양사</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />건강관리사</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />피트니스 코치</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" />운동처방사</label>
            <label className="flex items-center col-span-2"><input type="checkbox" className="mr-2" />잘 모르겠어요</label>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">내 건강관리 입력 완료하기</button>
        </div>
      </form>
    </section>
  );
};

export default RequestForm;
