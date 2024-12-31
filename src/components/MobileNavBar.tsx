'use client';

import React from "react";
import { FaPhone, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";

const MobileNavBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-full bg-[#7f1d1d] shadow-lg flex justify-around items-center py-2 z-50 lg:hidden">
      <a
        href="tel:+123456789"
        className="flex flex-col items-center text-white"
      >
        <FaPhone size={24} />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-white"
      >
        <FaInstagram size={24} />
      </a>

      <a
        href="https://t.m"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-white"
      >
        <SiTelegram size={24} />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-white"
      >
        <FaLinkedin size={24} />
      </a>
    </div>
  );
};

export default MobileNavBar;
