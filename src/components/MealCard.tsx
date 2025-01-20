import React from "react";
import Link from "next/link";
import Image from "next/image"; // ایمپورت Image از next/image

type MealProps = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const MealCard: React.FC<MealProps> = ({ idMeal, strMeal, strMealThumb }) => {
  return (
    <Link href={`/meal/${idMeal}`}>
      <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
        <div className="relative w-full h-40">
          <Image
            src={strMealThumb}
            alt={strMeal}
            layout="fill" // تصویر به اندازه ظرف پر می‌شود
            objectFit="cover" // حفظ تناسب تصویر
            className="rounded-t-lg"
          />
        </div>
        <h2 className="text-lg font-semibold mt-2 text-[#450a0a]">{strMeal}</h2>
      </div>
    </Link>
  );
};

export default MealCard;
