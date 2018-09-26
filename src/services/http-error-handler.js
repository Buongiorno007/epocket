//constants
import { RU } from "./../locales/ru";
const defaultError = "code : 500. Internal Server Error"
{
    /* 
        call example
    
        promise.then(
          result => {
            this.setModalVisible(false); //hide error modal
          },
          error => {
            let error_respons = handleError(error.code);
            this.setState({ errorText: error_respons.error_text, errorCode: error_respons.error_code}); //set error text for alert
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
export const handleError = (error_code) => {
    let error = this.setErrorData(defaultError, false, error_code)
    switch (error_code) {
        case 503: error = this.setErrorData(RU.HTTP_ERRORS.SERVER_ERROR, true, error_code); break;
        case 400: error = this.setErrorData(RU.HTTP_ERRORS.NOT_FOUND, true, error_code); break;
        case 403: error = this.setErrorData(RU.HTTP_ERRORS.SMTH_WENT_WRONG, true, error_code); break;
        case 408: error = this.setErrorData(RU.HTTP_ERRORS.RUNTIME, true, error_code); break;
        case 416: error = this.setErrorData(RU.HTTP_ERRORS.PEOPLE_LIMIT, true, error_code); break;
        case 418: error = this.setErrorData(RU.HTTP_ERRORS.PERSONAL_LIMIT, true, error_code); break;
        default:
    }
    console.log("Rejected request: ", error)
    return error
}