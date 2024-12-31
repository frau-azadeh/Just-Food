'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackButton = () => {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  // بروزرسانی موقعیت اسکرول
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => router.back()}
      style={{ bottom:100 }} // 100 پیکسل فاصله از بالای صفحه
      className="fixed right-4 bg-[#7f1d1d] text-white p-3 rounded-lg shadow-md focus:outline-none z-50 transition-transform"
      aria-label="Go back"
    >
      Back
    </button>
  );
};

export default BackButton;
