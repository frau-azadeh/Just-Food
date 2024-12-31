import React from 'react';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ImageSlider from '@/components/ImageSlider';

const Page: React.FC = () => {
  return (
    <div>
      <ImageSlider/>
      <CategoriesCarousel />
    </div>
  );
};

export default Page;
