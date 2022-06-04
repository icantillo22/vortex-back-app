import Users from '../models/Users'
import jwt from 'jsonwebtoken'
import config from '../config'

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if(!token) return res.status(403).json({error: true, message: 'No existe el token'})

        const decoded = jwt.verify(token, config.SECRET)

        const user = await Users.findOne({ where: { id: decoded.id } })

        if (!user) return res.status(404).json({error: true, message: 'El usuario no existe.'})

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: true, message: 'No tienes permisos para realizar esta acción'})  
    }
}

export default verifyToken