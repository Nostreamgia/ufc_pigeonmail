import React, { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);

  const handleSealClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen || isJiggling) return;
    
    // Trigger visual feedback (jiggle & glow)
    setIsJiggling(true);

    // After jiggle animation, tear the tape and open
    setTimeout(() => {
        setIsOpen(true);
        // Delay for envelope opening animation to complete before removing component
        setTimeout(() => {
            onOpen();
        }, 1500); 
    }, 400); // 400ms matches the jiggle animation duration
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0f0a05] font-sans perspective-2000 select-none">
        
        {/* --- DESK SURFACE (Mahogany Wood) --- */}
        <div className="absolute inset-0 z-0 bg-[#2b1d16]"
             style={{
                backgroundImage: `
                    url("https://www.transparenttextures.com/patterns/wood-pattern.png"),
                    radial-gradient(circle at 50% 50%, #4a332a 0%, #1a0f0a 100%)
                `,
                backgroundSize: 'auto, cover',
                backgroundBlendMode: 'soft-light, normal'
             }}>
        </div>

        {/* --- SCENE CONTAINER --- */}
        <div className="relative w-[800px] h-[600px] flex items-center justify-center transition-transform duration-500 origin-center scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100">

            {/* --- LEATHER DESK PAD --- */}
            <div className="absolute inset-x-8 top-12 bottom-12 bg-[#1e2820] rounded-xl shadow-2xl z-0 transform -rotate-1 border border-[#2f3d32]">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay rounded-xl"></div>
                {/* Stitching effect */}
                <div className="absolute inset-2 border border-dashed border-[#4a5d4e] opacity-50 rounded-lg"></div>
            </div>

            {/* --- PROPS: SCATTERED ITEMS --- */}
            
            {/* 1. Closed Field Journal (Top Left) */}
            <div className="absolute top-4 left-6 w-48 h-64 bg-gray-900 rounded-r-lg rounded-l-md shadow-[5px_5px_15px_rgba(0,0,0,0.5)] transform rotate-[8deg] z-10 flex flex-col justify-between p-4">
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay rounded-lg"></div>
                {/* Spine */}
                <div className="absolute top-0 bottom-0 left-0 w-6 bg-black/20 rounded-l-md border-r border-white/5"></div>
                <div className="absolute top-0 right-6 w-3 h-full bg-black/60 shadow-sm z-20"></div>
            </div>

            {/* 2. Open Notepad (Bottom Right) */}
            <div className="absolute bottom-20 right-20 w-64 h-80 bg-[#f4f1ea] shadow-[2px_10px_20px_rgba(0,0,0,0.2)] transform rotate-[-4deg] z-10 p-5 overflow-hidden rounded-sm">
                 <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-300 to-transparent z-20"></div>
                 {/* Binding */}
                 <div className="absolute top-0 left-0 right-0 h-4 bg-gray-800 z-30 flex justify-evenly items-center">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gray-600"></div>)}
                 </div>
                 {/* Paper Texture */}
                 <div className="mt-6 w-full h-full" 
                      style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '100% 24px' }}>
                    <div className="w-px h-full bg-red-300/50 ml-6"></div>
                 </div>
                 {/* Handwriting */}
                 <div className="absolute top-24 left-10 w-40 font-handwriting text-gray-500 text-lg rotate-[-1deg]">
                    Target priority alpha...<br/>
                    Wait for signal.
                 </div>
            </div>

            {/* 3. Coffee Stain */}
            <div className="absolute top-[240px] right-[140px] w-28 h-28 rounded-full border-[8px] border-[#3e2b1d]/40 opacity-40 pointer-events-none z-10 filter blur-[1px] mix-blend-multiply"></div>

            {/* 4. Brass Pen */}
            <div className="absolute bottom-[220px] left-[120px] w-64 h-3 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 rounded-full transform rotate-[40deg] shadow-lg z-10">
                 {/* Highlight */}
                 <div className="absolute top-[1px] left-2 right-2 h-[1px] bg-white/40"></div>
            </div>

            {/* --- LIGHTING & LAMP --- */}
            
            {/* Lamp Shadow */}
            <div className="absolute top-[-40px] left-[160px] w-32 h-[500px] bg-black/50 transform rotate-[-25deg] origin-top filter blur-3xl z-10 pointer-events-none mix-blend-multiply"></div>

            {/* Warm Light Pool */}
            <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay">
                 <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-orange-100/10 via-transparent to-black/40"></div>
            </div>

            {/* Lamp Base (Visual Only) */}
            <div className="absolute -top-16 left-[60px] z-50 pointer-events-none filter drop-shadow-2xl">
                 <div className="w-48 h-40 bg-[#1a1a1a] rounded-t-[40px] rounded-b-[10px] transform rotate-[-25deg] border-b-8 border-black flex items-end justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
                     <div className="w-20 h-20 bg-yellow-100 blur-2xl opacity-60 mb-[-40px]"></div>
                 </div>
            </div>


            {/* --- THE ENVELOPE (Hero Object) --- */}
            <div className="relative z-30 w-[600px] h-[400px] transition-transform duration-1000 ease-in-out"
                 style={{ 
                     transform: isOpen ? 'translateY(80px) scale(0.95)' : 'translateY(0) scale(1)',
                     transformStyle: 'preserve-3d'
                 }}>
                
                {/* 3D Thickness Simulation (Stacked Shadows) */}
                <div className={`absolute inset-0 bg-[#cbb892] rounded-md transition-shadow duration-500
                    ${isOpen ? 'shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)]' : 'shadow-[1px_1px_0_#bba57d,2px_2px_0_#bba57d,3px_3px_0_#bba57d,4px_4px_0_#bba57d,5px_5px_0_#bba57d,0_25px_50px_-12px_rgba(0,0,0,0.5)]'}`}>
                </div>

                {/* Letter Inside (Slides up) */}
                <div className={`absolute left-4 right-4 top-2 bottom-2 bg-[#fdfbf7] shadow-sm transition-all duration-1000 ease-in-out z-10 flex flex-col p-8 items-center
                    ${isOpen ? '-translate-y-[180px] rotate-[1deg] shadow-xl' : 'translate-y-0'}`}>
                        <div className="w-full h-full opacity-80 space-y-6 pt-4">
                            {/* Letter Header */}
                            <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2 mb-4">
                                <div className="text-xs font-mono font-bold tracking-widest text-gray-500">UFC-HQ-AUTH</div>
                                <div className="text-xs font-mono font-bold tracking-widest text-red-700">EYES ONLY</div>
                            </div>
                            {/* Fake Text Lines */}
                            <div className="space-y-3 font-handwriting text-gray-400 text-lg blur-[0.5px]">
                                <div className="w-full h-2 bg-gray-200 rounded"></div>
                                <div className="w-full h-2 bg-gray-200 rounded"></div>
                                <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                                <div className="w-full h-2 bg-gray-200 rounded"></div>
                                <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                </div>

                {/* Envelope Body (Back Face) */}
                <div className="absolute inset-0 bg-[#cbb892] rounded-md overflow-hidden border border-[#b0a070] z-20">
                     <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cardboard.png")` }}></div>
                </div>

                {/* Side Flaps */}
                <div className="absolute inset-0 z-30 pointer-events-none filter drop-shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#d6c79b] border-r border-[#bba57d]/50" style={{ clipPath: 'polygon(0 0, 0 100%, 45% 55%)' }}></div>
                    <div className="absolute top-0 right-0 w-full h-full bg-[#d6c79b] border-l border-[#bba57d]/50" style={{ clipPath: 'polygon(100% 0, 100% 100%, 55% 55%)' }}></div>
                </div>

                {/* Bottom Flap */}
                <div className="absolute inset-0 z-30 pointer-events-none filter drop-shadow-md">
                     <div className="absolute bottom-0 w-full h-full bg-[#e0d4b0]" 
                          style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)' }}>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                     </div>
                </div>

                {/* "CONFIDENTIAL" STAMP */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transform -rotate-12 opacity-80 pointer-events-none mix-blend-multiply border-4 border-red-900 rounded-sm p-2">
                     <div className="text-red-900 text-4xl font-mono tracking-[0.2em] font-black uppercase">
                         Confidential
                     </div>
                </div>

                {/* Top Flap (Animated) */}
                <div className={`absolute inset-0 z-40 transition-transform duration-700 ease-in-out origin-top preserve-3d`}
                     style={{ 
                        transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                     }}>
                    
                    {/* Flap Outer Face */}
                    <div className="absolute inset-0 bg-[#cbb892] shadow-md backface-hidden"
                         style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}>
                         <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cardboard.png")` }}></div>
                         <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-black/5 to-transparent"></div>
                    </div>

                    {/* Flap Inner Face */}
                    <div className="absolute inset-0 bg-[#e8dec0] transform rotateX(180deg) backface-hidden"
                         style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}>
                         <div className="absolute inset-0 shadow-inner"></div>
                    </div>
                </div>

                {/* --- TEARABLE TAPE --- */}
                <div 
                    className={`absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer group
                        ${isJiggling ? 'animate-jiggle' : ''}`}
                    style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
                    onClick={handleSealClick}
                >
                    <div className={`relative w-40 h-12 transition-all duration-200 ${isOpen ? 'scale-100' : 'group-hover:scale-105'} ${isJiggling ? 'scale-95' : ''}`}>
                        
                        {/* Tape Glow Effect on Click */}
                        <div className={`absolute inset-0 bg-red-500 blur-lg transition-opacity duration-300 ${isJiggling ? 'opacity-40' : 'opacity-0'}`}></div>

                        {/* Left Half of Tape */}
                        <div className={`absolute inset-0 transition-all duration-500 ease-out origin-center
                            ${isOpen ? '-translate-x-4 rotate-[-15deg] opacity-0' : 'translate-x-0'}`}
                            style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}>
                            <div className="w-full h-full bg-yellow-600/80 border-t border-b border-yellow-400/30 flex items-center justify-center backdrop-blur-sm shadow-sm">
                                <div className="w-full h-full opacity-50 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                            </div>
                        </div>

                        {/* Right Half of Tape */}
                        <div className={`absolute inset-0 transition-all duration-500 ease-out origin-center
                            ${isOpen ? 'translate-x-4 rotate-[15deg] opacity-0' : 'translate-x-0'}`}
                            style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}>
                             <div className="w-full h-full bg-yellow-600/80 border-t border-b border-yellow-400/30 flex items-center justify-center backdrop-blur-sm shadow-sm">
                                <div className="w-full h-full opacity-50 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                             </div>
                        </div>
                        
                        {/* Tape Text */}
                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-90'}`}>
                             <span className="text-[10px] font-mono tracking-[0.2em] text-black font-bold uppercase transform -rotate-1 border border-black px-1">Security Seal</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/90 pointer-events-none z-40"></div>
    </div>
  );
};