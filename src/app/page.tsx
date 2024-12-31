import React from 'react';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ImageSlider from '@/components/ImageSlider';
import RandomMeals from '@/components/RandomMeals';

const Page: React.FC = () => {
  return (
    <div>
      <ImageSlider/>
      <CategoriesCarousel />
      <RandomMeals/>
    </div>
  );
};

export default Page;
