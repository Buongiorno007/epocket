//constants
import { RU } from "./../locales/ru";
import { sendToEpcErrorBot } from "./telegramm-notification"
const defaultError = "code : 500. Internal Server Error"
{
  /* 
      call example
  
      promise.then(
        result => {
          this.setModalVisible(false); //hide error modal
        },
        error => {
          let error_respons = handleError(error, this.constructor.name, "sendQRCode");
          this.setState({ errorText: error_respons.error_text }); //set error text for alert
          this.setModalVisible(error_respons.error_modal); //show error modal only if it is needed 
        }
      );


      416 - лимит на кол-во человек.
      418 - лимит на кол-во выполнений за день
  */
}
setErrorData = (error_text, error_modal, error_code) => ({
  error_text,
  error_modal,
  error_code
});
export const handleError = (errorAll, constructor_name, function_name) => {
  let error = this.setErrorData(defaultError, false, errorAll.code)
  switch (errorAll.code) {
    case 503: error = this.setErrorData(RU.HTTP_ERRORS.SERVER_ERROR, true, errorAll.code); break;
    case 400: error = this.setErrorData(RU.HTTP_ERRORS.NOT_FOUND, true, errorAll.code); break;
    case 403: error = this.setErrorData(RU.HTTP_ERRORS.SMTH_WENT_WRONG, true, errorAll.code); break;
    case 408: error = this.setErrorData(RU.HTTP_ERRORS.RUNTIME, true, errorAll.code); break;
    case 416: error = this.setErrorData(RU.HTTP_ERRORS.PEOPLE_LIMIT, true, errorAll.code); break;
    case 418: error = this.setErrorData(RU.HTTP_ERRORS.PERSONAL_LIMIT, true, errorAll.code); break;
    default: error = this.setErrorData(RU.HTTP_ERRORS.SERVER_ERROR, true, errorAll.code); break
  }
  console.log("Rejected request at " + constructor_name + " (function name: " + function_name + ")", errorAll, "/// Generated error: ", error)
  if (!__DEV__) {
    sendToEpcErrorBot(
      "Rejected request at " + constructor_name + " (function name: " + function_name + ")" + errorAll, "/// Generated error: ", error
    )
  }
  return error
}