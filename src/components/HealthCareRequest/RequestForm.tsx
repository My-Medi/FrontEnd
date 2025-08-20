import React, { useState, useEffect } from 'react';
import CustomCheckboxButton from '../Common/CustomCheckboxButton';
import ConfirmModal from './ConfirmModal';
import { useHealthProposalQuery } from '../../hooks/healthProposal/useHealthProposalQuery';
import { useHealthProposalMutation } from '../../hooks/healthProposal/useHealthProposalMutation';
import { useHealthProposalUpdateMutation } from '../../hooks/healthProposal/useHealthProposalUpdateMutation';
import type { HealthProposalRequest } from '../../types/healthProposal';

const healthFields = [
  '체중감량 / 비만',
  '불면/수면문제, 만성피로(무기력, 업무집중력저하 등)',
  '콜레스테롤 / 중성지방 수치 조절',
  '간 기능 개선 (SGOT/SGPT 등)',
  '수면 / 피로회복',
  '식습관 개선',
  '운동 루틴 설정',
  '스트레스 / 생활습관 전반',
  '기타',
];

const healthAbnormalFields = [
  '공복혈당',
  '중성지방/콜레스테롤/LDL',
  '혈압',
  '간수치(AST, ALT)',
  'BMI/체지방률',
  '건강검진 결과가 없어요',
];

const helpFields = ['영양사', '건강관리사', '웰니스 코치', '운동처방사', '기타'];

