
const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "Design", "HR", "Finance", "Operations", "Legal", "Product", "Support"];
const STATUSES = ["Active", "Inactive", "Pending", "On Leave"];
const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Krishna",
  "Rohan", "Karan", "Rahul", "Aman", "Akshay",
  "Ankit", "Siddharth", "Yash", "Vikram", "Harsh",
  "Priya", "Ananya", "Sneha", "Pooja", "Kavya",
  "Neha", "Riya", "Aditi", "Shreya", "Meera",
  "Isha", "Nidhi", "Simran", "Tanvi", "Diya",
  "Manish", "Deepak", "Ravi", "Suresh", "Rajesh",
  "Sunil", "Abhishek", "Mohit", "Varun", "Nikhil"
];

const LAST_NAMES = [
  "Sharma", "Verma", "Gupta", "Singh", "Yadav",
  "Patel", "Kumar", "Mishra", "Tiwari", "Pandey",
  "Agarwal", "Chauhan", "Rathore", "Mehta", "Jain",
  "Saxena", "Joshi", "Malhotra", "Kapoor", "Bansal",
  "Reddy", "Nair", "Iyer", "Pillai", "Menon",
  "Choudhary", "Dubey", "Soni", "Bhardwaj", "Thakur",
  "Kulkarni", "Deshmukh", "Pawar", "Naidu", "Shetty",
  "Khan", "Ansari", "Shaikh", "Ali", "Qureshi"
];
export const generateData = (count = 10000) => {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const firstName = FIRST_NAMES[(i * 7) % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 13) % LAST_NAMES.length];
    const dept = DEPARTMENTS[(i * 3) % DEPARTMENTS.length];
    const status = STATUSES[(i * 5) % STATUSES.length];
    const salary = 40000 + ((i * 1237) % 120000);
    const quantity = 1 + ((i * 11) % 999);

    rows.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
      department: dept,
      salary,
      quantity,
      status,
    });
  }
  return rows;
};

export const INITIAL_DATA = generateData(10000);
