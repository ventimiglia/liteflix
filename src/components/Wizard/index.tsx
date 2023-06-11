"use client";

import Image from "next/image";
import Link from "next/link";

export const enum WizardStep {
  INITIAL = "INITIAL",
  UPLOADINGFILE = "UPLOADINGFILE",
  UPLOADFILEERROR = "UPLOADINGFILEERROR",
  UPLOADFILESUCCESS = "UPLOADINGFILESUCCESS",
  LOADING = "LOADING",
  SUBMITED = "SUBMITED",
}

type WizardProps = {
  step: WizardStep;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClose: () => void;
  retry: () => void;
  uploadProgress: number;
  isFormValid: boolean;
};

const Wizard = ({
  step,
  handleImageChange,
  title,
  handleTitleChange,
  handleSubmit,
  handleClose,
  retry,
  uploadProgress,
  isFormValid,
}: WizardProps) => {
  return (
    <>
      {step === WizardStep.SUBMITED ? (
        <Image
          src="./logo.svg"
          alt="logo"
          width={113}
          height={34}
          className="self-center"
        />
      ) : (
        <Title />
      )}
      <form
        className="flex flex-col items-center lg:gap-12"
        onSubmit={handleSubmit}
      >
        {step === WizardStep.INITIAL && (
          <InputFileIdle onChange={handleImageChange} />
        )}
        {step === WizardStep.UPLOADINGFILE && (
          <UploadingFile uploadProgress={uploadProgress} />
        )}
        {step === WizardStep.UPLOADFILEERROR && (
          <UploadingFileError uploadProgress={uploadProgress} retry={retry} />
        )}
        {step === WizardStep.UPLOADFILESUCCESS && (
          <UploadingFileSuccess uploadProgress={uploadProgress} />
        )}
        {step === WizardStep.LOADING && <Loading />}
        {step === WizardStep.SUBMITED && <Submited title={title} />}

        {step !== WizardStep.LOADING && step !== WizardStep.SUBMITED && (
          <InputText onChange={handleTitleChange} />
        )}

        {step !== WizardStep.LOADING && (
          <Actions
            step={step}
            handleClose={handleClose}
            isFormValid={isFormValid}
          />
        )}
      </form>
    </>
  );
};

const InputFileIdle = ({
  onChange,
}: {
  onChange: WizardProps["handleImageChange"];
}) => (
  <label
    id="file"
    className="flex items-center relative justify-center gap-4 w-full h-20 lg:h-24 border-2 border-dashed cursor-pointer mb-14 lg:mb-0 transition-colors hover:bg-white/5"
  >
    <Image src="/clip.svg" alt="Agregar imagen" width={16} height={16} />
    <p>
      <b>AGREGÁ UN ARCHIVO </b>
      <span className="hidden lg:inline">O ARRASTRALO Y SOLTALO AQUÍ</span>
    </p>
    <input
      type="file"
      accept="image/*"
      className="absolute w-full h-full cursor-pointer opacity-0"
      name="file"
      onChange={onChange}
    />
  </label>
);

const UploadingFile = ({
  uploadProgress,
}: {
  uploadProgress: WizardProps["uploadProgress"];
}) => (
  <div className="flex flex-col w-full gap-4">
    <p className="text-left text-sm">{`CARGANDO: ${uploadProgress}%`}</p>
    <div className="w-full bg-gray-200">
      <div
        className="bg-primary h-2"
        style={{ width: `${uploadProgress}%` }}
      ></div>
    </div>
    <button className="text-right">CANCELAR</button>
  </div>
);

const UploadingFileError = ({
  uploadProgress,
  retry,
}: {
  uploadProgress: WizardProps["uploadProgress"];
  retry: WizardProps["retry"];
}) => (
  <div className="flex flex-col w-full gap-4">
    <p className="text-left text-sm">¡ERROR! NO SE PUDO CARGAR LA PELICULA</p>
    <div
      className="bg-red-600 h-2"
      style={{ width: `${uploadProgress}%` }}
    ></div>
    <button className="text-right" onClick={retry}>
      REINTENTAR
    </button>
  </div>
);

const UploadingFileSuccess = ({
  uploadProgress,
}: {
  uploadProgress: WizardProps["uploadProgress"];
}) => (
  <div className="flex flex-col w-full gap-4">
    <p className="text-left text-sm">100% CARGADO</p>
    <div
      className="bg-primary h-2"
      style={{ width: `${uploadProgress}%` }}
    ></div>
    <p className="text-right text-primary">¡LISTO!</p>
  </div>
);

const Submited = ({ title }: { title: WizardProps["title"] }) => (
  <section className="flex flex-col h-full w-full justify-center items-center text-center mt-12">
    <h3 className="text-2xl mb-6 font-bold">¡FELICITACIONES!</h3>
    <p className="text-xl">{`${title} FUE CORRECTAMENTE SUBIDA`}</p>
  </section>
);

const Actions = ({
  step,
  handleClose,
  isFormValid,
}: {
  step: WizardProps["step"];
  handleClose: WizardProps["handleClose"];
  isFormValid: WizardProps["isFormValid"];
}) => (
  <>
    {step === WizardStep.SUBMITED ? (
      <button
        className="w-60 bg-white text-secondary text-lg py-4 transition hover:scale-105 hover:bg-white/80"
        onClick={handleClose}
      >
        <Link href="/">IR A HOME</Link>
      </button>
    ) : (
      <>
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
          className="lg:hidden text-lg w-60 border border-white/50 bg-transparent px-2 justify-center h-14 transition hover:scale-105 hover:bg-gray-800/75 active:bg-gray-900/75 focus:outline-none focus:ring focus:ring-gray-500"
          onClick={handleClose}
        >
          SALIR
        </button>
      </>
    )}
  </>
);

const Title = () => (
  <h3 className="text-2xl lg:text-xl text-center text-primary mb-[72px] mt-24 lg:mb-12 lg:mt-0">
    AGREGAR PELICULA
  </h3>
);

const InputText = ({
  onChange,
}: {
  onChange: WizardProps["handleTitleChange"];
}) => (
  <input
    name="title"
    id="title"
    placeholder="Título"
    className="text-center bg-transparent border-b-2 w-60 mb-24 lg:mb-auto focus:outline-none"
    onChange={onChange}
  />
);

const Loading = () => (
  <div role="status" className="flex flex-col justify-center items-center gap-4 mb-10">
    <p className="text-2xl">SUBIENDO...</p>
    <svg
      aria-hidden="true"
      className="w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Wizard;
