

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Link } from "react-router";
import Buttons from "../../Buttons";


export const HeroSection = () => {
  return (
    <section className="relative bg-black text-white flex items-center justify-center px-4 overflow-hidden min-h-screen" id='hero'>
      
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/5XtzvTm1/nina-mercado-Cnr-Du-Y0t-Frg-unsplash.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold  flex flex-col gap-1"
        >
         <span className="text-white">
           Elevate Your 
        </span>
        <span className="text-primary">
          Corporate Relationships
        </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-xl text-gray-300"
        >
          Strengthen business relationships with premium corporate gifts. We make gifting effortless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          {/* <Link to={"/product"} className="bg-primary cursor-pointer text-white px-6 py-2 rounded-md font-semibold hover:bg-primary/80 transition flex items-center">
            Browse Gifts <ArrowRight className="ml-2 h-4 w-4" />
          </Link> */}

         <Buttons text={" Browse Gifts"} view={"block"}/>
          
          {/* <Link to={"/contact"} className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-primary font-semibold transition flex items-center">
            <HeartHandshake className="mr-2 h-4 w-4" /> Contact Now
          </Link> */}
          <Link className="relative text-white font-bold py-2 px-6 border-2 border-white  overflow-hidden group rounded-lg">
              <span className="relative z-10 group-hover:text-primary  flex items-center">
                <HeartHandshake className="mr-2 h-4 w-4" /> Contact Now 
              </span>
              <span className="absolute inset-0 bg-white scale-x-0   group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
        </motion.div>
{/*  
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12"
        >
          <Mockup image="../Images/caley-dimmock-_HCpwe1-Prc-unsplash.jpg" />
        </motion.div> */}
      </div>
    </section>
  );
};