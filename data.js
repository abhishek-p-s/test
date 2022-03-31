import bcrypt from "bcrypt"

const data = {
  users: [
    {
      name: "abhishek",
      email: "abhishek@gmail.com",
      password: bcrypt.hashSync("123", 8),
      isAdmin: true,
    },
    {
      name: "abhi",
      email: "abhi@gmail.com",
      password: bcrypt.hashSync("123", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "abhishek",
      email: "abhishek@gmail.com",
    },
    { name: "vivek", email: "vivek@gmail.com" },
    { name: "sanju", email: "sanju@gmail.com" },
    { name: "vignesh", email: "vignesh@gmail.com" },
    { name: "arjun", email: "arjun@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
    { name: "test", email: "test@gmail.com" },
  ],
};
export default data;
