"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";

interface Meal {
  idMeal: string;
  strMeal: string;
}

const MealNavigation: React.FC = () => {
  const { idMeal } = useParams();
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealResponse = await api.get(`/lookup.php?i=${idMeal}`);
        const meal = mealResponse.data.meals[0];

        const categoryResponse = await api.get(
          `/filter.php?c=${meal.strCategory}`,
        );
        const mealList = categoryResponse.data.meals;

        setMeals(mealList);

        const index = mealList.findIndex((m: Meal) => m.idMeal === idMeal);
        setCurrentIndex(index);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [idMeal]);

  const handleNavigation = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < meals.length) {
      router.push(`/meal/${meals[newIndex].idMeal}`);
    }
  };

  if (meals.length === 0 || currentIndex === -1) {
    return <p className="text-center py-4">Loading navigation...</p>;
  }

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={() => handleNavigation("prev")}
        disabled={currentIndex === 0}
        className={`px-4 py-2 rounded-lg bg-[#7f1d1d] text-white font-medium transition ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>
      <span className="text-gray-600 font-medium">
        {currentIndex + 1} of {meals.length}
      </span>
      <button
        onClick={() => handleNavigation("next")}
        disabled={currentIndex === meals.length - 1}
        className={`px-4 py-2 rounded-lg bg-[#7f1d1d] text-white font-medium transition ${
          currentIndex === meals.length - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default MealNavigation;
