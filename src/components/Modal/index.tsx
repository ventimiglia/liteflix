"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Menu from "../Menu";
import Link from "next/link";
import { uploadMovie } from "../Form/services";
import { useRouter } from "next/navigation";

const enum FileUploadStatus {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  FINISH = "FINISH",
  SENDING = "SENDING",
}

const Modal = ({ children }: { children: ReactNode }) => {

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(FileUploadStatus.IDLE);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(image !== null && title.trim() !== "");
  }, [image, title]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setUploadStatus(FileUploadStatus.UPLOADING);

    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => prevProgress + 1);
    }, 20);

    setTimeout(() => {
      clearInterval(progressInterval);

      if (!file?.type.startsWith("image/")) {
        setUploadStatus(FileUploadStatus.ERROR);
      } else {
        setImage(file);
        setUploadStatus(FileUploadStatus.SUCCESS);
        setIsFormValid(image !== null && title.trim() !== "");
      }
      setUploadProgress(100);
    }, 2000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsFormValid(image !== null && e.target.value.trim() !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!image && title.trim() !== "") {
      setUploadStatus(FileUploadStatus.SENDING);
      const response = await uploadMovie({ image, title });
      if (!!response) {
        setUploadStatus(FileUploadStatus.FINISH);
      } else {
        setUploadStatus(FileUploadStatus.ERROR);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setImage(null);
    setTitle("");
    setUploadProgress(0);
    setUploadStatus(FileUploadStatus.IDLE);
    setIsFormValid(false);
    router.refresh();
  };

  const retry = () => {
    setUploadStatus(FileUploadStatus.IDLE);
    setUploadProgress(0);
    setIsFormValid(false);
    setImage(null);
  };

  return (
    <>
      <button
        className="flex items-center gap-3 transition-transform hover:scale-105 focus:scale-105"
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      {showModal && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-gray-900/70 focus:outline-none">
          <div className="relative w-full xl:min-w-[700px] mx-auto max-w-3xl h-full xl:h-fit">
            <div className="p-6 xl:px-16 xl:py-12 shadow-lg relative flex flex-col w-full bg-secondary outline-none h-full xl:h-fit focus:outline-none">
              <Link href="/">
                <button
                  className="hidden xl:flex absolute top-4 right-4 focus:outline-none transition-transform hover:scale-150"
                  onClick={handleClose}
                >
                  <Image
                    src="/plus.svg"
                    alt="Cerrar"
                    width={24}
                    height={24}
                    className="rotate-45"
                  />
                </button>
              </Link>
              <header className="flex justify-between xl:hidden">
                <Menu>
                  <Image
                    src="/menu.svg"
                    alt="Menu"
                    width={26}
                    height={26}
                    className="scale-x-[-1] w-auto h-auto"
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
                  <Image
                    src="/avatar.svg"
                    alt="Profile"
                    width={36}
                    height={36}
                  />
                </button>
              </header>
              {uploadStatus === FileUploadStatus.SENDING && <p>Loading...</p>}
              {uploadStatus === FileUploadStatus.FINISH ? (
                <section className="flex flex-col h-full w-full justify-center items-center text-center">
                  <h3 className="text-2xl mb-8 font-bold">¡FELICITACIONES!</h3>
                  <p className="text-xl mb-32">
                    {`${title} FUE CORRECTAMENTE SUBIDA`}
                  </p>
                  <button
                    className="w-60 bg-white text-secondary text-lg py-4 transition hover:scale-105 hover:bg-white/80"
                    onClick={handleClose}
                  >
                    <Link href="/">IR A LA HOME</Link>
                  </button>
                </section>
              ) : (
                <>
                  <h3 className="text-2xl xl:text-xl text-center text-primary mb-[72px] mt-24 xl:mb-12 xl:mt-0">
                    AGREGAR PELICULA
                  </h3>
                  <form
                    className="flex flex-col items-center xl:gap-12"
                    onSubmit={handleSubmit}
                  >
                    {uploadStatus === FileUploadStatus.IDLE && (
                      <label
                        id="file"
                        className="flex items-center relative justify-center gap-4 w-full h-20 xl:h-24 border-2 border-dashed cursor-pointer mb-14 xl:mb-0 transition-colors hover:bg-white/5"
                      >
                        <Image
                          src="/clip.svg"
                          alt="Agregar imagen"
                          width={16}
                          height={16}
                        />
                        <p>
                          <b>AGREGÁ UN ARCHIVO </b>
                          <span className="hidden xl:inline">
                            O ARRASTRALO Y SOLTALO AQUÍ
                          </span>
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute w-full h-full cursor-pointer opacity-0"
                          name="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                    {uploadStatus === FileUploadStatus.UPLOADING && (
                      <div className="flex flex-col w-full gap-4 mb-14">
                        <p className="text-left text-sm">{`CARGANDO: ${uploadProgress}%`}</p>
                        <div className="w-full bg-gray-200">
                          <div
                            className="bg-primary h-2"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <button className="text-right">CANCELAR</button>
                      </div>
                    )}
                    {!!image && uploadStatus === FileUploadStatus.SUCCESS && (
                      <div className="flex flex-col w-full gap-4 mb-14">
                        <p className="text-left text-sm">100% CARGADO</p>
                        <div
                          className="bg-primary h-2"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <p className="text-right text-primary">¡LISTO!</p>
                      </div>
                    )}
                    {uploadStatus === FileUploadStatus.ERROR && (
                      <div className="flex flex-col w-full gap-4 mb-14">
                        <p className="text-left text-sm">
                          ¡ERROR! NO SE PUDO CARGAR LA PELICULA
                        </p>
                        <div
                          className="bg-red-600 h-2"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                        <button className="text-right" onClick={retry}>
                          REINTENTAR
                        </button>
                      </div>
                    )}
                    <input
                      name="title"
                      id="title"
                      placeholder="Título"
                      className="text-center bg-transparent border-b-2 w-60 mb-24 xl:mb-auto focus:outline-none"
                      onChange={handleTitleChange}
                    />
                    <button
                      type="submit"
                      className={`w-60 mb-6 bg-white text-secondary text-lg py-4 ${
                        isFormValid
                          ? "transition hover:scale-105 hover:bg-white/80"
                          : "opacity-30 cursor-not-allowed"
                      }`}
                      disabled={!isFormValid}
                    >
                      SUBIR PELICULA
                    </button>
                    <button
                      className="xl:hidden text-lg w-60 border border-white/50 bg-transparent px-2 justify-center h-14 transition hover:scale-105 hover:bg-gray-800/75 active:bg-gray-900/75 focus:outline-none focus:ring focus:ring-gray-500"
                      onClick={handleClose}
                    >
                      SALIR
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
