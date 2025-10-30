import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      email
      role
    }
  }
`;

export const ADD_USER = gql`
  mutation ($email: String!, $name: String!, $password: String!, $role: Role!) {
    addUser(email: $email, name: $name, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($id: ID!, $role: Role!) {
    updateUser(id: $id, role: $role) {
      id
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id)
  }
`;
