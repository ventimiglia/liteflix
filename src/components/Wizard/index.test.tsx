import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Wizard, { WizardStep } from "./";

describe("Wizard", () => {
  it("renders the initial step", () => {
    const { container, getByText, getByPlaceholderText, getByAltText } = render(
      <Wizard
        step={WizardStep.INITIAL}
        handleImageChange={jest.fn()}
        title=""
        handleTitleChange={jest.fn()}
        handleSubmit={jest.fn()}
        handleClose={jest.fn()}
        retry={jest.fn()}
        uploadProgress={0}
        isFormValid={false}
      />
    );

    expect(getByText("AGREGAR PELICULA")).toBeInTheDocument();
    expect(getByAltText("Agregar imagen")).toBeInTheDocument();
    expect(getByPlaceholderText("Título")).toBeInTheDocument();
    expect(getByText("SUBIR PELICULA")).toBeInTheDocument();
    expect(getByText("SALIR")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders the uploading file step", () => {
    const { getByText, container } = render(
      <Wizard
        step={WizardStep.UPLOADINGFILE}
        handleImageChange={jest.fn()}
        title=""
        handleTitleChange={jest.fn()}
        handleSubmit={jest.fn()}
        handleClose={jest.fn()}
        retry={jest.fn()}
        uploadProgress={50}
        isFormValid={false}
      />
    );

    expect(getByText("CARGANDO: 50%")).toBeInTheDocument();
    expect(getByText("CANCELAR")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders the submitted step", () => {
    const { getByText, container } = render(
      <Wizard
        step={WizardStep.SUBMITED}
        handleImageChange={jest.fn()}
        title="Test Movie"
        handleTitleChange={jest.fn()}
        handleSubmit={jest.fn()}
        handleClose={jest.fn()}
        retry={jest.fn()}
        uploadProgress={100}
        isFormValid={false}
      />
    );

    expect(getByText("¡FELICITACIONES!")).toBeInTheDocument();
    expect(
      getByText("Test Movie FUE CORRECTAMENTE SUBIDA")
    ).toBeInTheDocument();
    expect(getByText("IR A HOME")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("calls the appropriate event handlers", () => {
    const handleImageChange = jest.fn();
    const handleSubmit = jest.fn();
    const handleClose = jest.fn();
    const retry = jest.fn();

    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Wizard
        step={WizardStep.INITIAL}
        handleImageChange={handleImageChange}
        title=""
        handleTitleChange={jest.fn()}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        retry={retry}
        uploadProgress={0}
        isFormValid={true}
      />
    );

    const inputFile = getByPlaceholderText("Agrega un archivo");
    fireEvent.change(inputFile, {
      target: { files: [new File([], "test.png")] },
    });
    expect(handleImageChange).toHaveBeenCalledTimes(1);

    const submitButton = getByText("SUBIR PELICULA");
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);

    const closeButton = getByText("SALIR");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
