import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, HeartHandshake } from "lucide-react";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <section
        className="relative bg-black text-white py-55 px-4 overflow-hidden"
        id="hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/TBSXd7hQ/mia-golic-6-Jtu-Gv-Lzh20-unsplash-1.jpg"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold  flex flex-col gap-1"
          >
            <div className="text-primary">
              About <span className="text-primary">Us</span>
            </div>
            <p className="mt-4 text-lg md:text-2xl text-gray-300 font-light">
              At Legacy Gifts, we turn thoughtful ideas into memorable
              experiences. Our mission is to help businesses build stronger
              relationships through premium, customized gifting solutions that
              reflect care, appreciation, and professionalism.             
            </p>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-300"
          ></motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center gap-4 flex-wrap"
          ></motion.div>
        </div>
      </section>
      {/* about us */}
      <section className="px-4 md:px-10 lg:px-20 xl:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[1280px] flex flex-col items-center">
          {/* Hero Section */}
          <div className="flex flex-col items-start lg:flex-row w-full gap-10">
            {/* Text Block with Animation */}
            <motion.div
              className="flex flex-col justify-center items-center md:items-start h-auto lg:h-[500px] gap-5"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-black text-3xl md:text-4xl font-semibold">
                About Legacy Gifts
              </h1>
              <p className="text-gray-600 max-w-[640px] mx-auto lg:mx-0 text-base md:text-lg">
                Established in 2021, Legacy Gifts is India's trusted corporate
                gifting partner, delivering thoughtful, high-quality gifts that
                make a lasting impression. We specialize in premium, customized
                gifting solutions designed to strengthen professional
                relationships and reflect your brand’s values.
              </p>
              <p className="text-gray-600 max-w-[640px] mx-auto lg:mx-0 text-base md:text-lg">
                From festive celebrations to employee milestones, we curate
                gifts with care, style, and meaning. Our nationwide delivery,
                personalized service, and commitment to excellence make us the
                go-to choice for businesses that value genuine connections.
              </p>
            </motion.div>

            {/* Image Block with Animation */}
            <motion.div
              className="min-h-[300px] lg:min-h-[480px] w-full lg:w-[40vw] rounded-md bg-center bg-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('aboutus.jpeg')",
              }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* about section */}
      <section className="px-10 py-16 bg-gradient-to-bl from-[#fff7e0] to-[#f5d58c]/10">
        <div className=" py-10 px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-10">
            {/* Left Text */}
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-semibold  text-black mb-3">
                Gifting That Reflects Your Brand
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                At Legacy Gifts, we believe that a gift is more than just a
                gesture — it’s a reflection of your brand’s values. Our curated,
                luxurious gift solutions create lasting impressions and
                meaningful connections in every business interaction.
              </p>
            </div>

            {/* Right Stats */}
            <div className="md:w-1/2 flex justify-around w-full text-center flex-wrap">
              <div>
                <h3 className="text-[#996f04] text-3xl font-bold mb-2">1000+</h3>
                <p className="text-gray-700">Happy Clients</p>
              </div>
              <div>
                <h3 className="text-[#996f04] text-3xl font-bold mb-2">4.9</h3>
                <p className="text-gray-700">Average Rating</p>
              </div>
              <div>
                <h3 className="text-[#996f04] text-3xl font-bold mb-2">500+</h3>
                <p className="text-gray-700">Premium Products</p>
              </div>
              <div>
                <h3 className="text-[#996f04] text-3xl font-bold mb-2">100+</h3>
                <p className="text-gray-700">Corporate Partners</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* about Enquirey */}
      <section
        ref={sectionRef}
        className="px-4 md:px-10 lg:px-20 py-10 flex justify-center"
      >
        <div className="max-w-[1200px] flex flex-col lg:flex-row w-full items-center gap-10 lg:gap-20">
          {/* Image Left */}
          <motion.div
            className="flex-1 min-h-[300px] lg:min-h-[480px] w-full rounded-lg bg-cover bg-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              backgroundImage: "url('aboutus2.jpeg')",
            }}
          ></motion.div>

          {/* Text Right */}
          <motion.div
            className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-black text-3xl md:text-4xl font-semibold">
              About our products
            </h1>
            <p className="text-gray-600 max-w-[640px] text-base md:text-lg">
              We offer a wide range of high-end products that are both
              impressive and practical — each one carefully selected to reflect
              sophistication, gratitude, and professionalism. From elegant gift
              hampers and personalized accessories to branded essentials and
              festive collections, our offerings are designed to leave a lasting
              impression and strengthen meaningful business relationships.
            </p>

            {/* Enquire Now Button */}
            {/* <button className="relative font-bold  inline-block w-40 px-4 py-2 rounded text-sm text-white bg-[#996f04] border z-10 overflow-hidden 
              before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-[#825e03] 
              before:z-[-1] before:transition-all before:duration-300 hover:before:w-full hover:text-white">
            Enquiry Now
          </button>

          <div className="relative group">
            <button className="bg-[#bc8f14] hover:shadow-md text-white font-bold py-2 px-6 rounded-lg overflow-hidden relative z-10">
              <span className="relative z-20">Enquiry Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10" />
            </button>
          </div> */}

            <button className="relative text-[#bc8f14] font-bold py-2 px-6 border-2 border-[#bc8f14] overflow-hidden group rounded-lg">
              <span className="relative z-10 group-hover:text-white">
                Enquiry Now
              </span>
              <span className="absolute inset-0 bg-[#bc8f14] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
