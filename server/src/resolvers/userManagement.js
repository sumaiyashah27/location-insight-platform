import { users } from "../data/users.js";
import jwt from "jsonwebtoken";

export const userManagementResolvers = {
  Mutation: {
    addUser: (_, { email, password, role }, context) => {
      if (context.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      const newUser = {
        id: users.length + 1,
        email,
        password,
        role,
      };
      users.push(newUser);
      return newUser;
    },
  },
  Query: {
    users: (_, __, context) => {
      if (context.user?.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }
      return users;
    },
  },
};
