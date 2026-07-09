"use client";

import { motion } from "framer-motion";
import { NumberOrb } from "./NumberOrb";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#020613]/80 px-8 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="cosmic-card w-full max-w-[320px] rounded-[18px] border border-gold/25 bg-[#0E1430]/90 p-6 text-center shadow-glow"
      >
        <div className="flex justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
            <NumberOrb value={7} size="md" />
          </motion.div>
        </div>
        <p className="mt-5 text-base font-semibold text-ivory">正在解析数字能量...</p>
        <p className="mt-2 text-xs leading-5 text-mist">请保持问题清晰，答案会更接近你</p>
      </motion.div>
    </div>
  );
}
