'use client';

import React from "react";
import Link from "next/link";

type CategoryCardProps = {
  category: {
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  };
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/menu/${category.strCategory}`}
      className="border rounded-lg shadow-md p-4 hover:shadow-lg transition bg-white"
    >
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold">{category.strCategory}</h2>
      <p className="text-gray-500">
        {category.strCategoryDescription.slice(0, 80)}...
      </p>
    </Link>
  );
};

export default CategoryCard;
