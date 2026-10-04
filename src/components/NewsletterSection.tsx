import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E8E4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>The Beauty Journal</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33] mb-3">
          Join NEHA'S MAKEUP Club
        </h2>

        <p className="text-sm text-[#5B606B] max-w-lg mx-auto mb-8">
          Receive exclusive previews of new seasonal formulations, professional artist masterclasses, and private member promotions.
        </p>

        {submitted ? (
          <div className="p-4 bg-[#E8F3EB] text-[#2F683B] rounded-xl max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-semibold">
            <Check className="w-4 h-4" />
            <span>Thank you for subscribing! Your welcome gift has been sent.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#D5D0C5] rounded-lg text-xs sm:text-sm text-[#1E2024] placeholder:text-slate-400 focus:outline-none focus:border-[#121C33] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#121C33] text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-[#1C2C50] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#7A808C] mt-3">
          We respect your privacy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
