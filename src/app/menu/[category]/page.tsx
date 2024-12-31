'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchMeals } from "../../../hooks/useFetchMeals";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Pagination from "@/components/Pagination"; // کامپوننت جدید را ایمپورت کنید

const MealsPage: React.FC = () => {
  const { category } = useParams(); // دریافت نام دسته از URL
  const categoryString = Array.isArray(category) ? category[0] : category; // تبدیل به string

  const { meals, loading, error } = useFetchMeals(categoryString);

  // State برای مدیریت صفحه فعلی و تعداد آیتم‌ها در هر صفحه
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // تعداد آیتم‌ها در هر صفحه

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // محاسبه‌ی داده‌های صفحه فعلی
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);

  // تعداد کل صفحات
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  return (
    <>
      <CategoriesCarousel />
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#450a0a]">Meals in {categoryString}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentMeals.map((meal) => (
            <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal}>
              <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition bg-white cursor-pointer">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="rounded-t-lg w-full h-40 object-cover"
                />
                <h2 className="text-lg font-semibold mt-2 text-[#450a0a]">{meal.strMeal}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* کامپوننت Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <BackButton />
      </div>
    </>
  );
};

export default MealsPage;
