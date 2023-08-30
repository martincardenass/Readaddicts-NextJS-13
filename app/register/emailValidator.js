import fieldsValidator from '@/utility/validator'

const validateEmail = (email) => fieldsValidator('User/Validator/EmailExists/', email)

export default validateEmail
