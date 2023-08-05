// * Handles the difference between timezones and relative time
export const getTimeAgo = (date) => {
  const currentDate = new Date()
  const offset = currentDate.getTimezoneOffset()
  const localPostDate = new Date(date - offset * 60000)
  const time = currentDate - localPostDate // * In seconds
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const timeDifferenceInSeconds = time / 1000

  if (timeDifferenceInSeconds < 60) {
    return rtf.format(-Math.floor(timeDifferenceInSeconds), 'second')
  } else if (timeDifferenceInSeconds < 3600) {
    return rtf.format(-Math.floor(timeDifferenceInSeconds / 60), 'minute')
  } else if (timeDifferenceInSeconds < 86400) {
    return rtf.format(-Math.floor(timeDifferenceInSeconds / 3600), 'hour')
  } else if (timeDifferenceInSeconds < 604800) {
    return rtf.format(-Math.floor(timeDifferenceInSeconds / 86400), 'day')
  } else if (timeDifferenceInSeconds < 2419200) {
    return rtf.format(-Math.floor(timeDifferenceInSeconds / 604800), 'week')
  } else {
    return rtf.format(-Math.floor(timeDifferenceInSeconds / 2419200), 'month')
  }
}
