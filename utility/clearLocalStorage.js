const clearLocalStorage = () => {
  setTimeout(() => {
    ;['token', 'user'].forEach((item) =>
      window.localStorage.removeItem(item)
    )
    window.location.reload()
  }, 2000)
}
export default clearLocalStorage
