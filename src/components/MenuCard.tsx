import React from "react";
import Image from "next/image"; // ایمپورت Image از next/image

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
      <div className="relative w-full h-32">
        <Image
          src={category.strCategoryThumb}
          alt={category.strCategory}
          layout="fill" // تصویر به اندازه ظرف پر می‌شود
          objectFit="cover" // برای حفظ تناسب تصویر
          className="rounded-t-lg"
        />
      </div>
      <h2 className="text-xl font-semibold mt-2 text-[#450a0a]">{category.strCategory}</h2>
      <p className="text-sm text-gray-600 mt-1">
        {category.strCategoryDescription.slice(0, 80)}...
      </p>
    </div>
  );
};

export default MenuCard;
