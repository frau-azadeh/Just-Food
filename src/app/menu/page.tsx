'use client';

import React, { useState, useEffect } from "react";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import Filter from "@/components/Filter";
import CategoryCard from "@/components/CategoryCard";
import api from "@/utils/api"; // مسیر درست فایل را جایگزین کنید
import BackButton from "@/components/BackButton";

const MenuPage: React.FC = () => {
  const { categories, loading, error } = useFetchCategories();
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleFilterChange = (category: string) => {
    const updatedCategories = filteredCategories.includes(category)
      ? filteredCategories.filter((cat) => cat !== category)
      : [...filteredCategories, category];

    setFilteredCategories(updatedCategories);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const filteredData = filteredCategories.length
    ? categories.filter((cat) => filteredCategories.includes(cat.strCategory))
    : categories;

  useEffect(() => {
    // این بخش مربوط به دریافت داده‌های مربوط به فیلتر و دسته‌بندی‌ها بود.
    // اگر دیگر نیازی به ستون سمت راست (سایدبار) ندارید، می‌توانید این بخش را حذف کنید.
  }, [filteredCategories]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* ستون فیلتر */}
      
      {/* لیست دسته‌بندی‌ها */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((category) => (
          <CategoryCard key={category.strCategory} category={category} />
        ))}
      </div>
      <Filter
        categories={categories.map((cat) => cat.strCategory)}
        filteredCategories={filteredCategories}
        handleFilterChange={handleFilterChange}
        showAll={showAll}
        toggleShowAll={toggleShowAll}
      />
      <BackButton/>
    </div>
  );
};

export default MenuPage;
