import Categories from '../models/Categories'

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({ where: { state: true } })

        return res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

export {
    getCategories
}