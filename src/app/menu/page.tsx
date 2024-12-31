'use client';

import React, { useState } from "react";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import Filter from "@/components/Filter";
import CategoryCard from "@/components/CategoryCard";
import BackButton from "@/components/BackButton";

const MenuPage: React.FC = () => {
  const { categories, loading, error } = useFetchCategories();
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleFilterChange = (selectedCategory: string) => {
    const updatedCategories = filteredCategories.includes(selectedCategory)
      ? filteredCategories.filter((cat) => cat !== selectedCategory)
      : [...filteredCategories, selectedCategory];

    setFilteredCategories(updatedCategories);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const filteredData = filteredCategories.length
    ? categories.filter((cat) => filteredCategories.includes(cat.strCategory))
    : categories;

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6 p-4 lg:flex-row">
      {/* لیست محصولات */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-2xl font-bold mb-6">دسته بندی غذاها</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((category) => (
            <CategoryCard key={category.strCategory} category={category} />
          ))}
        </div>
      </div>
       {/* ستون فیلتر */}
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
