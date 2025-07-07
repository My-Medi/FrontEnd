import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* TopBar와 Navigation을 위한 상단 여백 - 피그마 기준 반응형 */}
      <div style={{ 
        height: 'calc(226 * (100vw / 1920))',
        minHeight: '120px'  // 모바일에서 최소 높이 보장
      }}></div>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              MY<span className="text-[#1D68FF]">MEDi</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              당신의 건강한 일상을 위한 개인 의료 기록 관리 플랫폼
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#1D68FF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                시작하기
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                더 알아보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 MYMEDi를 선택해야 할까요?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              개인의 건강 정보를 안전하고 체계적으로 관리할 수 있는 통합 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-[#1D68FF] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">안전한 데이터 관리</h3>
              <p className="text-gray-600">
                의료 정보는 최고 수준의 보안으로 안전하게 보호됩니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">체계적인 분석</h3>
              <p className="text-gray-600">
                건강 데이터를 시각화하여 패턴과 변화를 쉽게 파악할 수 있습니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">의료진 연결</h3>
              <p className="text-gray-600">
                담당 의료진과 정보를 안전하게 공유하고 소통할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              주요 서비스
            </h2>
            <p className="text-gray-600">
              건강 관리의 모든 것을 한 곳에서 해결하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1D68FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">건강 일기</h3>
              <p className="text-gray-600 text-sm">
                일상의 건강 상태를 기록하고 관리하세요.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">약물 관리</h3>
              <p className="text-gray-600 text-sm">
                복용 중인 약물과 일정을 체계적으로 관리하세요.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">진료 예약</h3>
              <p className="text-gray-600 text-sm">
                병원 예약과 진료 일정을 간편하게 관리하세요.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">건강 분석</h3>
              <p className="text-gray-600 text-sm">
                데이터 기반의 건강 상태 분석과 리포트를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              최신 소식
            </h2>
            <p className="text-gray-600">
              건강 관리와 의료 정보에 대한 최신 소식을 확인하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* News 1 */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">2024.01.15</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  개인 건강 기록의 중요성
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  체계적인 건강 기록 관리가 왜 중요한지, 어떻게 시작해야 하는지 알아보세요.
                </p>
                <a href="#" className="text-[#1D68FF] text-sm font-medium hover:underline">
                  자세히 보기 →
                </a>
              </div>
            </article>

            {/* News 2 */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">2024.01.10</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  디지털 헬스케어 트렌드
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  2024년 디지털 헬스케어의 새로운 동향과 발전 방향을 살펴보세요.
                </p>
                <a href="#" className="text-[#1D68FF] text-sm font-medium hover:underline">
                  자세히 보기 →
                </a>
              </div>
            </article>

            {/* News 3 */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">2024.01.05</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  약물 관리 팁
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  효과적인 약물 관리를 위한 실용적인 팁과 방법을 공유합니다.
                </p>
                <a href="#" className="text-[#1D68FF] text-sm font-medium hover:underline">
                  자세히 보기 →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1D68FF]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            건강한 삶을 위한 첫 걸음을 MYMEDi와 함께 시작해보세요.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-[#1D68FF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              무료로 시작하기
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1D68FF] transition-colors">
              문의하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 