import React from 'react';
import {HeroSection} from './home/componentes/HeroBanner';
import {Featured} from './home/componentes/Featured';
import {GiftCategories} from './home/componentes/GiftCategories';
import {Testimonials} from './home/componentes/Testimonials';


export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <Featured />
      <GiftCategories />
      <Testimonials />
      {/* <HeroBanner /> */}
      {/* <CompanyIntro /> */}
      {/* <FeaturedProducts /> */}
    </>
  );
}