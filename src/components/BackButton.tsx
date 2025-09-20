"use client";

import { useRouter } from "next/navigation";
import { memo, useEffect, useState, useCallback } from "react";

interface BackButtonProps {
  threshold?: number; // چند پیکسل اسکرول بشه تا دکمه دیده بشه
}

const BackButtonComponent: React.FC<BackButtonProps> = ({
  threshold = 100,
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const shouldShow = currentScrollPosition > threshold;

      // فقط وقتی مقدار عوض بشه state رو تغییر بده
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    // بررسی اولیه
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={goBack}
      style={{ bottom: 100 }}
      className="fixed right-4 bg-[#7f1d1d] text-white p-3 rounded-lg shadow-md focus:outline-none z-50 transition-transform"
      aria-label="Go back"
    >
      Back
    </button>
  );
};

// memo پیچیده شد
export default memo(BackButtonComponent);
