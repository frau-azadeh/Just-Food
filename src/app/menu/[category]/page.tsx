'use client';

import React from "react";
import { useParams } from "next/navigation";
import { useFetchMeals } from "../../../hooks/useFetchMeals";
import Link from "next/link";

const MealsPage: React.FC = () => {
  const { category } = useParams(); // دریافت نام دسته از URL
  const categoryString = Array.isArray(category) ? category[0] : category; // تبدیل به string

  const { meals, loading, error } = useFetchMeals(categoryString);

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meals in {categoryString}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal}>
            <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition bg-white cursor-pointer">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-t-lg w-full h-40 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{meal.strMeal}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
