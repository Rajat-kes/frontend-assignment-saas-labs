import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const mockPaginate = jest.fn();

  it('should not render pagination when totalProjects is less than or equal to projectsPerPage', () => {
    render(<Pagination projectsPerPage={5} totalProjects={3} paginate={mockPaginate} currentPage={1} />);
    const pagination = screen.queryByRole('list');
    expect(pagination).toBeNull();
  });
  
  it('should disable "First" button when on the first page', () => {
    render(<Pagination projectsPerPage={5} totalProjects={20} paginate={mockPaginate} currentPage={1} />);
    const firstButton = screen.getByText('First');
    expect(firstButton).toHaveClass('disabled');
  });

  it('should disable "Last" button when on the last page', () => {
    render(<Pagination projectsPerPage={5} totalProjects={20} paginate={mockPaginate} currentPage={4} />);
    const lastButton = screen.getByText('Last');
    expect(lastButton).toHaveClass('disabled');
  });

  it('should call paginate with the next page when clicking on "Next"', () => {
    render(<Pagination projectsPerPage={5} totalProjects={20} paginate={mockPaginate} currentPage={1} />);
    fireEvent.click(screen.getByText('Next')); // Clicking on "Next"
    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  it('should call paginate with the previous page when clicking on "Prev"', () => {
    render(<Pagination projectsPerPage={5} totalProjects={20} paginate={mockPaginate} currentPage={2} />);
    fireEvent.click(screen.getByText('Prev')); // Clicking on "Prev"
    expect(mockPaginate).toHaveBeenCalledWith(1);
  });

  it('should render the "Last" page button and navigate to it', () => {
    render(<Pagination projectsPerPage={5} totalProjects={25} paginate={mockPaginate} currentPage={2} />);
    fireEvent.click(screen.getByText('Last')); // Clicking on "Last"
    expect(mockPaginate).toHaveBeenCalledWith(5); // Total pages is 5
  });

  it('should render the "First" page button and navigate to it', () => {
    render(<Pagination projectsPerPage={5} totalProjects={25} paginate={mockPaginate} currentPage={5} />);
    fireEvent.click(screen.getByText('First')); // Clicking on "First"
    expect(mockPaginate).toHaveBeenCalledWith(1); // First page
  });

  it('should correctly display pagination when there are more than 4 pages', () => {
    render(<Pagination projectsPerPage={5} totalProjects={30} paginate={mockPaginate} currentPage={3} />);
    // Expect to see pages 1, 2, 3, and 4 (around the current page 3)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should show the "First" and "Last" buttons when necessary', () => {
    render(<Pagination projectsPerPage={5} totalProjects={50} paginate={mockPaginate} currentPage={3} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });
});
