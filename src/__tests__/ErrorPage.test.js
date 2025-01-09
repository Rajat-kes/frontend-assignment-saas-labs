import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorPage from "../components/ErrorPage";

describe("ErrorPage Component", () => {
  test("should render the error page with the default error message", () => {
    render(<ErrorPage />);
    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument();
  });

  test("should render the custom error message when passed as a prop", () => {
    const customErrorMessage = "Failed to load data from server.";
    render(<ErrorPage errorMessage={customErrorMessage} />);
    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText(customErrorMessage)).toBeInTheDocument();
  });

  test("should render the error page with no message when errorMessage is empty", () => {
    render(<ErrorPage errorMessage="" />);
    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument();
  });
});
