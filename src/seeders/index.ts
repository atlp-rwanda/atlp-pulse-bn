import { connect } from './../database/db.config'
import seedOrganizations from './organization.seed'
import seedUsers from './users.seed'

connect().then(async () => {
    await seedUsers()
    await seedOrganizations()

    process.exit()
})

