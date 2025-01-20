'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackButton = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      setIsVisible(currentScrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <button
        onClick={() => router.back()}
        style={{ bottom: 100 }}
        className="fixed right-4 bg-[#7f1d1d] text-white p-3 rounded-lg shadow-md focus:outline-none z-50 transition-transform"
        aria-label="Go back"
      >
        Back
      </button>
    )
  );
};

export default BackButton;
