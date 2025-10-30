import bcrypt from 'bcryptjs';

const hash = (pwd) => bcrypt.hashSync(pwd, 8);

export const users = [
  { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'ADMIN', passwordHash: hash('Password123') },
  { id: '2', email: 'analyst@example.com', name: 'Analyst User', role: 'ANALYST', passwordHash: hash('Password123') },
  { id: '3', email: 'viewer@example.com', name: 'Viewer User', role: 'VIEWER', passwordHash: hash('Password123') }
];
