export const validateRow = (row) => {
  const errors = {};
  if (!row.name || row.name.trim() === "") errors.name = "Name is required";
  if (!row.email || row.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    errors.email = "Invalid email";
  }
  if (!row.department || row.department.trim() === "") errors.department = "Department is required";
  if (row.salary === "" || row.salary === undefined || isNaN(Number(row.salary))) {
    errors.salary = "Valid number required";
  }
  if (row.quantity === "" || row.quantity === undefined || isNaN(Number(row.quantity))) {
    errors.quantity = "Valid number required";
  }
  return errors;
};

export const isValid = (errors) => Object.keys(errors).length === 0;
