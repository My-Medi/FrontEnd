import { summaryDataMap } from '../../../data/mmrSummaryData';

interface SummaryTextAreaProps {
  selectedCategory: string;
}

const SummaryTextArea: React.FC<SummaryTextAreaProps> = ({ selectedCategory }) => {
  const data = summaryDataMap[selectedCategory];

  if (!data) return null;

  const { ageGroup, nickname, category, comparison } = data;
  const connector = comparison === '비슷합니다' ? '과' : '보다';

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
        <span style={{ color: '#1D68FF' }}>{nickname}</span>
        <span style={{ color: '#4D5053' }}>님</span>
        <span style={{ color: '#121218' }}>&nbsp;{category}</span>
        <span style={{ color: '#4D5053' }}>&nbsp;가능성은</span>
        <span style={{ color: '#121218' }}>&nbsp;{ageGroup}대 평균</span>
        <span style={{ color: '#4D5053' }}>{connector}</span>
        <span style={{ color: '#121218' }}>&nbsp;{comparison}</span>
        <span style={{ color: '#121218' }}>.</span>
      </p>
    </div>
  );
};

export default SummaryTextArea;
