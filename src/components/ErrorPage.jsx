import React from "react";
import PropTypes from "prop-types";

// Styles
import "../styles/ErrorPage.css";

/**
 * ErrorPage Component
 * This component renders an error message passed through props.
 * It is designed to display when something goes wrong in the application.
 */
const ErrorPage = ({ errorMessage }) => {
  return (
    <div className="error-page">
      <div className="error-message">
        <h1>Oops! Something went wrong.</h1>
        <p>{errorMessage || "An unexpected error occurred."}</p>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorPage;
