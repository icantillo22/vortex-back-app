import Users from '../models/Users'
import * as bcrypt from '../libs/password'
import config from '../config'
import jwt from 'jsonwebtoken'
import Roles from '../models/Roles'

const signUp = async (req, res) => {
    try {
        const { username, name, password } = req.body
        const passwordHash = await bcrypt.encryptPassword(String(password))

        const newUser = await Users.create({
            username,
            name,
            password: passwordHash,
            rolId: 3
        })

        const rol = await Roles.findOne({attributes: ['rol'], where: {id: newUser.rolId}})

        const token = jwt.sign({id: newUser.id, rolId: newUser.rolId}, config.SECRET, {
            expiresIn: (3*60)*60 //3 hrs
        })

        return res.status(200).json({token, userData: {
            username: newUser.username, name: newUser.name, rolId: newUser.rolId, id: newUser.id ,
            Roles: rol
        }})
    } catch (error) {
        return res.status(500).json({error: true, message: error.message})  
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body

        const userFound = await Users.findOne({
            attributes: ['username', 'name', 'rolId', 'id', 'password'],
            include: { model: Roles, as: 'Roles', attributes: ['rol'] },
            where: { username } 
        })

        if (!userFound) {
            return res.status(400).json({error: true, message: 'El usuario no se encuentra registrado.'})
        }

        const matchPassword = await bcrypt.comparePassword(password, userFound.password)

        if (!matchPassword) {
            return res.status(401).json({error: true, message: 'El usuario o la contraseña son incorrectos.'})
        }

        const token = jwt.sign({id: userFound.id, rolId: userFound.rolId}, config.SECRET, {
            expiresIn: (3*60)*60 //3 hrs
        })

        return res.json({ 
            token, 
            userData: { 
                username: userFound.username, name: userFound.name, rolId: userFound.rolId, id: userFound.id ,
                Roles: userFound.Roles 
            } 
        })
    } catch (error) {
        return res.status(500).json({error: true, message: error.message})  
    }
}

export {
    signUp, signIn
}