import { FiLoader } from 'react-icons/fi';

const Loading = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className={`loading loading-spinner ${sizeClasses[size]} text-primary`}></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <span className={`loading loading-spinner ${sizeClasses[size]} text-primary`}></span>
    </div>
  );
};

export default Loading;
