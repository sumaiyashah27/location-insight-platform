import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users } from '../data/users.js';
import { buildAnalytics } from '../services/analytics.js';
import { requireRole } from '../roles.js';

export default {
  Query: {
    me: (_, __, { user }) => user || null,

    analytics: (_, { filter }, { user }) => {
      requireRole(user, ['ADMIN', 'ANALYST', 'VIEWER']);
      return buildAnalytics(filter);
    },

    // ✅ Admin-only: fetch all users
    users: (_, __, { user }) => {
      requireRole(user, ['ADMIN']);
      return users.map(({ passwordHash, ...rest }) => rest);
    }
  },

  Mutation: 
  {
    login: async (_, { email, password }, { jwtSecret }) => {
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        throw new Error('Invalid credentials');
      }

      const ok = await bcrypt.compare(password, found.passwordHash);
      if (!ok) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { sub: found.id, role: found.role, email: found.email },
        jwtSecret,
        { expiresIn: '2h' }
      );

      return {
        token,
        user: { id: found.id, email: found.email, name: found.name, role: found.role }
      };
    },

    // ✅ Admin-only: create a new user
    addUser: async (_, { email, name, password, role }, { user }) => {
      requireRole(user, ['ADMIN']);

      const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) throw new Error('User already exists');

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        id: users.length + 1,
        email,
        name,
        role,
        passwordHash
      };
      users.push(newUser);
      return { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role };
    }, // ✅ ← THIS COMMA WAS MISSING

    // ✅ Admin-only: update user role
    updateUser: (_, { id, role }, { user }) => {
      requireRole(user, ['ADMIN']);
      const target = users.find(u => u.id == id);
      if (!target) throw new Error('User not found');
      target.role = role;
      return { id: target.id, email: target.email, name: target.name, role: target.role };
    },

    // ✅ Admin-only: delete user
    deleteUser: (_, { id }, { user }) => {
      requireRole(user, ['ADMIN']);
      const index = users.findIndex(u => u.id == id);
      if (index === -1) throw new Error('User not found');
      users.splice(index, 1);
      return true;
    }
  }

};
