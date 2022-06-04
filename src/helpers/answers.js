const create = (req, res, next) => {
    const { response, questionId } = req.body

    if(!response || response?.trim() === '') {
        return res.status(403).json({error: true, message: 'La respuesta es obligatoria'})
    } else if (!questionId) {
        return res.status(403).json({error: true, message: 'El id de la pregunta es obligatorio'})
    }

    next()
}

const qualification = (req, res, next) => {
    const { qualification, questionId } = req.body

    if(!qualification) {
        return res.status(403).json({error: true, message: 'La calificación es obligatoria'})
    } else if (!questionId) {
        return res.status(403).json({error: true, message: 'El id de la respuesta a calificar es obligatoria'})
    }

    next()
}

const update = (req, res, next) => {
    for (const key in req.body) {
        
        if (!req.body[key]){
            return res.status(403).json({error: true, message: `El campo "${key}" es obligatorio`})
        }

        if(isNaN(req.body[key])){
            if(req.body[key].trim() === ''){
                return res.status(403).json({error: true, message: `El campo ${key} es obligatorio`})
            }
        }
    }

    next()
}

export {
    create, qualification, update
}