import bcrypt from 'bcryptjs'

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    } catch (error) {
        return {error: true, message: error.message}
    }
}

const comparePassword = async (password, recivePassword) => {
    try {
        return await bcrypt.compare(password, recivePassword)
    } catch (error) {
        return {error: true, message: error.message}
    }
}

export {
    encryptPassword, comparePassword
}