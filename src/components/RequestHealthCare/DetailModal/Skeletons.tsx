import React from 'react';
import SkeletonBlock from '../../Common/SkeletonBlock';

export const RequestMessageSkeletonLg: React.FC = () => (
	<SkeletonBlock className='w-[700px] h-[100px]' />
);

export const ProfileRowSkeletonLg: React.FC = () => (
	<div className='hidden lg:flex flex items-center w-[824px] h-[154px] px-[56px] gap-[40px] rounded-[20px] border border-[#DBE6FF] bg-white'>
		<div className='w-[124px] h-[124px] rounded-full bg-gray-200 animate-pulse' />
		<div className='flex-1 flex flex-col gap-2'>
			<SkeletonBlock className='w-40 h-6' />
			<SkeletonBlock className='w-80 h-4' />
			<SkeletonBlock className='w-72 h-4' />
			<SkeletonBlock className='w-64 h-4' />
		</div>
	</div>
);

export const GoalSkeletonLg: React.FC = () => (
	<SkeletonBlock className='w-[600px] h-6' />
);

export const AbnormalSkeletonLg: React.FC = () => (
	<SkeletonBlock className='w-[600px] h-20' />
);

export const SummarySkeletonLg: React.FC = () => (
	<SkeletonBlock className='w-[600px] h-32' />
);

export const RequestMessageSkeletonSm: React.FC = () => (
	<SkeletonBlock className='w-full h-[80px]' />
);

export const ProfileRowSkeletonSm: React.FC = () => (
	<div className='flex items-center gap-4'>
		<div className='w-[72px] h-[72px] rounded-full bg-gray-200 animate-pulse flex-shrink-0' />
		<div className='flex-1 flex flex-col gap-2'>
			<SkeletonBlock className='w-32 h-5' />
			<SkeletonBlock className='w-44 h-4' />
		</div>
	</div>
);

export const GoalSkeletonSm: React.FC = () => (
	<SkeletonBlock className='w-full h-6' />
);

export const AbnormalSkeletonSm: React.FC = () => (
	<SkeletonBlock className='w-full h-16' />
);

export const SummarySkeletonSm: React.FC = () => (
	<SkeletonBlock className='w-full h-24' />
);


