import { useState, useEffect } from "react";
import api from "../utils/api";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export const useFetchMeals = (category: string | undefined) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await api.get(`/filter.php?c=${category}`);
        setMeals(response.data.meals);
      } catch (err) {
        setError("Failed to fetch meals");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchMeals();
  }, [category]);

  return { meals, loading, error };
};
