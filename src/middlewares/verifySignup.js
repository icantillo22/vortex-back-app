import Users from '../models/Users'

const checkDuplicateUsername = async (req, res, next) => {
    try {
        const { username } = req.body
        const userExist = await Users.findOne({ where: { username } })

        if (userExist) return res.status(401).json({error: true, message: 'El usuario ya existe'})

        next()

    } catch (error) {
        res.status(500).json({error: true, message: error.message})  
    }
}

export { checkDuplicateUsername }