import gql from 'graphql-tag'

const organizationSchema = gql`
  type AllOrgUsers {
    totalUsers: Int!
    organizations: [OrganizationDetails!]!
  }

  type OrganizationDetails {
    organization: Organization!
    members: [User]!
    loginsCount: Int!
    recentLocation: String
    monthPercentage: Float!
  }
  type RegistrationCounts {
    month: String
    users: Int
    organizations: Int
  }
  type RegistrationStats {
    year: Int!
    stats: [RegistrationCounts]
  }
  type Query {
    getAllOrgUsers: AllOrgUsers
    getRegistrationStats: [RegistrationStats]
  }
`

export default organizationSchema
