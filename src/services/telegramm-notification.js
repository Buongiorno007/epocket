export const sendToTelegramm = (message) => {
    let url = `https://api.telegram.org/bot607040414:AAGNZSkQpMSMgwP-aeaH-wPutaxuupMZP9Y/sendMessage?chat_id=-1001366802861&text=${message}`;
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
}