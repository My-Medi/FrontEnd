import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HealthTermButtons from '../../components/HealthTerms/HealthTermButtons';
import HealthTermInfo from '../../components/HealthTerms/HealthTermsInfo';
import backSvg from '../../assets/back.svg';

interface HealthTerm {
  id: string;
  name: string;
  description: string;
  quote: string;
}

const HealthTermsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  //팝업창 클릭 시 이동 구현
  useEffect(() => {
    const pre = (location.state as { preselectTerm?: string } | null)?.preselectTerm;
    if (pre) {
      setSelectedTerm(pre);
    }
  }, [location.state]);

  const healthTerms: HealthTerm[] = [
    // 첫 번째 줄 (6개)
    {
      id: '공복혈당(FBS)',
      name: '공복혈당(FBS)',
      quote: '"피 속 설탕이 얼마나 있는 지 볼게요!"',
      description:
        '공복혈당? 아침에 아무것도 안 먹은 상태에서 피 속에 설탕(포도당)이 얼마나 있는지 보는 검사예요. 우리 몸은 밥이나 빵 같은 걸 먹으면 그게 포도당으로 바뀌어서 에너지가 되는데요. 그게 너무 많아지면 당뇨병이라는 병이 생길 수 있어요. 그래서 공복혈당은 70~99mg/dL 사이의 수치면 괜찮다고 해요.',
    },
    {
      id: '혈색소(Hemoglobin)',
      name: '혈색소(Hemoglobin)',
      quote: '"피 속 산소 배달부가 부족하지 않은지 확인해요!"',
      description:
        '혈색소?  내 피가 산소를 얼마나 잘 나르고 있는지를 알려주는 지표예요. 수치가 너무 낮으면 빈혈일 수 있고, 어지럽거나 피곤한 이유가 될 수 있어요. 보통 여자는 12g/dL 이상, 남자는 13g/dL 이상이면 괜찮다고 해요. 만약 너무 낮으면, 철분이 든 음식(예: 소고기, 시금치, 간, 달걀 등)을 먹거나 병원에서 치료를 받기도 해요.',
    },
    {
      id: '총콜레스테롤',
      name: '총콜레스테롤',
      quote: '"피 속 기름, 너무 많으면 안 돼요!"',
      description:
        '콜레스테롤?  피 속에 있는 기름 같은 거예요. 몸에 꼭 필요한 것도 있지만, 너무 많으면 혈관을 막아서 병이 생길 수 있어요. 그래서 이 수치는 200mg/dL보다 낮은 게 좋아요.',
    },
    {
      id: 'LDL 콜레스테롤',
      name: 'LDL 콜레스테롤',
      quote: '"나쁜 기름이 혈관을 막아요!"',
      description:
        "LDL 콜레스테롤?  이건 '나쁜 콜레스테롤'이에요. 하혈관에 들러붙어서 막히게 만들 수 있는 나쁜 기름이에요. 그래서 130mg/dL보다 낮게 유지하는 게 좋아요.",
    },
    {
      id: 'HDL 콜레스테롤',
      name: 'HDL 콜레스테롤',
      quote: '"착한 기름이 나쁜 기름을 치워줘요!"',
      description:
        'HDL 콜레스테롤?  이건 ‘좋은 콜레스테롤’이에요. 혈관 청소부처럼, 나쁜 기름을 치워주는 역할을 해요. 그래서 이건 많을수록 좋아요. 40 이상이면 괜찮다고 해요!',
    },
    {
      id: '중성지방(Triglyceride)',
      name: '중성지방(Triglyceride)',
      quote: '"먹고 남은 에너지가 기름이 돼요"',
      description:
        '중성지방?  우리가 먹고 남은 에너지가 몸에 기름으로 쌓인 거예요. 너무 많으면 지방간이나 고지혈증 같은 병이 생길 수 있어요. 그래서 150mg/dL 아래로 유지하는 게 좋아요.',
    },
    // 두 번째 줄 (7개)
    {
      id: '혈청 크레아티닌',
      name: '혈청 크레아티닌',
      quote: '"콩팥이 찌꺼기를 잘 버리는지 확인해요"',
      description:
        '혈청 크레아티닌?  콩팥(신장)이 몸속 찌꺼기를 잘 버리는지 보는 검사에요. 우리 몸은 활동하면서 노폐물이 생기는데요, 그걸 콩팥이 소변으로 잘 배출해야 건강해요. 남자 기준 0.7~1.3mg/dL, 여자 기준 0.5~1.1mg/dL이면 괜찮아요.',
    },
    {
      id: '요단백',
      name: '요단백',
      quote: '“콩팥의 필터!”',
      description:
        '요단백?  소변에 ‘단백질’이 섞여 나왔는지 보는 검사예요. 보통 단백질은 몸에서 필요한 중요한 영양소이기 때문에 소변으로 나가면 안 돼요. 그런데 콩팥이 아프거나 약해지면, 필터가 망가져서 단백질이 소변에 새어 나올 수 있어요.',
    },
    {
      id: 'AST(SGOT) / ALT(SGPT)',
      name: 'AST(SGOT) / ALT(SGPT)',
      quote: '"간이 아프면 수치가 올라가요"',
      description:
        'AST(SGOT) / ALT(SGPT)?  간 수치를 알아보는 검사에요. 간은 우리가 먹은 음식이나 약을 깨끗하게 정리해주는 기관이에요. 하지만 간이 아프면 이 수치들이 올라가요. 둘 다 40IU/L 아래면 괜찮아요.',
    },
    {
      id: '신사구체여과율(eGFR)',
      name: '신사구체여과율(eGFR)',
      quote: '"단백질 먹고 생긴 찌꺼기를 잘 버렸나요?"',
      description:
        '신사구체여과율 (eGFR)?  우리 몸속 필터가 제대로 작동하고 있는지 확인하는 검사에요. 우리 몸 속에는 찌꺼기나 노폐물이 생기는데요, 이걸 콩팥이 깨끗하게 걸러서 소변으로 보내줘야 해요. ‘신사구체’는 콩팥 속 아주 작은 필터처럼 생긴 부분이에요. 그 필터가 제대로 작동하고 있는지 확인하는 검사가 바로 이거예요. 60 아래로 내려가면 콩팥이 좀 힘들어하는 거예요.',
    },
    {
      id: 'B형 간염',
      name: 'B형 간염',
      quote: '“작은 병균이 몸속에 들어가서 간을 아프게 해요.”',
      description:
        'B형 간염?  B형 간염 바이러스가 몸에 들어오면, 작은 병균이 몸속에 들어가서 간을 아프게 하는 질병이에요. 이 바이러스가 몸에 들어오면, 피를 통해 다른 사람에게 옮길 수도 있어요. 하지만 걱정하지 마세요! 우리나라는 아기 때부터 예방접종을 해줘요. 항원(-) 항체(+)  제일 좋아요! 감염 안 됐고, 면역도 있어요. 항원(-) 항체(-)  감염은 안 됐지만 면역도 없어요. 예방접종 다시 해야 할 수도 있어요. 항원(+)  바이러스가 있을 수 있어서, 병원에서 꼭 다시 검사 받아야 해요.',
    },
    {
      id: '비활동성 폐결핵',
      name: '비활동성 폐결핵',
      quote: '“예전에 싸우다가 이긴 병균이 흉터처럼 남아 있는 거에요.”',
      description:
        '비활동성 폐결핵?  예전에 결핵균에 한 번 감염된 적은 있지만, 지금은 전혀 활동하지 않고 조용히 잠든 상태라는 뜻이에요. 결핵은 ‘결핵균’이라는 아주 작은 세균이 몸에 들어와서 생기는 병이에요. 특히 폐에 들어오면 ‘폐결핵’이라고 해요. 옛날엔 정말 무서운 병이었지만, 지금은 약도 많고 치료도 잘 되는 병이에요.',
    },
    {
      id: '감마GTP(Y-GTP)',
      name: '감마GTP(Y-GTP)',
      quote: '"간이 술이나 기름진 음식 때문에 힘들어요"',
      description:
        '감마GTP(Y-GTP)?  이건 특히 술이나 기름진 음식 때문에 간이 얼마나 힘든지 보는 수치예요. 기름진 음식이나 음료를 많이 먹어도 올라갈 수 있어요. 남자는 73 이하, 여자는 40 이하면 괜찮아요. ',
    },
  ];

  return (
    <div className='w-full'>
      <div className='w-[1301px] mx-auto  pt-[60px]'>
        {/* 뒤로가기 버튼과 카테고리 제목 */}
        <div className='mb-[12px]'>
          <div className='flex items-center'>
            <button
              className='absolute w-[17px] h-[35px] flex items-center justify-center hidden [@media(min-width:1280px)]:flex'
              aria-label='뒤로가기'
              onClick={() => navigate(-1)}
            >
              <img src={backSvg} alt='뒤로가기' className='w-full h-full object-contain' />
            </button>
            <div className='flex-1 text-center'>
              <span className='text-[20px] text-black block font-pretendard font-semibold'>건강용어</span>
            </div>
          </div>
        </div>
        </div>
        <div className='w-[1363px] mx-auto'>
        {/* 선택된 용어 제목 */}
        {selectedTerm && (
          <div className='text-center mb-[60px]'>
            <h2 className='text-[28px] font-bold text-black'>{selectedTerm}</h2>
          </div>
        )}

        {/* 초기 상태일 때만 표시되는 제목 */}
        {!selectedTerm && (
          <div className='text-center mb-[60px]'>
            <h1 className='text-[28px] font-bold text-[#121218]'>
              더 알아보고 싶은 건강용어를 선택해보세요!
            </h1>
          </div>
        )}

        {/* 선택된 용어 정보 */}
        {selectedTerm && <HealthTermInfo selectedTerm={selectedTerm} healthTerms={healthTerms} />}

        {/* 건강용어 버튼들 */}
        <HealthTermButtons
          healthTerms={healthTerms}
          selectedTerm={selectedTerm}
          onTermSelect={setSelectedTerm}
        />
      </div>
    </div>
  );
};

export default HealthTermsPage;
