import fieldsValidator from '@/utility/validator'

const validateGroupName = (groupName) => fieldsValidator('Groups/Validator/GroupExists/', groupName)

export default validateGroupName
