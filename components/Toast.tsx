"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ToastState } from "@/hooks/useToast";

export function Toast({ toast }: { toast: ToastState | null }) {
  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[360px] -translate-x-1/2 rounded-[14px] border border-gold/25 bg-[#120F2D]/92 px-4 py-3 text-center text-sm text-ivory shadow-glow backdrop-blur-xl"
        >
          {toast.message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
