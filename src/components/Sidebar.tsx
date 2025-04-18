'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // استفاده از Image به جای img

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

interface SidebarProps {
  randomMeals: Meal[]; // حذف sameCategoryMeals و currentCategory اگر استفاده نمی‌شوند
}

const Sidebar: React.FC<SidebarProps> = ({ randomMeals }) => {
  return (
    <div className="space-y-6 lg:col-span-1 lg:sticky lg:top-4">
      <MealList title="Explore Other Categories" meals={randomMeals} />
    </div>
  );
};

const MealList: React.FC<{ title: string; meals: Meal[] }> = ({ title, meals }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">
      {meals.map((meal) => (
        <Link
          key={meal.idMeal}
          href={`/meal/${meal.idMeal}`}
          className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-md transition"
        >
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={64} // عرض تصویر
            height={64} // ارتفاع تصویر
            className="w-16 h-16 object-cover rounded-md"
          />
          <p className="text-[#7f1d1d] font-medium">{meal.strMeal}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default Sidebar;
