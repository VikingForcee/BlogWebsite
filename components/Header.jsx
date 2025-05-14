import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-black-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            {/* <span className="cursor-pointer font-bold text-4xl text-white">The Quiet Web</span> */}
            <span className="cursor-pointer text-4xl md:text-5xl text-[#ECE7E1] tracking-wide">The Quiet Web</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}><span className="md:float-right text-l mt-4 align-middletext-[#ECE7E1] ml-5 cursor-pointer">{category.name}</span></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
