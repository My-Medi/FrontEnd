import React from 'react';
import unionSvg from '/src/assets/Expert/Union.svg';

interface RoundAvatarProps {
  // 이미지 URL (없으면 기본 아이콘)
  src?: string | null;
  // 컨테이너 클래스(크기/보더/마진 등) - 스타일 유지용
  containerClass: string;
  alt?: string;
}

const RoundAvatar: React.FC<RoundAvatarProps> = ({ src, containerClass, alt = 'profile' }) => {
  const hasSrc = typeof src === 'string' && src.trim().length > 0;
  return (
    <div className={`bg-[#EDF0F3] rounded-full flex items-center justify-center overflow-hidden ${containerClass}`}>
      {hasSrc ? (
        <img src={src as string} alt={alt} className='w-full h-full object-cover rounded-full' />
      ) : (
        <img src={unionSvg} alt='기본 프로필' className='w-[92px] h-[92px]' />
      )}
    </div>
  );
};

export default RoundAvatar;


