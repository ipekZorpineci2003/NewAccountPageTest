import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Test suite - to test form validation
describe("Form validation tests", () => {
  // Before each test render the new account page
  beforeEach(() => {
    render(<App />);
  });

  // Helper function: Fill in the field depending on the label
  const fillField = (labelText, value) => {
    fireEvent.change(screen.getByLabelText(labelText), { target: { value } });
  };

  // Helper function: Click on the submit button
  const clickSubmit = () => {
    fireEvent.click(screen.getByText("SUBMIT"));
  };

  // TEST 1: It should display an error when required fields are left empty
  test("shows error messages when required fields are empty", () => {
    clickSubmit();
    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(
      screen.getByText("Please confirm your password")
    ).toBeInTheDocument();
    expect(screen.getByText("Date of birth is required")).toBeInTheDocument();
  });

  // TEST 2: Should give a warning when an email is entered in an invalid format
  test("shows error for invalid email format", () => {
    fillField("First Name", "John");
    fillField("Last Name", "Doe");
    fillField("E-mail", "john@site"); // missing email domain (eg. .com)
    fillField("Password", "password123");
    fillField("Confirm Password", "password123");
    fillField("Date of Birth (dd/mm/yyyy)", "01/01/2000");
    clickSubmit();
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  // TEST 3: Should give a warning if the passwords dosen't match
  test("shows error when passwords do not match", () => {
    fillField("Password", "password123");
    fillField("Confirm Password", "password321"); // unmatching password
    clickSubmit();
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  // TEST 4: Should give a warning if invalid date format is entered
  test("shows error for invalid date format", () => {
    fillField("Date of Birth (dd/mm/yyyy)", "01-01-2000");
    clickSubmit();
    expect(
      screen.getByText("Date format must be dd/mm/yyyy")
    ).toBeInTheDocument();
  });

  // TEST 5: Should give a warning when out-of-range date is entered
  test("shows error for invalid day in date (boundary)", () => {
    fillField("Date of Birth (dd/mm/yyyy)", "32/01/2000");
    clickSubmit();
    expect(
      screen.getByText("Day must be between 1 and 31")
    ).toBeInTheDocument();
  });
});
