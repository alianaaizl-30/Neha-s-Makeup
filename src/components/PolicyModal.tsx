import React from 'react';
import { X, Truck, RefreshCw, HelpCircle, Sparkles } from 'lucide-react';

interface PolicyModalProps {
  type: 'shipping' | 'returns' | 'faq' | 'about' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative max-w-xl w-full bg-white rounded-2xl shadow-2xl border border-[#E8E4DC] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#121C33] text-white flex items-center justify-between border-b border-[#23345B]">
          <div className="flex items-center gap-2">
            {type === 'shipping' && <Truck className="w-5 h-5 text-[#C9A96E]" />}
            {type === 'returns' && <RefreshCw className="w-5 h-5 text-[#C9A96E]" />}
            {type === 'faq' && <HelpCircle className="w-5 h-5 text-[#C9A96E]" />}
            {type === 'about' && <Sparkles className="w-5 h-5 text-[#C9A96E]" />}
            <h3 className="font-serif text-lg font-bold text-[#F9F6EE] uppercase tracking-wide">
              {type === 'shipping' && 'US & UK Shipping Information'}
              {type === 'returns' && 'Returns & Shade Exchanges'}
              {type === 'faq' && 'Frequently Asked Questions'}
              {type === 'about' && 'About NEHA\'S MAKEUP'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 text-xs sm:text-sm text-[#525763] space-y-4 max-h-[70vh] overflow-y-auto leading-relaxed">
          {type === 'shipping' && (
            <>
              <p>
                <strong>Delivery Locations:</strong> We proudly offer standard and express tracked shipping to all addresses across the <strong>United States</strong> and the <strong>United Kingdom</strong>.
              </p>
              <div className="p-3 bg-[#FAF9F5] border border-[#EAE7E1] rounded-lg">
                <span className="font-semibold text-[#121C33] block mb-1">Shipping Thresholds:</span>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>United States:</strong> Free standard delivery on orders over $50 USD. Flat rate $5.99 on orders under $50.</li>
                  <li><strong>United Kingdom:</strong> Free standard delivery on orders over £40 GBP. Flat rate £4.99 on orders under £40.</li>
                  <li><strong>Priority Courier:</strong> $12.00 USD / £9.50 GBP for 1-2 business days with signature tracking.</li>
                </ul>
              </div>
              <p>
                All orders are packaged in our signature dark royal blue gift packaging with cushioned protective layers.
              </p>
            </>
          )}

          {type === 'returns' && (
            <>
              <p>
                <strong>30-Day Happiness Guarantee:</strong> If a formulation doesn't work for your skin type, or if you need a different shade tone, you may exchange or return any product within 30 days of receiving your order.
              </p>
              <p>
                <strong>Free Shade Exchanges:</strong> We know shade matching online can take care. Contact our customer care team and we will ship your adjusted shade with complimentary postage.
              </p>
            </>
          )}

          {type === 'faq' && (
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-[#121C33]">Are all products eligible for the 20% discount?</h4>
                <p className="text-xs mt-0.5">Yes! Every single product in the store—including foundations, palettes, brushes, and sets—has an automatic 20% discount applied.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#121C33]">Are the formulas vegan and cruelty-free?</h4>
                <p className="text-xs mt-0.5">100%. None of our formulations or ingredients are tested on animals, and our brush bristles use cruelty-free vegan micro-silk filaments.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#121C33]">What is the signature dark royal packaging?</h4>
                <p className="text-xs mt-0.5">Our products arrive in a sophisticated, slightly darkened royal navy blue box with soft-touch matte finish and gold foil embossing displaying NEHA'S MAKEUP.</p>
              </div>
            </div>
          )}

          {type === 'about' && (
            <>
              <p>
                <strong>NEHA'S MAKEUP</strong> was created to redefine luxury everyday beauty. By blending skin-nourishing ingredients with rich, long-lasting mineral pigments, our makeup empowers you to look effortlessly put-together in minutes.
              </p>
              <p>
                Designed for everyday beauty lovers, beginners, and enthusiasts alike, our mission is to eliminate confusion and deliver honest, high-performance formulas you'll look forward to using every morning.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-[#E8E4DC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#121C33] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#1C2C50]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
