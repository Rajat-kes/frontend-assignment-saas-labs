import React, { useState, useEffect } from 'react';

// Components
import Table from './components/Table';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import ErrorPage from './components/ErrorPage';

// Styles
import './styles/App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectsPerPage = 5;

  // Fetching data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) return   <ErrorPage errorMessage={error} />;

  return (
    <div className="app">
      {loading && <Loader />}
      <h1>Projects</h1>
      <Table projects={currentProjects} projectsPerPage={projectsPerPage} />
      <Pagination
        projectsPerPage={projectsPerPage}
        totalProjects={projects.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
