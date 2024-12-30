import { useState, useEffect } from "react";
import api from "../utils/api";

type MealDetails = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string | undefined;
};

export const useFetchMealDetails = (idMeal: string | undefined) => {
  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await api.get(`/lookup.php?i=${idMeal}`);
        setMeal(response.data.meals[0]);
      } catch (err) {
        setError("Failed to fetch meal details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (idMeal) fetchMealDetails();
  }, [idMeal]);

  return { meal, loading, error };
};
