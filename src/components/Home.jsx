import React from 'react';
import {HeroSection} from './home/componentes/HeroBanner';
import {Featured} from './home/componentes/Featured';
import {GiftCategories} from './home/componentes/GiftCategories';
import {Testimonials} from './home/componentes/Testimonials';
import { HowItWorks } from './home/HowItWorks';
import { ClientsSlider } from './home/componentes/OurClients';
import { PopularProducts } from './home/componentes/PopularProducts';
import { StatsSection } from './home/componentes/StatsSection';


export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <HowItWorks />
      <GiftCategories />
      <Featured />
      <PopularProducts/>
      <ClientsSlider/>
      <Testimonials />
      <StatsSection/>
      {/* <HeroBanner /> */}
      {/* <CompanyIntro /> */}
      {/* <FeaturedProducts /> */}
    </>
  );
}