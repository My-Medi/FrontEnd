import { useNavigate } from 'react-router-dom';

const BottomButtons = () => {
  const navigate = useNavigate();
  const handleGoToFix = () => navigate('/health-result-input');
  const handleGoToDetail = () => navigate('/medical-report-llm');
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '200px',
      }}
    >
      {/* 왼쪽 흰색 버튼 */}
      <button
        style={{
          display: 'flex',
          width: '300px',
          height: '60px',
          padding: '12px 48px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          borderRadius: '36px',
          border: '0.6px solid #DBE6FF',
          background: '#FFF',
          boxShadow: '0px_0px_2px_2px_rgba(29,104,255,0.05)',
          color: '#121218',
          fontFamily: 'Pretendard',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          letterSpacing: '-0.6px',
          textAlign: 'center',
        }}
        onClick={handleGoToFix}
      >
        검진결과 수정하기
      </button>

      {/* 오른쪽 파란 버튼 */}
      <button
        style={{
          display: 'flex',
          width: '300px',
          height: '60px',
          padding: '12px 48px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          borderRadius: '36px',
          background: '#1D68FF',
          boxShadow:
            '0 0 9.6px 6px rgba(29, 104, 255, 0.00), 0 0 8.4px 6px rgba(29, 104, 255, 0.03), 0 0 7.2px 6px rgba(29, 104, 255, 0.10), 0 0 5.4px 6px rgba(29, 104, 255, 0.17), 0 0 3px 6px rgba(29, 104, 255, 0.20)',
          color: '#FFF',
          fontFamily: 'Pretendard',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '36px',
          letterSpacing: '-0.6px',
          textAlign: 'center',
          border: 'none',
        }}
        onClick={handleGoToDetail}
      >
        상세 결과 알아보기
      </button>
    </div>
  );
};

export default BottomButtons;
