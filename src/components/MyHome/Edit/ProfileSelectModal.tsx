import React from 'react';
import profile1 from '../../../assets/MyHome/profile/profileImg1.svg';
import profile2 from '../../../assets/MyHome/profile/profileImg2.png';
import profile3 from '../../../assets/MyHome/profile/profileImg3.svg';
import profile4 from '../../../assets/MyHome/profile/profileImg4.png';
import profile5 from '../../../assets/MyHome/profile/profileImg5.svg';
import profile6 from '../../../assets/MyHome/profile/profileImg6.svg';

interface ProfileSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSelect: (profileIndex: number) => void;
}

const ProfileSelectModal: React.FC<ProfileSelectModalProps> = ({ 
  isOpen,
  onProfileSelect,
  onClose
}) => {
  if (!isOpen) return null;

  const profileOptions = [
    { id: 1, name: 'profile1', image: profile1 },
    { id: 2, name: 'profile2', image: profile2 },
    { id: 3, name: 'profile3', image: profile3 },
    { id: 4, name: 'profile4', image: profile4 },
    { id: 5, name: 'profile5', image: profile5 },
    { id: 6, name: 'profile6', image: profile6 }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white  w-[498px] h-[358px] rounded-[20px] p-[30px] max-w-md w-full  relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M18 2L2 18" stroke="#C5C8CB" strokeWidth="3" strokeLinecap="round"/>
            <path d="M18 18L2 2" stroke="#C5C8CB" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>
        
        {/* 프로필 옵션 그리드 */}
        <div className="space-y-[24px]  py-[16px] mt-[16px]">
          {/* 첫 번째 행 */}
          <div className="flex justify-center space-x-6">
            {profileOptions.slice(0, 3).map((profile) => (
              <div
                key={profile.id}
                onClick={() => onProfileSelect(profile.id)}
                className="w-[110px] h-[110px] bg-[#EDF0F3] border-[0.5px] border-[#1D68FF] rounded-[117px] flex items-center justify-center cursor-pointer hover:border-[2px] hover:shadow-[0px_3px_6px_0px_rgba(29,104,255,0.07),0px_11px_11px_0px_rgba(29,104,255,0.06),0px_26px_15px_0px_rgba(29,104,255,0.03),0px_46px_18px_0px_rgba(29,104,255,0.01),0px_71px_20px_0px_rgba(29,104,255,0)] transition-all duration-200"
              >
                <img 
                  src={profile.image} 
                  alt={`프로필 ${profile.id}`} 
                  className="w-[110px] h-[110px] object-contain"
                />
              </div>
            ))}
          </div>

          {/* 두 번째 행 */}
          <div className="flex justify-center space-x-6">
            {profileOptions.slice(3, 6).map((profile) => (
              <div
                key={profile.id}
                onClick={() => onProfileSelect(profile.id)}
                className="w-[110px] h-[110px] bg-[#EDF0F3] border-[0.5px] border-[#1D68FF] rounded-[117px] flex items-center justify-center cursor-pointer hover:border-[2px] hover:shadow-lg transition-all duration-200"
              >
                <img 
                  src={profile.image} 
                  alt={`프로필 ${profile.id}`} 
                  className="w-[110px] h-[110px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProfileSelectModal; 