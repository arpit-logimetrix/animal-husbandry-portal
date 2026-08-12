import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, Stethoscope, PhoneCall, ShieldAlert, ChevronRight, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface FloatingAiAssistantProps {
  language: Language;
  isOpen: boolean;
  onToggle: () => void;
  onOpenMVU?: () => void;
  onOpenDiseaseAi?: () => void;
}

export const FloatingAiAssistant: React.FC<FloatingAiAssistantProps> = ({
  language,
  isOpen,
  onToggle,
  onOpenMVU,
  onOpenDiseaseAi,
}) => {
  const isHi = language === 'hi';

  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: isHi
        ? 'नमस्कार! मैं पशु सहायक AI हूँ। मैं पशु स्वास्थ्य, FMD टीकाकरण, 1962 एम्बुलेंस तथा सरकारी योजनाओं में सहायता कर सकता हूँ।'
        : 'Namaste! I am Pashu Sahayak AI. Ask me about livestock health, FMD vaccination schedules, 1962 MVU ambulances, or government subsidy schemes.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestionChips = [
    { labelEn: 'Check FMD Schedule', labelHi: 'FMD टीकाकरण शेड्यूल', query: 'What is the current FMD vaccination campaign schedule?' },
    { labelEn: 'Book 1962 MVU', labelHi: '1962 एम्बुलेंस बुक करें', query: 'How do I request an emergency 1962 Mobile Veterinary Unit?' },
    { labelEn: 'DBT Scheme Eligibility', labelHi: 'डीबीटी योजना पात्रता', query: 'What schemes are available for dairy cattle farmers?' },
    { labelEn: 'Symptom Scanner', labelHi: 'लक्षण जांच', action: 'disease' },
  ];

  const handleSend = async (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim() || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          language,
          history: messages,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: data.text || data.fallbackText || 'Thank you for contacting Pashu Sahayak AI. Dial 1962 for urgent veterinary helpline.',
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Pashu Sahayak service offline momentarily. Please call Emergency Veterinary Helpline 1962.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="bg-gradient-to-r from-teal-700 to-[#14532D] hover:from-teal-800 hover:to-[#0f3e21] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-amber-400/80 transition-all transform hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="font-bold text-xs pr-1 hidden sm:inline">
            {isHi ? 'पशु सहायक AI' : 'Pashu Sahayak AI'}
          </span>
        </button>
      )}

      {/* Expandable Chat Box */}
      {isOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-[92vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden animate-fadeIn text-slate-900">
          {/* Header */}
          <div className="bg-[#14532D] text-white p-3.5 flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600/80 border border-teal-400/50 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-xs leading-tight flex items-center gap-1.5">
                  <span>Pashu Sahayak AI</span>
                  <span className="bg-amber-400/20 text-amber-300 font-mono text-[9px] px-1.5 py-0.2 rounded border border-amber-400/30">
                    2026 AI
                  </span>
                </h3>
                <p className="text-[10px] text-emerald-200 font-mono">
                  {isHi ? 'पशु रोग एवं विभागीय एआई सहायक' : 'Livestock Advisor • Gemini Powered'}
                </p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Helpline Strip */}
          <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200/80 flex items-center justify-between text-[11px] text-amber-900 font-medium">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-amber-600 animate-pulse" />
              {isHi ? 'आपातकालीन एमवीयू हेल्पलाइन:' : 'Urgent Helpline:'} <strong className="font-mono">1962</strong>
            </span>
            {onOpenMVU && (
              <button
                onClick={onOpenMVU}
                className="text-amber-800 hover:text-amber-950 text-[10px] font-bold underline"
              >
                {isHi ? 'ट्रैक करें →' : 'Live GPS →'}
              </button>
            )}
          </div>

          {/* Message List */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#14532D] text-white font-medium rounded-br-none shadow-2xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 text-slate-500 text-xs px-3 py-2 rounded-xl rounded-bl-none font-mono animate-pulse">
                  Pashu AI is analyzing...
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (chip.action === 'disease' && onOpenDiseaseAi) {
                    onOpenDiseaseAi();
                  } else if (chip.query) {
                    handleSend(chip.query);
                  }
                }}
                className="shrink-0 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#14532D] border border-slate-200 hover:border-emerald-300 rounded-full px-2.5 py-1 text-[10px] font-medium transition-all"
              >
                {isHi ? chip.labelHi : chip.labelEn}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isHi ? 'पशु स्वास्थ्य या योजना संबंधी प्रश्न पूछें...' : 'Ask about disease, 1962 MVU or schemes...'}
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#14532D]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#14532D] hover:bg-[#0f3e21] disabled:opacity-50 text-white p-2 rounded-xl transition-all shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
