import app from "./app"
import { sequelize } from './database/database'

// import './models/Roles'
// import './models/Users'
// import './models/Categories'
// import './models/Questions'
// import './models/Answers'

const main = async () => {
    try { 
        await sequelize.sync()
        app.listen(app.get('port'))
        console.log('Connection has been established successfully.');
        console.log(`Server is running on server`, app.get('port'))
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main()
