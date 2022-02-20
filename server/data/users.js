/** @format */
import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    isAdmin: true,
    password: bcrypt.hashSync("1234567", 10),
  },
  {
    name: "user",
    email: "user@example.com",
    password: bcrypt.hashSync("1234567", 10),
  },
];

export default users;
