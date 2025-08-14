import React from 'react';

interface SkeletonBlockProps {
	className?: string;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ className }) => {
	return <div className={`bg-gray-200 animate-pulse rounded ${className || ''}`} />;
};

export default SkeletonBlock;


