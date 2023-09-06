const formValidation = (formData) => {
  return Object.values(formData).some((field) => {
    if (typeof field === 'object') {
      return field.name !== ''
    } else {
      return field !== ''
    }
  })
}

export default formValidation
