import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-0 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 숫자 */}
        <div className="text-8xl font-bold text-primary mb-4">
          404
        </div>
        
        {/* 메인 메시지 */}
        <h1 className="text-h2-semibold text-black mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        
        {/* 설명 */}
        <p className="text-body-2 text-gray-500 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        
        {/* 홈으로 돌아가기 버튼 */}
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-[#1D68FF] font-medium rounded-full hover:bg-[#002F8E] transition-colors duration-200 shadow-lg hover:shadow-xl"
          style={{ color: '#FFFFFF' }}
        >
          홈으로 돌아가기
        </Link>
        
        {/* 추가 안내 */}
        <div className="mt-8 text-caption-2 text-gray-400">
          <p>URL을 다시 확인해주시거나</p>
          <p>위 버튼을 클릭하여 홈페이지로 이동해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;