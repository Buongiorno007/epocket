//constants
import PickedLanguage from "./../locales/language-picker";
import { Platform } from "react-native"
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
export const handleError = (errorAll, request_body, request_url, request_token, constructor_name, function_name) => {
  let error = this.setErrorData(defaultError, false, errorAll.code)
  switch (errorAll.code) {
    case 503: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.SERVER_ERROR, true, errorAll.code); break;
    case 400: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.NOT_FOUND, true, errorAll.code); break;
    case 403: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.SMTH_WENT_WRONG, true, errorAll.code); break;
    case 408: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.RUNTIME, true, errorAll.code); break;
    case 416: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.PEOPLE_LIMIT, true, errorAll.code); break;
    case 418: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.PERSONAL_LIMIT, true, errorAll.code); break;
    default: error = this.setErrorData(PickedLanguage.HTTP_ERRORS.SERVER_ERROR, true, errorAll.code); break
  }
  console.log(
    "Rejected request at " + constructor_name,
    "/// Function name: ", function_name,
    "/// Error all: ", errorAll,
    "/// Generated error: ", error,
    "/// Request body: ", request_body,
    "/// Request url: ", request_url,
    "/// Request token: ", request_token
  )
  if (!__DEV__) {
    sendToEpcErrorBot(
      "---FRONT INFO---" + " \n " +
      "/// Rejected request at Constructor: '" + constructor_name + "' \n " +
      "/// Function name: " + function_name + " \n " +
      "/// Generated error: " + JSON.stringify(error) + " \n " +
      "/// Platform: " + Platform.OS + " \n " +
      "---BACK INFO---" + " \n " +
      "/// Error all: " + JSON.stringify(errorAll) + " \n " +
      "/// Request body: " + JSON.stringify(request_body) + " \n " +
      "/// Request url: " + request_url + " \n " +
      "/// Request token: " + request_token + " \n "
    )
  }
  return error
}