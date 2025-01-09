import React from "react";
import PropTypes from "prop-types";

// Styles
import "../styles/Table.css";

/**
 * Table component to display project data with pagination support.
 * It handles rendering of table and no data state.
 */
const Table = ({ projects = [], projectsPerPage = 5 }) => {
  if (projects.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data-card">
          <p>No Data Available</p>
        </div>
      </div>
    );
  }

  const displayProjects = projects.slice(0, projectsPerPage);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {displayProjects.map((project) => (
            <tr key={project["s.no"]}>
              <td>{project["s.no"]}</td>
              <td>{project["percentage.funded"] ?? "N/A"}</td>
              <td>{project["amt.pledged"] ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  projects: PropTypes.array,
  projectsPerPage: PropTypes.number,
};

export default Table;