const RequestForm = () => {
  const [formData, setFormData] = useState({
    jobAndLifestyle: '',
    healthInterests: [] as string[],
    abnormalResults: [] as string[],
    expertTypes: [] as string[],
    healthGoals: '',
    requestMessage: '',
    requestNote: '',
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const { data: healthProposal} = useHealthProposalQuery();
  const healthProposalMutation = useHealthProposalMutation();
  const healthProposalUpdateMutation = useHealthProposalUpdateMutation();

  
  // 기존 데이터가 있는지 확인 (수정 모드)
  const isEditMode = !!healthProposal?.result;

  // API 데이터를 폼에 매핑
  useEffect(() => {
    if (healthProposal?.result) {
      const proposal = healthProposal.result;
      
      // 건강 관심 분야 매핑
      const healthInterests = [];
      if (proposal.healthInterestsDto.weightManagement) healthInterests.push('체중감량 / 비만');
      if (proposal.healthInterestsDto.bloodSugarControl) healthInterests.push('불면/수면문제, 만성피로(무기력, 업무집중력저하 등)');
      if (proposal.healthInterestsDto.cholesterolControl) healthInterests.push('콜레스테롤 / 중성지방 수치 조절');
      if (proposal.healthInterestsDto.liverFunctionCare) healthInterests.push('간 기능 개선 (SGOT/SGPT 등)');
      if (proposal.healthInterestsDto.sleepRecovery) healthInterests.push('수면 / 피로회복');
      if (proposal.healthInterestsDto.dietImprovement) healthInterests.push('식습관 개선');
      if (proposal.healthInterestsDto.exerciseRoutine) healthInterests.push('운동 루틴 설정');
      if (proposal.healthInterestsDto.stressAndLifestyle) healthInterests.push('스트레스 / 생활습관 전반');

      // 이상 수치 매핑
      const abnormalResults = [];
      if (proposal.abnormalValueDto.fastingBloodSugar) abnormalResults.push('공복혈당');
      if (proposal.abnormalValueDto.cholesterolLdl) abnormalResults.push('중성지방/콜레스테롤/LDL');
      if (proposal.abnormalValueDto.bloodPressure) abnormalResults.push('혈압');
      if (proposal.abnormalValueDto.liverEnzymes) abnormalResults.push('간수치(AST, ALT)');
      if (proposal.abnormalValueDto.bmiOrBodyFat) abnormalResults.push('BMI/체지방률');
      if (proposal.abnormalValueDto.noHealthCheckResult) abnormalResults.push('건강검진 결과가 없어요');

      // 전문가 유형 매핑
      const expertTypes = [];
      if (proposal.helpTopicDto.dietitian) expertTypes.push('영양사');
      if (proposal.helpTopicDto.healthManager) expertTypes.push('건강관리사');
      if (proposal.helpTopicDto.wellnessCoach) expertTypes.push('피트니스 코치');
      if (proposal.helpTopicDto.exerciseTherapist) expertTypes.push('운동처방사');
      if (proposal.helpTopicDto.recommendForMe) expertTypes.push('기타');

      setFormData({
        jobAndLifestyle: proposal.lifeDescription || '',
        healthInterests,
        abnormalResults,
        expertTypes,
        healthGoals: proposal.goal || '',
        requestMessage: '',
        requestNote: proposal.requestNote || '',
      });
    }
  }, [healthProposal]);

  const handleCheck = (field: string, category: 'healthInterests' | 'abnormalResults' | 'expertTypes') => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(field) 
        ? prev[category].filter(f => f !== field) 
        : [...prev[category], field]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = () => {
    // 폼 데이터를 API 형식으로 변환 (사용자가 선택한 항목만 true로 설정)
    const apiData: HealthProposalRequest = {
      healthInterestsDto: {
        weightManagement: formData.healthInterests.includes('체중감량 / 비만'),
        bloodSugarControl: formData.healthInterests.includes('불면/수면문제, 만성피로(무기력, 업무집중력저하 등)'),
        cholesterolControl: formData.healthInterests.includes('콜레스테롤 / 중성지방 수치 조절'),
        bloodPressureControl: false, // 이 필드는 폼에 없으므로 false
        liverFunctionCare: formData.healthInterests.includes('간 기능 개선 (SGOT/SGPT 등)'),
        sleepRecovery: formData.healthInterests.includes('수면 / 피로회복'),
        dietImprovement: formData.healthInterests.includes('식습관 개선'),
        exerciseRoutine: formData.healthInterests.includes('운동 루틴 설정'),
        stressAndLifestyle: formData.healthInterests.includes('스트레스 / 생활습관 전반'),
      },
      abnormalValueDto: {
        fastingBloodSugar: formData.abnormalResults.includes('공복혈당'),
        cholesterolLdl: formData.abnormalResults.includes('중성지방/콜레스테롤/LDL'),
        bloodPressure: formData.abnormalResults.includes('혈압'),
        liverEnzymes: formData.abnormalResults.includes('간수치(AST, ALT)'),
        bmiOrBodyFat: formData.abnormalResults.includes('BMI/체지방률'),
        noHealthCheckResult: formData.abnormalResults.includes('건강검진 결과가 없어요'),
      },
      helpTopicDto: {
        dietitian: formData.expertTypes.includes('영양사'),
        healthManager: formData.expertTypes.includes('건강관리사'),
        wellnessCoach: formData.expertTypes.includes('피트니스 코치'),
        exerciseTherapist: formData.expertTypes.includes('운동처방사'),
        recommendForMe: formData.expertTypes.includes('기타'),
      },
      goal: formData.healthGoals,
      lifeDescription: formData.jobAndLifestyle,
      requestNote: formData.requestNote,
    };
    
    // 수정 모드인지 확인하여 적절한 API 호출
    if (isEditMode) {
      // 수정 API 호출 (PATCH)
      healthProposalUpdateMutation.mutate(apiData, {
        onSuccess: () => {
          setIsConfirmModalOpen(false);
        },
        onError: () => {
          alert('요청서 수정에 실패했습니다. 다시 시도해주세요.');
        },
      });
    } else {
      // 등록 API 호출 (POST)
      healthProposalMutation.mutate(apiData, {
        onSuccess: () => {
          setIsConfirmModalOpen(false);
        },
        onError: () => {
          alert('요청서 등록에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <section className='w-full max-w-[950px] mx-auto pl-[155px] pr-[135px] pt-[50px] pb-[50px]'>
        <h2 className='text-2xl font-bold text-center mb-2'>건강 관리 요청서</h2>
        <p className='text-center text-gray-700 pb-10'>건강 고민들을 최대한 자세하게 작성해주세요!</p>
        <form className='space-y-8' onSubmit={handleSubmit}>
          {/* 1. 직업 및 생활패턴 */}
          <div>
            <label className='block font-semibold mb-2'>1. 직업 및 생활패턴</label>
            <textarea
              rows={3}
              value={formData.jobAndLifestyle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobAndLifestyle: e.target.value }))}
              placeholder='ex) 야근이 많은 직장인, 교대 근무, 하루 10시간 앉아 있음 등'
              className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
            />
          </div>

          {/* 2. 건강 관심 분야 */}
          <div>
            <label className='block font-semibold mb-2'>2. 건강 관심 분야 (중복 선택 가능)</label>
            <div className='flex flex-col gap-2'>
              {healthFields.map((field) => (
                <div key={field} className={field === '기타' ? 'col-span-2' : ''}>
                  <CustomCheckboxButton
                    checked={formData.healthInterests.includes(field)}
                    onClick={() => handleCheck(field, 'healthInterests')}
                    label={field}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. 최근 건강검진 결과 중 이상 수치 */}
          <div>
            <label className='block font-semibold mb-2'>
              3. 최근 건강검진 결과 중 이상 수치가 있던 항목이 있다면 선택해주세요.
            </label>
            <div className='flex flex-col gap-2'>
              {healthAbnormalFields.map((field) => (
                <div key={field} className={field === '건강검진 결과가 없어요' ? 'col-span-2' : ''}>
                  <CustomCheckboxButton
                    checked={formData.abnormalResults.includes(field)}
                    onClick={() => handleCheck(field, 'abnormalResults')}
                    label={field}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 4. 어떤 전문가에게 도움을 받고 싶으신가요? */}
          <div>
            <label className='block font-semibold mb-2'>
              4. 어떤 전문가에게 도움을 받고 싶으신가요?
            </label>
            <div className='flex flex-col gap-2'>
              {helpFields.map((field) => (
                <div key={field} className={field === '잘 모르겠어요' ? 'col-span-2' : ''}>
                  <CustomCheckboxButton
                    checked={formData.expertTypes.includes(field)}
                    onClick={() => handleCheck(field, 'expertTypes')}
                    label={field}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 5. 건강 관리 목표 */}
          <div>
            <label className='block font-semibold mb-2'>
              5. 목표나 기대하는 변화가 있다면 적어주세요.
            </label>
            <textarea
              rows={3}
              value={formData.healthGoals}
              onChange={(e) => setFormData(prev => ({ ...prev, healthGoals: e.target.value }))}
              placeholder='ex) 혈당 수치를 정상화하고 싶어요. / 건강하게 체중을 감량하고 싶어요.'
              className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
            />
          </div>
          {/* 6. 요청사항*/}
          <div>
            <label className='block font-semibold mb-2'>
              6. 전문가에게 전달할 요청사항을 적어주세요.
            </label>
            <textarea
              rows={3}
              value={formData.requestNote}
              onChange={(e) => setFormData(prev => ({ ...prev, requestNote: e.target.value }))}
              placeholder='ex) 야근이 많은 직장인, 교대 근무, 하루 10시간 앉아 있음 등'
              className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
            />
          </div>
          {/* 제출 버튼 */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`w-full max-w-[320px] h-14 text-lg font-semibold rounded-[60px] ${
                isEditMode 
                  ? 'bg-white text-[#222]' 
                  : 'bg-[#1D68FF] text-white'
              }`}
              style={{
                boxShadow: isEditMode
                  ? '0px 2px 8px 0px rgba(29,104,255,0.06), 0px 1px 4px 0px rgba(29,104,255,0.10)'
                  : '0px 2px 8px 0px rgba(29,104,255,0.10), 0px 1px 4px 0px rgba(29,104,255,0.17)',
              }}
            >
              {isEditMode ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </section>

      {/* ConfirmModal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
        onCancel={handleConfirmModalCancel}
        userName="사용자" // 실제 사용자 이름으로 변경하세요
      />
    </>
  );
};

export default RequestForm;
