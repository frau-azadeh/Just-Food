import React from "react";
import MenuCard from "./MenuCard";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type MenuGridProps = {
  categories: Category[];
};

const MenuGrid: React.FC<MenuGridProps> = ({ categories }) => {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <MenuCard key={category.idCategory} category={category} />
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
