import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id email name role }
    }
  }
`

export const ME = gql`
  query Me { me { id email name role } }
`

export const ANALYTICS = gql`
  query Analytics($filter: AnalyticsFilter) {
    analytics(filter: $filter) {
      kpis { key label value unit delta }
      timeseries { date value region }
      performance
      accessibility
      reliability
    }
  }
`
