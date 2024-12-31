'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchMeals } from "../../../hooks/useFetchMeals";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Pagination from "@/components/Pagination"; 

const MealsPage: React.FC = () => {
  const { category } = useParams(); 
  const categoryString = Array.isArray(category) ? category[0] : category; 

  const { meals, loading, error } = useFetchMeals(categoryString);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);

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
