import type { MyMedicalReportResponse } from '../../../types/myMedicalReport/compare';

interface SummaryTextAreaProps {
  selectedCategory: string;
  reportData?: MyMedicalReportResponse;
  nickname?: string;
}

const SummaryTextArea: React.FC<SummaryTextAreaProps> = ({
  selectedCategory,
  reportData,
  nickname,
}) => {
  // API 데이터가 없으면 로딩 상태 표시
  if (!reportData) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 6px',
          gap: '8px',
          width: '528px',
          height: '73px',
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard',
            fontSize: '24px',
            fontWeight: 500,
            letterSpacing: '-0.72px',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            color: '#121218',
          }}
        >
          데이터를 불러오는 중...
        </p>
      </div>
    );
  }

  // API 데이터가 있으면 사용, 없으면 기본값 사용
  const displayNickname = reportData.nickname || nickname || '사용자';
  const { ageGroup10Yr } = reportData;

  // 카테고리별 averageComparisonResult 매핑
  const getComparisonResult = () => {
    switch (selectedCategory) {
      case '비만/복부비만':
        return reportData.obesityAssessmentDto?.averageComparisonResult;
      case '고혈압':
        return reportData.hypertensionAssessmentDto?.averageComparisonResult;
      case '빈혈':
        return reportData.anemiaAssessmentDto?.averageComparisonResult;
      case '당뇨병':
        return reportData.diabetesAssessmentDto?.averageComparisonResult;
      case '이상지질혈증':
        return reportData.dyslipidemiaAssessmentDto?.averageComparisonResult;
      case '신장질환':
        return reportData.kidneyDiseaseAssessmentDto?.averageComparisonResult;
      case '간장질환':
        return reportData.liverDiseaseAssessmentDto?.averageComparisonResult;
      case '요단백':
        return reportData.urineProteinAssessmentDto?.averageComparisonResult;
      default:
        return 'SIMILAR';
    }
  };

  const comparisonResult = getComparisonResult();
  const comparisonText =
    comparisonResult === 'ABOVE_GOOD'
      ? '낮습니다'
      : comparisonResult === 'BELOW_BAD'
        ? '높습니다'
        : comparisonResult === 'SIMILAR'
          ? '비슷합니다'
          : '자료를 찾을 수 없습니다';
  const connector = comparisonText === '비슷합니다' ? '과' : '보다';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 6px',
        gap: '8px',
        width: '528px',
        height: '73px',
      }}
    >
      <p
        style={{
          fontFamily: 'Pretendard',
          fontSize: '24px',
          fontWeight: 500,
          letterSpacing: '-0.72px',
          margin: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          color: '#121218',
        }}
      >
        <span style={{ color: '#1D68FF' }}>{displayNickname}</span>
        <span style={{ color: '#4D5053' }}>님</span>
        <span style={{ color: '#121218' }}>&nbsp;{selectedCategory}</span>
        <span style={{ color: '#4D5053' }}>&nbsp;가능성은</span>
        <span style={{ color: '#121218' }}>&nbsp;{ageGroup10Yr}대 평균</span>
        <span style={{ color: '#4D5053' }}>{connector}</span>
        <span style={{ color: '#121218' }}>&nbsp;{comparisonText}</span>
        <span style={{ color: '#121218' }}>.</span>
      </p>
    </div>
  );
};

export default SummaryTextArea;
