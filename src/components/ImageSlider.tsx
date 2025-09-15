"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // ایمپورت Image از next/image
import api from "@/utils/api";

const ImageSlider = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/categories.php");
        const fetchedImages = response.data.categories.map(
          (category: { strCategoryThumb: string }) => category.strCategoryThumb,
        );
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index}`}
            layout="fill" // تصویر را به اندازه ظرف پر می‌کند
            objectFit="contain" // تصویر را به صورت contain نمایش می‌دهد
            priority={index === currentIndex} // تصویر جاری با اولویت بارگذاری می‌شود
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
