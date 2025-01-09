import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../components/Loader"; // Adjust the path as needed

describe("Loader Component", () => {
  test("should render the loader overlay and circle", () => {
    render(<Loader />);

    // Check if the loader overlay is present
    const loaderOverlay = screen.getByTestId("loader-overlay");
    expect(loaderOverlay).toBeInTheDocument();

    // Check if the loader circle is present
    const loaderCircle = screen.getByTestId("loader-circle");
    expect(loaderCircle).toBeInTheDocument();
  });
});
