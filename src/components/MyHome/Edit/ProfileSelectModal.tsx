import React from 'react';
import unionSvg from '../../../assets/Expert/Union.svg';

interface ProfileSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSelect: (profileIndex: number) => void;
}

const ProfileSelectModal: React.FC<ProfileSelectModalProps> = ({ 
  isOpen,
  onProfileSelect 
}) => {
  if (!isOpen) return null;

  const profileOptions = [
    { id: 1, name: 'Component 258' },
    { id: 2, name: 'Component 259' },
    { id: 3, name: 'Component 260' },
    { id: 4, name: 'Component 261' },
    { id: 5, name: 'Component 262' },
    { id: 6, name: 'Variant6' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] p-6 max-w-md w-full mx-4">
        {/* 프로필 옵션 그리드 */}
        <div className="space-y-6">
          {/* 첫 번째 행 */}
          <div className="flex justify-center space-x-6">
            {profileOptions.slice(0, 3).map((profile) => (
              <div
                key={profile.id}
                onClick={() => onProfileSelect(profile.id)}
                className="w-[118.5px] h-[118.5px] bg-[#EDF0F3] border-[0.5px] border-[#1D68FF] rounded-[117px] flex items-center justify-center cursor-pointer hover:border-[2px] hover:shadow-[0px_3px_6px_0px_rgba(29,104,255,0.07),0px_11px_11px_0px_rgba(29,104,255,0.06),0px_26px_15px_0px_rgba(29,104,255,0.03),0px_46px_18px_0px_rgba(29,104,255,0.01),0px_71px_20px_0px_rgba(29,104,255,0)] transition-all duration-200"
              >
                <img 
                  src={unionSvg} 
                  alt={`프로필 ${profile.id}`} 
                  className="w-[73.19px] h-[74.7px] object-contain"
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
                className="w-[118.5px] h-[118.5px] bg-[#EDF0F3] border-[0.5px] border-[#1D68FF] rounded-[117px] flex items-center justify-center cursor-pointer hover:border-[2px] hover:shadow-[0px_3px_6px_0px_rgba(29,104,255,0.07),0px_11px_11px_0px_rgba(29,104,255,0.06),0px_26px_15px_0px_rgba(29,104,255,0.03),0px_46px_18px_0px_rgba(29,104,255,0.01),0px_71px_20px_0px_rgba(29,104,255,0)] transition-all duration-200"
              >
                <img 
                  src={unionSvg} 
                  alt={`프로필 ${profile.id}`} 
                  className="w-[73.19px] h-[74.7px] object-contain"
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