import React from 'react';

interface NotebookPaperProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export const NotebookPaper: React.FC<NotebookPaperProps> = ({ children, className = '', rotation = 0 }) => {
  return (
    <div 
      className={`relative bg-paper shadow-2xl overflow-hidden transition-transform duration-500 ease-in-out ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        // CSS specific for the notebook lines effect
        backgroundImage: 'linear-gradient(#9ca3af 1px, transparent 1px)',
        backgroundSize: '100% 2rem', // Matches leading-8 (32px)
        lineHeight: '2rem',
        minHeight: '600px',
        maxWidth: '100%',
        width: '100%'
      }}
    >
      {/* The Red Margin Line */}
      <div className="absolute top-0 bottom-0 left-8 md:left-16 w-px bg-paper-margin opacity-60 pointer-events-none h-full z-10 border-r border-red-300"></div>
      
      {/* Holes punch effect */}
      <div className="absolute top-0 bottom-0 left-2 md:left-4 flex flex-col justify-evenly py-8 z-20">
        {[1, 2, 3].map((hole) => (
          <div key={hole} className="w-4 h-4 rounded-full bg-gray-800 shadow-inner ring-1 ring-gray-600/20"></div>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative z-10 px-12 md:px-24 py-8 h-full">
         {children}
      </div>
      
      {/* Paper texture overlay for realism */}
      <div className="absolute inset-0 bg-yellow-100 opacity-10 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]"></div>
    </div>
  );
};