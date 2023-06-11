"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Modal from "../Modal";
import { motion, AnimatePresence } from "framer-motion";

const Menu = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        className="flex items-center gap-3 transition-transform hover:scale-125 focus:scale-125"
        onClick={() => setShowMenu(true)}
      >
        {children}
      </button>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full overflow-y-hidden overflow-x-hidden lg:overflow-y-auto fixed inset-0 z-50 w-full outline-none bg-gray-900/70 focus:outline-none"
          >
            <motion.section
              key="menu"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              className="lg:absolute lg:right-0 lg:w-[40%] h-full p-6 lg:py-6 lg:px-20 bg-secondary"
            >
              <header className="flex justify-between w-full gap-10">
                <Menu>
                  <Image
                    src="/plus.svg"
                    alt="Menu"
                    width={26}
                    height={26}
                    className="rotate-45"
                    onClick={() => setShowMenu(false)}
                  />
                </Menu>
                <div className="flex flex-grow justify-center lg:justify-end">
                  <Image
                    src="/notification.svg"
                    alt="Notifications"
                    width={26}
                    height={26}
                    className="hidden lg:flex self-center w-auto h-auto"
                  />
                  <Image
                    src="/logo.svg"
                    alt="Liteflix"
                    width={98}
                    height={28}
                    className="w-auto h-auto self-center lg:hidden"
                  />
                </div>
                <button>
                  <Image
                    src="/avatar.svg"
                    alt="Profile"
                    width={36}
                    height={36}
                  />
                </button>
              </header>
              <nav className="py-16">
                <ul className="flex flex-col gap-10 text-left">
                  <li>
                    <a href="#">Inicio</a>
                  </li>
                  <li>
                    <a href="#">Series</a>
                  </li>
                  <li>
                    <a href="#">Películas</a>
                  </li>
                  <li>
                    <a href="#">Aregadas recientemente</a>
                  </li>
                  <li>
                    <a href="#">Populares</a>
                  </li>
                  <li>
                    <a href="#">Mis películas</a>
                  </li>
                  <li>
                    <a href="#">Mi lista</a>
                  </li>
                  <li className="my-6">
                    <Modal>
                      <Image
                        src="/plus.svg"
                        alt="Agregar película"
                        width={14}
                        height={14}
                        className="relative font-bold text-lg"
                      />
                      <b>AGREGAR PELÍCULA</b>
                    </Modal>
                  </li>
                  <li>
                    <a href="#">Cerrar sesión</a>
                  </li>
                </ul>
              </nav>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
