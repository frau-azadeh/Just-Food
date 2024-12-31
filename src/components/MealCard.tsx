import React from "react";
import Link from "next/link";

type MealProps = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const MealCard: React.FC<MealProps> = ({ idMeal, strMeal, strMealThumb }) => {
  return (
    <Link href={`/meal/${idMeal}`}>
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="rounded-t-lg w-full h-40 object-cover"
        />
        <h2 className="text-lg font-semibold mt-2 text-[#450a0a]">{strMeal}</h2>
      </div>
    </Link>
  );
};

export default MealCard;
