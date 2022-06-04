const signIn = (req, res, next) => {
    const { username, password } = req.body

    if(!username || username?.trim() === '') {
        return res.status(403).json({error: true, message: 'El usuario es requerido'})
    }else if (!password || password?.trim() === '') {
        return res.status(403).json({error: true, message: 'La constraseña es requerida'})
    }

    next()
}

const signUp = (req, res, next) => {
    const { name, username, password } = req.body

    if(!name || name?.trim() === '') {
        return res.status(401).json({error: true, message: 'El nombre es requerido'})
    } else if(!username || username?.trim() === '') {
        return res.status(401).json({error: true, message: 'El usuario es requerido'})
    }else if (!password || password?.trim() === '') {
        return res.status(401).json({error: true, message: 'La constraseña es requerida'})
    }

    next()
}

export {
    signIn, signUp
}