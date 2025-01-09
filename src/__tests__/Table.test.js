import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import Table from "../components/Table";

describe("Table Component", () => {
  const sampleProjects = [
    {
      "s.no": 1,
      "percentage.funded": 50,
      "amt.pledged": 1000,
      "blurb": "Description 1",
      "by": "By 1",
      "country": "US",
      "currency": "usd",
      "end.time": "2021-12-01T23:59:00-04:00",
      "location": "Location 1",
      "num.backers": "100",
      "state": "NY",
      "title": "Project 1",
      "type": "Type 1",
      "url": "/url1",
    },
    {
      "s.no": 2,
      "percentage.funded": 30,
      "amt.pledged": 500,
      "blurb": "Description 2",
      "by": "By 2",
      "country": "US",
      "currency": "usd",
      "end.time": "2021-12-01T23:59:00-04:00",
      "location": "Location 2",
      "num.backers": "200",
      "state": "CA",
      "title": "Project 2",
      "type": "Type 2",
      "url": "/url2",
    },
    {
      "s.no": 3,
      "percentage.funded": 75,
      "amt.pledged": 1500,
      "blurb": "Description 3",
      "by": "By 3",
      "country": "US",
      "currency": "usd",
      "end.time": "2021-12-01T23:59:00-04:00",
      "location": "Location 3",
      "num.backers": "300",
      "state": "TX",
      "title": "Project 3",
      "type": "Type 3",
      "url": "/url3",
    },
  ];

  test("should render the table with data correctly", () => {
    render(<Table projects={sampleProjects} projectsPerPage={2} />);

    // Check table headers
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();

    // Check the number of rows (should be limited by projectsPerPage)
    expect(screen.getAllByRole("row")).toHaveLength(3); // 2 data rows + 1 header row
  });

  test('should render "No Data Available" when there are no projects', () => {
    render(<Table projects={[]} />);

    // Check if "No Data Available" message is rendered
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  test("should display the correct number of projects per page", () => {
    render(<Table projects={sampleProjects} projectsPerPage={2} />);

    // Check if only the correct number of rows (projectsPerPage) are rendered
    expect(screen.getAllByRole("row")).toHaveLength(3); // 2 data rows + 1 header row
  });

  test('should show "N/A" when data is missing for some fields', () => {
    const incompleteProjects = [
      {
        "s.no": 1,
        "percentage.funded": null,
        "amt.pledged": 1000,
        "blurb": "Description 1",
        "by": "By 1",
        "country": "US",
        "currency": "usd",
        "end.time": "2021-12-01T23:59:00-04:00",
        "location": "Location 1",
        "num.backers": "100",
        "state": "NY",
        "title": "Project 1",
        "type": "Type 1",
        "url": "/url1",
      },
      {
        "s.no": 2,
        "percentage.funded": 50,
        "amt.pledged": null,
        "blurb": "Description 2",
        "by": "By 2",
        "country": "US",
        "currency": "usd",
        "end.time": "2021-12-01T23:59:00-04:00",
        "location": "Location 2",
        "num.backers": "200",
        "state": "CA",
        "title": "Project 2",
        "type": "Type 2",
        "url": "/url2",
      },
    ];

    render(<Table projects={incompleteProjects} projectsPerPage={2} />);

    // Check if "N/A" is displayed when data is missing for any field
    const naCells = screen.getAllByText("N/A");
    expect(naCells.length).toBe(2); // There should be 2 "N/A" cells
  });
});
