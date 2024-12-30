'use client';

import React from "react";
import { useParams } from "next/navigation";
import { useFetchMealDetails } from "../../../hooks/useFetchMealDetails";

const MealDetailsPage: React.FC = () => {
  const { idMeal } = useParams();
  const mealId = Array.isArray(idMeal) ? idMeal[0] : idMeal;

  const { meal, loading, error } = useFetchMealDetails(mealId);

  if (loading) return <p>Loading meal details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!meal) return <p>No meal found</p>;

  // استخراج مواد اولیه
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key) => meal[key]);

  // دستور پخت به مراحل تقسیم شود
  const instructions = meal.strInstructions.split('. ');

  return (
    <div className="p-6 max-w-screen-xl mx-auto animate-fade-in">
      {/* تصویر بزرگ در بالای صفحه */}
      <div className="w-full mb-8">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-auto rounded-lg shadow-lg"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
      </div>

      {/* عنوان */}
      <h1 className="text-4xl font-bold mb-8 text-center">{meal.strMeal}</h1>

      {/* دسته‌بندی و منطقه */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4 shadow-lg bg-gradient-to-r text-center bg-white">
          <h2 className="text-xl font-semibold mb-2">Category</h2>
          <p className=" font-medium">{meal.strCategory}</p>
        </div>
        <div className="border rounded-lg p-4 shadow-lg bg-gradient-to-r text-center bg-white">
          <h2 className="text-xl font-semibold mb-2">Cuisine</h2>
          <p className=" font-medium">{meal.strArea}</p>
        </div>
      </div>

      {/* مواد اولیه و دستور پخت */}
      <div className="grid grid-cols-1 gap-6">
        {/* مواد اولیه */}
        <div className="border rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Ingredients</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded-lg shadow-md hover:shadow-lg transition bg-gray-50 hover:bg-gray-100"
              >
                <div className="w-6 h-6 bg-[#f87171] text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{ingredient}</p>
              </div>
            ))}
          </div>
        </div>

        {/* دستور پخت */}
        <div className="border rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {instructions.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {step}.
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MealDetailsPage;
