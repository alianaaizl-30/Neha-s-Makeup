import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm pointer-events-none">
      <div className="bg-[#121C33] text-white px-4 py-3 rounded-xl shadow-xl border border-[#23345B] flex items-center gap-3">
        {toastMessage.type === 'info' ? (
          <Info className="w-4 h-4 text-[#C9A96E] shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
        )}
        <div className="text-xs font-medium text-slate-100 flex-1 leading-snug">
          {toastMessage.text}
        </div>
      </div>
    </div>
  );
};
