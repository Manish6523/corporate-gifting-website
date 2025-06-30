import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabase } from "../../utils/supabase";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { category } = useParams();

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", category);
        setResults(data);
        console.log("Category Data: ", data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [category]);

  return (
    <main className="container md:w-[70vw] mx-auto p-4 b-green-400 bg-white">
      <h1 className="text-3xl font-medium text-gray-800 mb-6 text-center">Category: 
        <span className=""> {category.split('-').join(" ")}</span>
        </h1>
  
      {results.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 ">
          {results.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      ) : (
        <div className="p-4">
          <h2 className="text-2xl font-semibold">
            No products found in this category.
          </h2>
          <p className="text-gray-600">
            Please check back later or explore other categories.
          </p>
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
