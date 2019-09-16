export const sendToTelegramm = (message, token) => {
  let url = `https://api.telegram.org/bot607040414:AAGNZSkQpMSMgwP-aeaH-wPutaxuupMZP9Y/sendMessage?chat_id=-1001366802861&text=${message}`
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
}

export const telegram = message => {
  let url = `https://api.telegram.org/bot871870559:AAGrSiTXQonYVBALTihLmxIKYWUrpW1_Hwg/sendMessage?chat_id=-1001344636692&text=${message}`
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
}
