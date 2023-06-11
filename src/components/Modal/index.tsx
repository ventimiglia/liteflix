"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Menu from "../Menu";
import { uploadMovie } from "@/services/movies/client";
import Wizard, { WizardStep } from "../Wizard";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(WizardStep.INITIAL);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(image !== null && title.trim() !== "");
  }, [image, title]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setStep(WizardStep.UPLOADINGFILE);

    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => prevProgress + 1);
    }, 20);

    setTimeout(() => {
      clearInterval(progressInterval);

      if (!file?.type.startsWith("image/")) {
        setStep(WizardStep.UPLOADFILEERROR);
      } else {
        setImage(file);
        setStep(WizardStep.UPLOADFILESUCCESS);
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
      setStep(WizardStep.LOADING);
      const response = await uploadMovie({ image, title });
      if (!!response) {
        setStep(WizardStep.SUBMITED);
      } else {
        setStep(WizardStep.UPLOADFILEERROR);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setImage(null);
    setTitle("");
    setUploadProgress(0);
    setStep(WizardStep.INITIAL);
    setIsFormValid(false);
    router.refresh();
  };

  const retry = () => {
    setStep(WizardStep.INITIAL);
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
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-gray-900/70 focus:outline-none"
          >
            <motion.div
              initial={{ zIndex: -1 }}
              animate={{ zIndex: 100 }}
              exit={{ zIndex: -1 }}
              className="relative w-full lg:min-w-[700px] mx-auto max-w-3xl h-full lg:h-fit"
            >
              <div className="p-6 lg:px-16 lg:py-12 shadow-lg relative flex flex-col w-full bg-secondary outline-none h-full lg:h-fit focus:outline-none">
                <Link href="/">
                  <button
                    className="hidden lg:flex absolute top-4 right-4 focus:outline-none transition-transform hover:scale-150"
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
                <header className="flex justify-between lg:hidden">
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
                <Wizard
                  step={step}
                  title={title}
                  handleImageChange={handleImageChange}
                  handleTitleChange={handleTitleChange}
                  handleSubmit={handleSubmit}
                  handleClose={handleClose}
                  retry={retry}
                  uploadProgress={uploadProgress}
                  isFormValid={isFormValid}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
