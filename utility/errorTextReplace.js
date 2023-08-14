const errorTextReplace = (data) => {
  const errorText = data?.text[0]?.error
  const replacedErrorText = errorText?.replace(
    errorText,
    'Min 8 characters'
  )

  return replacedErrorText
}

export default errorTextReplace
