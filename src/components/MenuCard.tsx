import React from "react";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type MenuCardProps = {
  category: Category;
};

const MenuCard: React.FC<MenuCardProps> = ({ category }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition bg-white">
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="rounded-t-lg w-full h-32 object-cover"
      />
      <h2 className="text-xl font-semibold mt-2">{category.strCategory}</h2>
      <p className="text-sm text-gray-600 mt-1">
        {category.strCategoryDescription.slice(0, 80)}...
      </p>
    </div>
  );
};

export default MenuCard;
