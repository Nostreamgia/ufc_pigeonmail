import React from 'react';

interface StickyNoteProps {
  content: string;
  color?: 'yellow' | 'blue' | 'green' | 'pink';
  onClose?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ 
  content, 
  color = 'yellow', 
  onClose,
  onAction,
  actionLabel
}) => {
  const colorClasses = {
    yellow: 'bg-yellow-200 shadow-yellow-500/20',
    blue: 'bg-blue-200 shadow-blue-500/20',
    green: 'bg-green-200 shadow-green-500/20',
    pink: 'bg-pink-200 shadow-pink-500/20',
  };

  return (
    <div className={`relative w-64 md:w-72 p-6 pb-14 shadow-xl transform rotate-2 font-marker text-2xl text-gray-800 ${colorClasses[color]} animate-fade-in`}>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 transform -rotate-1 skew-x-12 backdrop-blur-sm"></div>
      <p className="leading-tight">{content}</p>
      
      {onAction && actionLabel && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAction();
                }}
                className="flex items-center gap-2 px-3 py-1 bg-white/40 hover:bg-white/60 rounded-full text-lg font-handwriting text-gray-800 border border-gray-600/20 transition-all shadow-sm hover:scale-105"
            >
                <span>{actionLabel}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </button>
        </div>
      )}
    </div>
  );
};