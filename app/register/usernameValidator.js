import fieldsValidator from '@/utility/validator'

const validateUsername = (username) => fieldsValidator('User/Validator/UsernameExists/', username)

export default validateUsername
