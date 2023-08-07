export const useSubmitRef = (formRef) => (e) => {
  e.preventDefault()
  if (formRef.current) {
    formRef.current.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    )
  }
}
