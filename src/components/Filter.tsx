'use client';

import React, { useState } from "react";

type FilterProps = {
  categories: string[];
  filteredCategories: string[];
  handleFilterChange: (category: string) => void;
  showAll: boolean;
  toggleShowAll: () => void;
};

const Filter: React.FC<FilterProps> = ({
  categories,
  filteredCategories,
  handleFilterChange,
  showAll,
  toggleShowAll,
}) => {
  const displayedCategories = showAll ? categories : categories.slice(0, 3);

  return (
    <div className="w-full lg:w-1/4 bg-white border rounded-lg p-4 shadow-lg lg:sticky lg:top-4 lg:self-start lg:order-first lg:mb-0 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-center">دسته بندی</h2>
      {displayedCategories.map((category) => (
        <div
          key={category}
          className="flex items-center gap-2 mb-3 hover:bg-gray-100 p-2 rounded-md transition"
        >
          <input
            type="checkbox"
            id={category}
            checked={filteredCategories.includes(category)}
            onChange={() => handleFilterChange(category)}
            className="form-checkbox w-5 h-5 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor={category} className="text-gray-700">
            {category}
          </label>
        </div>
      ))}

      {categories.length > 3 && (
        <button
          onClick={toggleShowAll}
          className="mt-4 w-full text-blue-600 text-sm underline hover:text-blue-800"
        >
          {showAll ? "نمایش کمتر" : "نمایش بیشتر"}
        </button>
      )}
    </div>
  );
};

export default Filter;
