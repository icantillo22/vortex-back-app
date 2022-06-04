const create = (req, res, next) => {
    const { question, description, categoryId } = req.body

    if(!question || question?.trim() === '') {
        return res.status(403).json({error: true, message: 'La pregunta es obligatoria'})
    }else if (!description || description?.trim() === '') {
        return res.status(403).json({error: true, message: 'La descripción de la pregunta es obligatoria'})
    } else if (!categoryId) {
        return res.status(403).json({error: true, message: 'La categoria es obligatoria'})
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
    create, update
}