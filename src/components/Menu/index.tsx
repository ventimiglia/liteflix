"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Modal from "../Modal";

const Menu = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        className="flex items-center gap-3 transition-transform hover:scale-105 focus:scale-105"
        onClick={() => setShowMenu(true)}
      >
        {children}
      </button>
      {showMenu && (
        <div className="h-full overflow-y-hidden overflow-x-hidden xl:overflow-y-auto fixed inset-0 z-50 w-full outline-none bg-gray-900/70 focus:outline-none">
          <section className="xl:absolute xl:right-0 xl:w-[40%] h-full p-6 xl:py-6 xl:px-20 bg-secondary">
            <header className="flex justify-between">
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
              <Image
                src="/logo.svg"
                alt="Liteflix"
                width={98}
                height={28}
                className="w-auto h-auto"
              />
              <button>
                <Image src="/avatar.svg" alt="Profile" width={36} height={36} />
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
          </section>
        </div>
      )}
    </>
  );
};

export default Menu;
