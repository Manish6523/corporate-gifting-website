import { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = document.querySelector("#hero")?.offsetHeight || 0;
      setIsScrolled(window.scrollY > heroSectionHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`bg-transparent  text-white py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? "shadow-md text-[#FF6900] bg-white" : ""
      }`}
    >
      {/* <h1 className="text-3xl font-bold text-[#E0AA3E]">Legecy Gifts</h1> */}
      <img src={`${isScrolled ? "./Images/golden-logo.png" : "./Images/white-logo.png"}`} alt="Logo" className="w-28 sm:w-32" />
      <ul className={`flex gap-6 ${isScrolled ? "text-[#FF6900]" : "text-white"}  font-semibold`}>
        <li className={`${isScrolled ? "hover:underline underline-offset-2" : "hover:text-[#FF6900]"}  cursor-pointer`}>Home</li>
        <li className={`${isScrolled ? "hover:underline underline-offset-2" : "hover:text-[#FF6900]"}  cursor-pointer`}>Products</li>
        <li className={`${isScrolled ? "hover:underline underline-offset-2" : "hover:text-[#FF6900]"}  cursor-pointer`}>About</li>
        <li className={`${isScrolled ? "hover:underline underline-offset-2" : "hover:text-[#FF6900]"}  cursor-pointer`}>Contact</li>
      </ul>
    </nav>
  );
}
