import { gql } from 'graphql-tag';

const typeDefs = gql`
  enum Role {
    ADMIN
    ANALYST
    VIEWER
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: Role!
  }

  extend type Query {
    users: [User!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type KPI {
    key: String!
    label: String!
    value: Float!
    unit: String
    delta: Float
  }

  type TimeSeriesPoint {
    date: String!
    value: Float!
    region: String
  }

  type AnalyticsSummary {
    kpis: [KPI!]!
    timeseries: [TimeSeriesPoint!]!
    reliability: Float!
    accessibility: Float!
    performance: Float!
  }

  input AnalyticsFilter {
    region: String
    from: String
    to: String
  }

  type Query {
    me: User
    analytics(filter: AnalyticsFilter): AnalyticsSummary!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }

  extend type Mutation {
    addUser(email: String!, name: String!, password: String!, role: Role!): User!
    updateUser(id: ID!, role: Role!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

export default typeDefs;
