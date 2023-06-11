"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CATEGORY } from "@/app/(home)/MovieList";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: React.SetStateAction<CATEGORY>) => void;
};

const CustomDropdown = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (category: CATEGORY) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-10 w-full">
      <button
        type="button"
        className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-transparent text-sm font-medium text-white transition-colors hover:text-white/50"
        onClick={toggleDropdown}
      >
        <span>
          VER: <b>{selectedCategory}</b>
        </span>

        <Image
          src="/arrow.svg"
          alt="arrow"
          width={13}
          height={13}
          className="w-auto h-auto ml-2"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="origin-top-right absolute w-full right-0 mt-2 shadow-lg bg-secondary text-white before:content-[''] before:h-3 before:w-3 before:bg-secondary before:absolute before:-translate-y-1/2 before:right-[15%] before:rotate-45"
          >
            <div
              className="flex flex-col py-4 gap-4"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                className={`flex items-center justify-between px-4 text-sm transition-colors hover:text-white/80 w-full text-left ${
                  selectedCategory === CATEGORY.POPULAR ? "font-bold" : ""
                }`}
                onClick={() => handleOptionClick(CATEGORY.POPULAR)}
                role="menuitem"
              >
                {CATEGORY.POPULAR}
                {selectedCategory === CATEGORY.POPULAR && (
                  <Image src="/check.svg" alt="arrow" width={13} height={13} />
                )}
              </button>
              <button
                className={`flex items-center justify-between px-4 text-sm transition-colors hover:text-white/80 w-full text-left ${
                  selectedCategory === CATEGORY.MY_MOVIES ? "font-bold" : ""
                }`}
                onClick={() => handleOptionClick(CATEGORY.MY_MOVIES)}
                role="menuitem"
              >
                {CATEGORY.MY_MOVIES}
                {selectedCategory === CATEGORY.MY_MOVIES && (
                  <Image src="/check.svg" alt="arrow" width={13} height={13} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
