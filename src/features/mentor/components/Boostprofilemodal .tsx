import React, { useState } from "react";
import { Sparkles, Check, Loader2, X } from "lucide-react";

const boostFeatures = [
  "View full student profiles",
  "Unlimited chat with students",
  "Priority listing in search",
  "Advanced booking analytics",
];

interface BoostProfileModalProps {
  open: boolean;
  onClose: () => void;
}

function BoostProfileModal({ open, onClose }: BoostProfileModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!open) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing — swap this for a real checkout call
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 1400);
  };

  const handleClose = () => {
    onClose();
    // Reset state after the close animation would finish
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="gradient-orange relative px-6 pb-8 pt-6 text-white">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-lg font-semibold">Boost your profile</h2>
          <p className="mt-1 text-sm text-white/85">
            Get seen first and book up to 3× more sessions.
          </p>
        </div>

        {!isDone ? (
          <div className="px-6 pb-6 pt-5">
            {/* Price */}
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-bold text-gray-900">$19</span>
              <span className="pb-1 text-sm font-medium text-gray-500">
                / month
              </span>
            </div>

            {/* Features */}
            <ul className="mt-5 flex flex-col gap-3">
              {boostFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <Check className="h-3 w-3 text-amber-600" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="gradient-orange mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing payment…
                </>
              ) : (
                "Pay $19 & activate boost"
              )}
            </button>

            <p className="mt-3 text-center text-[11px] text-gray-400">
              Cancel anytime. Billed monthly, no long-term commitment.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 pb-8 pt-5 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-6 w-6 text-emerald-600" strokeWidth={3} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              Profile boosted!
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You're now prioritized in student search results.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 h-10 w-full rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoostProfileModal;