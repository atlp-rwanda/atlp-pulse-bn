import gql from 'graphql-tag'

const Schema = gql`
  scalar Upload

  type Cohort {
    name: String
    phase: Phase
    coordinator: User
  }
  type Phase {
    _id: ID
    name: String
    description: String
  }
  type Program {
    name: String
    description: String
    manager: User
  }

  type Subscription {
    newRating(receiver: String!): Notification!
    newfeedback(sprint: String, user: String): RatingMessageTemp!
    newfeedbacks(sprint_user: String): newFeedbacks
    newReply: Notification!
  }

  type newFeedbacks {
    sprint: String
    user: String
    data: RatingMessageTemp!
  }

  type StatusType {
    status: String
    date: DateTime
    reason: String
  }

  type Notification {
    id: ID!
    receiver: ID!
    message: String!
    sender: User!
    createdAt: String!
    read: String!
  }
  type Ratings {
    quantity: String
    quality: String
    professional_Skills: String
  }
  type Team {
    id: ID!
    name: String
    cohort: Cohort
    ttl: User
    avgRatings: Ratings
    members: [User]
    startingPhase: DateTime
    active: Boolean
    isJobActive: Boolean
    organization: Organization
    phase: Phase
    manager: User
    program: Program
  }
  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    profile: Profile
    team: Team
    cohort: Cohort
    program: Program
    organizations: [String!]!
    pushNotifications: Boolean!
    emailNotifications: Boolean!
    status: StatusType
    ratings: [Rating]
    twoFactorAuth:Boolean!
    TwoWayVerificationToken:String
  }
  input RegisterInput {
    email: String!
    password: String!
    role: String
  }
  input LoginInput {
    email: String
    password: String
    orgToken: String
  }
  input OrgInput {
    name: String
  }

  input DeleteUserInput {
    id: ID!
  }

  type DeleteUserPayload {
    message: String!
  }

  type Mutation {
    deleteUser(input: DeleteUserInput!): DeleteUserPayload!
  }

  type Profile {
    id: ID!
    user: User!
    activity: [Activity]
    firstName: String
    lastName: String
    name: String
    address: String
    city: String
    country: String
    phoneNumber: String
    biography: String
    avatar: String
    cover: String
    githubUsername: String
    resume: String
  }

  type Activity {
    date: String
    country_code: String
    country_name: String
    city: String
    postal: String
    latitude: Float
    longitude: Float
    IPv4: String
    state: String
    failed: Int
  }

  type UserRole {
    id: ID!
    name: String!
  }
  type RegisteredUser {
    token: String
    user: User
  }
  type LoginResponse {
  token: String!
  user: User!
  message: String!
}
  type Login {
    token: String
    user: User
    message:String
    otpRequired:Boolean
    
  }
  type OrgLogin {
    token: String
    organization: Organization
  }

  type Organization {
    id: ID!
    name: String!
    description: String
    admin: User
    status: String
    gitHubOrganisation: String
    activeRepos: [String]
  }

  type GitHubActivity {
    totalCommits: String!
    pullRequest: pullRequest!
  }

  type pullRequest {
    merged: String!
    closed: String!
    opened: String!
  }

  input OrganizationInput {
    email: String!
    name: String!
    description: String
  }

    type Rating {
    id: ID!
    user: User!
    sprint: Int!
    phase: String!
    quantity: String!
    quality: String!
    attendance: String
    professional_Skills: String!
    approved: Boolean!
    coordinator: String!
    cohort: Cohort!
    average: String
    feedbacks: [RatingMessageTemp]
    createdAt: String
    updatedAt: String
  }

  type AddRating {
    user: User!
    sprint: Int!
    cohort: Cohort!
    phase: String!
    quantity: String!
    quality: String!
    professional_Skills: String!
    average: String
    approved: Boolean!
    coordinator: String!
    feedbacks: [RatingMessageTemp]
  }

  type updateRating {
    user: String
    sprint: Int
    quantity: [String]
    quality: [String]
    professional_Skills: [String]
    feedbacks: [RatingMessageTemp]
    oldFeedback: [String]
    approved: Boolean
  }
  type updateToReply {
    user: String
    sprint: Int
    quantity: [String]
    quality: [String]
    professional_Skills: [String]
    approved: Boolean
  }

  type FetchRatingForAdmin {
    user: User!
    sprint: Int
    quantity: [String]
    quality: [String]
    professional_Skills: [String]
    feedbacks: [RatingMessageTemp]
    oldFeedback: [String]
    approved: Boolean
    cohort: Cohort
  }

  type ApproveRating {
    user: String!
    sprint: Int!
    quantity: String!
    quality: String!
    professional_Skills: String!
    feedbacks: [RatingMessageTemp]
    approved: Boolean!
  }

  type RatingMessageTemp {
    sender: User!
    content: String
    createdAt: String
  }

  type Query {
    getAllUsers(orgToken: String): [User]
    getAllTTLUsers(orgToken: String): [User]
    getTTLTrainees(orgToken: String): [User]
    getUsers(orgToken: String): [User]
    getAllCoordinators(orgToken: String): [User]
    getProfile: Profile
    getAllRoles: [UserRole]
    getRole(id: ID!): UserRole
    getOrganizations: [Organization]!
    getOrganization(name: String!): Organization
    getSignupOrganization(orgToken: String!): Organization
    fetchRatings(orgToken: String): [Rating]
    fetchTrainees: [Cohort]
    fetchRatingsForAdmin(orgToken: String): [FetchRatingForAdmin]
    fetchRatingsTrainee: [Rating]
    fetchAllRatings(orgToken: String): [Rating]
    fetchRatingByCohort(CohortName: String): [Rating]
    fetchCohortsCoordinator(cohortName: ID!): [Cohort]
    verifyResetPasswordToken(token: String!): String
    getTTLTeams(orgToken: String): [Team!]!
    getAllTeams(orgToken: String): [Team!]!
    getAllTeamInCohort(orgToken: String, cohort: String): [Team!]
    gitHubActivity(organisation: String!, username: String!): GitHubActivity!
    getRatingsByCohort(cohortId: String!, orgToken: String!): [Rating]!
    getTeamsByCohort(cohortId: String!, orgToken: String!): [Team]!
  }

  type RejectedRows {
    email: String
    quantity: Int
    quality: Int
    professional_skills: Int
    feedBacks: String
  }

  type AddRatingsByFileData {
    NewRatings: [Rating]!
    UpdatedRatings: [updateRating]!
    RejectedRatings: [RejectedRows]!
  }

  type Mutation {
    enableTwoFactorAuth(email: String!): String  
    # //TwoWayVerificationToken: String!
    disableTwoFactorAuth(email: String!): String  
    loginWithTwoFactorAuthentication(email: String!, otp: String!): LoginResponse!
    createUserRole(name: String!): UserRole!
    uploadResume(userId: ID!, resume: String!): Profile
    dropTTLUser(email: String!, reason: String!): String!
    undropTTLUser(email: String!): String!
    dropCordinator(id: String!, reason: String!): String!
    undropCordinator(id: String!): String!
    giveCoordinatorCohort(coordinatorId: String!, cohortId: String!): String
    createUser(
      firstName: String!
      lastName: String!
      dateOfBirth: DateTime!
      gender: String!
      email: String!
      password: String!
      orgToken: String!
      role: String
    ): RegisteredUser!
    loginUser(loginInput: LoginInput): Login!
    loginOrg(orgInput: OrgInput): OrgLogin!
    requestOrganization(organizationInput: OrganizationInput!): String!
    addOrganization(
      organizationInput: OrganizationInput
      action: String
    ): Organization!
    RegisterNewOrganization(
      organizationInput: OrganizationInput
      action: String
    ): Organization!
    updateProfile(
      lastName: String
      firstName: String
      address: String
      city: String
      country: String
      phoneNumber: String
      biography: String
      fileName: String
      cover: String
      githubUsername: String
    ): Profile

    createProfile(
      lastName: String
      firstName: String
      address: String
      city: String
      country: String
      phoneNumber: String
      biography: String
      fileName: String
      cover: String
      githubUsername: String
    ): Profile
    updateAvatar(avatar: String): Profile
    updateCoverImage(cover: String): Profile
    updateUserRole(id: ID!, name: String, orgToken: String): User!
    deleteOrganization(id: ID!): Organization
    updateGithubOrganisation(
      name: String!
      gitHubOrganisation: String!
    ): Organization
    addRatings(
      user: String!
      sprint: Int!
      quantity: String!
      quality: String!
      cohort: String!
      professional_Skills: String!
      orgToken: String!
    ): AddRating
    addRatingsByFile(
      file: Upload!
      cohortId: String!
      sprint: Int!
      orgToken: String!
    ): AddRatingsByFileData!
    updateRating(
      user: String!
      sprint: Int!
      quantity: [String]
      quality: [String]
      professional_Skills: [String]
      feedbacks: [String]
      orgToken: String!
    ): updateRating
    updateToReply(
      user: String!
      sprint: Int!
      quantity: [String]
      quality: [String]
      professional_Skills: [String]
      orgToken: String!
    ): updateToReply
    AddRatingFeedback(
      sprint: String
      user: String
      content: String
    ): RatingMessageTemp

    approveRating(user: String!, sprint: Int!): ApproveRating
    rejectRating(user: String!, sprint: Int!): String!
    forgotPassword(email: String!): String!
    resetUserPassword(
      password: String!
      confirmPassword: String!
      token: String!
    ): String!
    changeUserPassword(
      currentPassword: String!
      newPassword: String!
      confirmPassword: String!
      token: String!
    ): String!

    addActiveRepostoOrganization(name: String!, repoUrl: String!): Organization!

    deleteActiveRepostoOrganization(
      name: String!
      repoUrl: String!
    ): Organization!
    addTeam(
      name: String!
      cohortName: String!
      orgToken: String!
      startingPhase: DateTime!
      ttlEmail: String!
    ): Team!
  }
  type ratingSystem {
    id: ID!
    name: String!
    grade: [String]!
    description: [String]!
    percentage: [String]!
    userId: String!
    defaultGrading: Boolean
  }
  type Mutation {
    createRatingSystem(
      name: String!
      grade: [String]!
      description: [String]!
      percentage: [String]!
      orgToken: String!
    ): ratingSystem!
    deleteRatingSystem(id: ID!, orgToken: String): String!
    makeRatingdefault(id: ID): String!
  }

  type Query {
    getRatingSystems(orgToken: String!): [ratingSystem]
    getDefaultGrading: [ratingSystem]
    getRatingSystem(id: ID!, orgToken: String!): ratingSystem!
  }
  type Notifications {
    id: ID!
    user: String!
    sprint: Int!
    createdAt: String!
  }
  type Query {
    getReplies: [Notifications]
    getRepliesByUser(userId: String): [Notifications]
    getTeamTrainees(orgToken: String, team: String): [User]
  }
  type Mutation {
    addNotifications(
      id: ID!
      user: String!
      message: String!
      coordinator: String!
      createdAt: String!
      read: String!
    ): Notification!
    deleteNotifications(id: ID!): String
    markAsRead(id: ID!): String
    markAllAsRead: String
  }
  type Mutation {
    addNotifications(
      id: ID!
      user: String!
      message: String!
      coordinator: String!
      createdAt: String!
      read: String!
    ): Notification!
    deleteNotifications(id: ID!): String
    markAsRead(id: ID!): String
    markAllAsRead: String
  }

  type Mutation {
    addReply(rating: ID!, sprint: Int!): Notifications!
    deleteTeam(id: ID!): String!
    updateTeam(
      id: ID!
      orgToken: String
      name: String
      cohort: String
      TTL: String
      phase: String
      program: String
      manager: String
    ): Team
    deleteReply: String!
  }

  type Doc {
    title: String!
    description: String!
  }

  type Documentation {
    id: ID!
    title: String!
    for: String!
    description: String!
    subDocuments: [Doc]!
  }

  type DocumentationInput {
    title: String!
    for: String!
    description: String!
  }
  type Query {
    getDocumentations: [Documentation]
  }

  type Mutation {
    addDocumentation(
      title: String!
      for: String!
      description: String!
    ): Documentation!
    updateDocumentation(
      id: ID!
      title: String
      for: String
      description: String
    ): Documentation!
    deleteDocumentation(id: ID!): String!

    addSubDocumentation(
      id: ID!
      title: String!
      description: String!
    ): Documentation!
    deleteSubDocumentation(
      id: ID!
      title: String!
      description: String!
    ): Documentation!
  }
  type Mutation {
    updatePushNotifications(id: ID!): String
    updateEmailNotifications(id: ID!): String
  }
  type Query {
    getUpdatedEmailNotifications(id: ID!): Boolean!
    getUpdatedPushNotifications(id: ID!): Boolean!
  }

  type Attendance {
    id: ID!
    phase: Phase!
    cohort: Cohort!
    week: String!
    teams: [AttendanceTeam]!
  }
  type AttendanceTeam {
    team: Team!
    trainees: [TraineeAttendance!]!
  }

  type TraineeAttendance {
    trainee: User!
    status: [AttendanceStatus!]!
  }

  type AttendanceStatus {
    day: String!
    date: String!
    score: Int!
  }

  type AttendanceStats {
    week: String!
    days: String!
    value: Int!
    traineesStatistics: [TraineeStats]
  }

  type TraineeStats {
    traineeId: [String!]
    attendancePerc: String!
  }

  type AttendanceDatesData {
    date: String!
    isValid: Boolean!
    score: String
  }
  type AttendanceDates {
    mon: AttendanceDatesData!
    tue: AttendanceDatesData!
    wed: AttendanceDatesData!
    thu: AttendanceDatesData!
    fri: AttendanceDatesData!
  }
  type TraineeAttendanceData {
    trainee: User!
    score: Int!
  }
  type AttendanceDays {
    mon: [TraineeAttendanceData]!
    tue: [TraineeAttendanceData]!
    wed: [TraineeAttendanceData]!
    thu: [TraineeAttendanceData]!
    fri: [TraineeAttendanceData]!
  }
  type AttendanceWeeks {
    phase: Phase!
    weeks: [Int!]
  }
  type FilteredAttendance {
    week: Int!
    phase: Phase!
    dates: AttendanceDates!
    days: AttendanceDays!
  }
  type SanitizedAttendance {
    today: String!
    yesterday: String!
    attendanceWeeks: [AttendanceWeeks!]!
    attendance: [FilteredAttendance!]!
  }

  type PauseAndResumeTeamAttendance {
    team: Team!
    sanitizedAttendance: SanitizedAttendance!
  }

  type traineeAttendanceWeek {
    week: Int!
    weekAverage: String!
    daysStatus: AttendanceDates!
  }

  type traineeAttendancePhase {
    phase: Phase!
    phaseAverage: String!
    weeks: [traineeAttendanceWeek]!
  }

  type traineeAttendance {
    traineeId: String!
    teamName: String!
    allPhasesAverage: String!
    phases: [traineeAttendancePhase]!
  }

  type Query {
    getTeamAttendance(orgToken: String, team: String!): SanitizedAttendance
    getTraineeAttendance(traineeId: String): traineeAttendance
  }
  type Mutation {
    recordAttendance(
      week: Int!
      team: String!
      today: Boolean!
      yesterday: Boolean!
      trainees: [TraineeInput!]!
      orgToken: String!
    ): SanitizedAttendance

    pauseAndResumeTeamAttendance(
      team: String!
      orgToken: String
    ): PauseAndResumeTeamAttendance

    updateAttendance(
      week: Int!
      day: String!
      team: String!
      phase: String!
      trainees: [TraineeInput!]!
      orgToken: String!
    ): SanitizedAttendance

    deleteAttendance(
      week: Int!
      team: String!
      day: String!
    ): SanitizedAttendance
  }

  input TraineeInput {
    trainee: ID!
    score: Int!
  }
  type Session {
    id: String
    Sessionname: String
    description: String
    platform: String
    duration: String
    organizer: String
  }

  input SessionInput {
    Sessionname: String
    description: String
    platform: String
    duration: String
    organizer: String
  }

  input EditSessionInput {
    Sessionname: String
    description: String
    platform: String
    duration: String
    organizer: String
  }
  type Query {
    session(ID: ID!): Session!
    getSession(id: ID!): Session
    getAllSessions: [Session]
  }

  type Mutation {
    createSession(sessionInput: SessionInput): Session!
    deleteSession(ID: ID!): Boolean
    editSession(ID: ID!, editSessionInput: EditSessionInput): Boolean
  }
`
export default Schema
