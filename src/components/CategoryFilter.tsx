import React, { useState } from "react";

type FilterProps = {
  categories: string[];
  onFilterChange: (selectedCategories: string[]) => void;
};

const CategoryFilter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">دسته بندی</h2>
      {categories.map((category) => (
        <div key={category} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category)}
            className="form-checkbox w-5 h-5 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor={category} className="text-gray-700">
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
