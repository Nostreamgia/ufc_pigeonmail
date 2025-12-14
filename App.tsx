import React, { useState } from 'react';
import { NotebookPaper } from './components/NotebookPaper';
import { StickyNote } from './components/StickyNote';
import { Envelope } from './components/Envelope';
import { generateReply } from './services/geminiService';
import { ReplyTone } from './types';

// The data provided in the prompt
const INITIAL_DATA = {
  id: "59231",
  variant: "chat_message",
  title: "Message Requesting Return to UFC",
  body: `Hi Rajdip,

It’s been a while, brother. I hope you’ve been resting well in your well-earned retirement. Things have changed a lot since you stepped down — and not in the way any of us had hoped.

Most of our old core members have drifted away, the conversations have lost direction, and honestly… the group you once built with so much spirit has turned into something unrecognisable. The vision you planted — a space where people talked, supported each other, and built something meaningful — is buried under constant spam, random nonsense, and, well… things none of us ever imagined would fill the chat.

That’s why I’m reaching out.

We need you. Even if only for a short while. Not as a permanent leader, not as someone who has to rebuild everything alone — just as the guiding voice who started it all. Someone who can help us restore the order, honour, and sense of community that once made UFC something we were proud of.

A temporary return. A commander stepping back onto the deck just long enough to steady the ship.

If you can come back even briefly and help us realign, rebuild, and remind everyone what UFC was meant to be… it would mean a lot. To me, to the few originals who remain, and to the legacy you created.

Think about it, CMDR.
The banner hasn’t fallen — it’s just waiting for someone worthy to lift it again.

LONG LIVE UFC. 🏳️
Awaiting your reply.`
};

const App: React.FC = () => {
  const [reply, setReply] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTools, setShowTools] = useState(false);
  
  // Intro State
  const [introOpen, setIntroOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const handleGenerateReply = async (tone: ReplyTone) => {
    setIsGenerating(true);
    setReply(null); // Clear previous
    try {
      const generatedText = await generateReply(INITIAL_DATA.body, tone);
      setReply(generatedText);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenInstagram = () => {
    if (reply) {
      navigator.clipboard.writeText(reply).then(() => {
        window.open('https://ig.me/m/theufc.interschool', '_blank');
      }).catch(err => {
        console.error('Clipboard failed', err);
        window.open('https://ig.me/m/theufc.interschool', '_blank');
      });
    }
  };

  const handleEnvelopeOpen = () => {
    setIntroOpen(true);
    // Allow time for the fade out animation
    setTimeout(() => {
        setIntroComplete(true);
    }, 1200);
  };

  return (
    <>
        {/* Intro Envelope Overlay */}
        {!introComplete && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2e2e2e] transition-all duration-1000 ease-in-out ${introOpen ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
                 <Envelope onOpen={handleEnvelopeOpen} />
            </div>
        )}

        {/* Main Application */}
        <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden transition-opacity duration-1000 delay-300 ${introOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            
            {/* Left Control Panel (Desktop) / Bottom Sheet (Mobile) */}
            <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700 sticky top-8">
                <h2 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4 flex items-center gap-2">
                {/* Instagram Icon */}
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram Direct
                </h2>
                
                <p className="text-xs text-gray-400 mb-4">
                Responding to <span className="text-white font-medium">@theufc.interschool</span> request.
                </p>

                {!showTools ? (
                <button 
                    onClick={() => setShowTools(true)}
                    className="w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded text-sm font-medium transition-all"
                >
                    Draft Reply
                </button>
                ) : (
                <div className="space-y-3 animate-fade-in">
                    <div className="text-xs font-semibold text-gray-400 uppercase">Select Tone</div>
                    {Object.values(ReplyTone).map((tone) => (
                    <button
                        key={tone}
                        onClick={() => handleGenerateReply(tone)}
                        disabled={isGenerating}
                        className="w-full text-left px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-sm transition-colors flex items-center justify-between"
                    >
                        <span>{tone}</span>
                        {isGenerating && <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>}
                    </button>
                    ))}
                </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Direct Connection: Active</span>
                </div>
                </div>
            </div>

            {/* Render Reply if it exists (on desktop side column) */}
            {reply && (
                <div className="hidden lg:block relative z-30">
                    <StickyNote 
                    content={reply} 
                    onClose={() => setReply(null)} 
                    color="yellow" 
                    actionLabel="Copy & Open IG"
                    onAction={handleOpenInstagram}
                    />
                </div>
            )}
            </div>

            {/* Main Notebook Area */}
            <div className="lg:col-span-9 order-1 lg:order-2 perspective-1000">
            <NotebookPaper rotation={-1} className="w-full">
                {/* Header / Date */}
                <div className="flex justify-between items-end mb-8 font-handwriting text-gray-500 text-xl border-b-2 border-gray-300/50 pb-1">
                <span>Ref: #{INITIAL_DATA.id}</span>
                <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                {/* Title */}
                <h1 className="font-handwriting text-3xl md:text-4xl text-gray-800 font-bold mb-8 leading-snug" style={{ lineHeight: '3rem'}}>
                {INITIAL_DATA.title}
                </h1>

                {/* Body Text */}
                <div className="font-handwriting text-xl md:text-2xl text-gray-800 whitespace-pre-wrap leading-8 tracking-wide">
                {INITIAL_DATA.body}
                </div>

                {/* Signature Area simulation */}
                <div className="mt-12 h-24 font-handwriting text-gray-400 text-lg italic">
                (Signed with urgency)
                </div>
            </NotebookPaper>

            {/* Mobile Reply View (Overlay) */}
            {reply && (
                <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setReply(null)}>
                <div onClick={e => e.stopPropagation()}>
                    <StickyNote 
                    content={reply} 
                    onClose={() => setReply(null)} 
                    color="yellow"
                    actionLabel="Copy & Open IG"
                    onAction={handleOpenInstagram} 
                    />
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
    </>
  );
};

export default App;