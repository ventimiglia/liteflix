"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CATEGORY } from "@/app/(home)/MovieList";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: React.SetStateAction<CATEGORY>) => void;
};

const CustomDropdown = ({
  selectedCategory,
  setSelectedCategory,
}: Props) => {
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
          className="ml-2"
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute w-full right-0 mt-2 shadow-lg bg-secondary text-white">
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
              POPULARES
              {selectedCategory === CATEGORY.POPULAR && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <button
              className={`flex items-center justify-between px-4 text-sm transition-colors hover:text-white/80 w-full text-left ${
                selectedCategory === CATEGORY.MY_MOVIES ? "font-bold" : ""
              }`}
              onClick={() => handleOptionClick(CATEGORY.MY_MOVIES)}
              role="menuitem"
            >
              MIS PELICULAS
              {selectedCategory === CATEGORY.MY_MOVIES && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
