'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useFetchMealDetails } from "../../../hooks/useFetchMealDetails";
import api from "../../../utils/api";
import Link from "next/link";

const MealDetailsPage: React.FC = () => {
  const { idMeal } = useParams();
  const mealId = Array.isArray(idMeal) ? idMeal[0] : idMeal;

  const { meal, loading, error } = useFetchMealDetails(mealId);

  const [sameCategoryMeals, setSameCategoryMeals] = useState<any[]>([]);
  const [randomMeals, setRandomMeals] = useState<any[]>([]);

  useEffect(() => {
    if (meal && meal.strCategory) {
      const fetchSameCategoryMeals = async () => {
        try {
          const response = await api.get(`/filter.php?c=${meal.strCategory}`);
          setSameCategoryMeals(response.data.meals.slice(0, 3));
        } catch (err) {
          console.error("Error fetching same category meals:", err);
        }
      };

      const fetchRandomMeals = async () => {
        try {
          const response = await api.get(`/categories.php`);
          const categories = response.data.categories.map(
            (category: { strCategory: string }) => category.strCategory
          );

          const randomCategories = categories
            .filter((category: string) => category !== meal.strCategory)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

          const randomMealsPromises = randomCategories.map((category: string) =>
            api.get(`/filter.php?c=${category}`)
          );

          const randomMealsResponses = await Promise.all(randomMealsPromises);

          const randomMealsData = randomMealsResponses.map(
            (res) => res.data.meals[0]
          );

          setRandomMeals(randomMealsData);
        } catch (err) {
          console.error("Error fetching random meals:", err);
        }
      };

      fetchSameCategoryMeals();
      fetchRandomMeals();
    }
  }, [meal]);

  if (loading) return <p>Loading meal details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!meal) return <p>No meal found</p>;

  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key) => meal[key]);

  const instructions = meal.strInstructions.split(". ");

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* تصویر بزرگ */}
      <div className="w-full mb-8">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-auto rounded-lg shadow-lg"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
      </div>

      {/* جزئیات اصلی */}
      <h1 className="text-4xl font-bold mb-6 text-center">{meal.strMeal}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen">
  {/* جزئیات غذا */}
  <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="border rounded-lg p-4 shadow-lg text-center bg-white">
        <h2 className="text-xl font-semibold mb-2">Category</h2>
        <p className="font-medium">{meal.strCategory}</p>
      </div>
      <div className="border rounded-lg p-4 shadow-lg text-center bg-white">
        <h2 className="text-xl font-semibold mb-2">Cuisine</h2>
        <p className="font-medium">{meal.strArea}</p>
      </div>
    </div>
    <h2 className="text-2xl font-semibold mb-4 text-center">Ingredients</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="bg-gray-100 text-center p-2 rounded-lg shadow"
        >
          {ingredient}
        </div>
      ))}
    </div>
    <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Instructions</h2>
    <ol className="list-decimal list-inside text-gray-700 space-y-2">
      {instructions.map((step, index) => (
        <li key={index} className="leading-relaxed">
          {step}.
        </li>
      ))}
    </ol>
  </div>

  {/* ستون سمت چپ */}
  <div className=" space-y-6 lg:col-span-1 order-last  lg:sticky lg:top-4 lg:self-start lg:order-first">
    {/* آخرین 3 دستور غذا از همان دسته */}
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Latest in {meal.strCategory}</h2>
      <div className="space-y-4">
        {sameCategoryMeals.map((sameMeal) => (
          <Link
            key={sameMeal.idMeal}
            href={`/meal/${sameMeal.idMeal}`}
            className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-md transition"
          >
            <img
              src={sameMeal.strMealThumb}
              alt={sameMeal.strMeal}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p className="text-gray-700 font-medium">{sameMeal.strMeal}</p>
          </Link>
        ))}
      </div>
    </div>

    {/* 3 غذای تصادفی از دسته‌های دیگر */}
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Explore Other Categories</h2>
      <div className="space-y-4">
        {randomMeals.map((randomMeal) => (
          <Link
            key={randomMeal.idMeal}
            href={`/meal/${randomMeal.idMeal}`}
            className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-md transition"
          >
            <img
              src={randomMeal.strMealThumb}
              alt={randomMeal.strMeal}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p className="text-gray-700 font-medium">{randomMeal.strMeal}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default MealDetailsPage;
