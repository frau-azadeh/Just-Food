'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/utils/api';

// تعریف تایپ برای داده‌ها
interface Category {
  strCategory: string;
  strCategoryThumb: string;
  [key: string]: any;
}

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories.php');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  if (!categories || categories.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="py-8 overflow-hidden">
      <div className="overflow-hidden relative">
        <div className="flex animate-scroll gap-4">
          {categories.concat(categories).map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[50%] md:w-[33.333%] lg:w-[20%] p-4 text-center bg-white rounded-lg shadow-md"
            >
              <Link href={`/menu/${category.strCategory}`}>
                <Image
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  width={300} // تنظیم عرض
                  height={128} // تنظیم ارتفاع
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-[#7f1d1d] font-medium">{category.strCategory}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
