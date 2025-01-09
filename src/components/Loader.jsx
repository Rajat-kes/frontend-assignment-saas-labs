import React from "react";

// Styles
import "../styles/Loader.css";

/**
 * Loader Component
 * This component renders a full-screen overlay with a circle loader in the center.
 * It is used to indicate loading state in the application.
 */
const Loader = () => {
  return (
    <div className="loader-overlay" data-testid="loader-overlay">
      <div className="loader-circle" data-testid="loader-circle"></div>
    </div>
  );
};

export default Loader;
