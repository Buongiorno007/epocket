export const sendToTelegramm = (message, token) => {
  let url = `https://api.telegram.org/bot607040414:AAGNZSkQpMSMgwP-aeaH-wPutaxuupMZP9Y/sendMessage?chat_id=-1001366802861&text=${message}`;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};
export const sendToEpcErrorBot = (message, token) => {
  let url = `https://api.telegram.org/bot831085040:AAEu5AAVzT560Rhqneoe8DFNBcsa7DT1urc/sendMessage?chat_id=@epc_error_log&text=${message}`;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};
