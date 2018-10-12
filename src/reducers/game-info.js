export const GAME_INFO = 'game-info/GAME_INFO';
import { httpPost } from "../services/http";
import { setFixedTime } from "./fixedTime";
import { setTempTime } from "./tempTime";

const initialState = {
    description: "",
    cost: "",
    title: "",
    no_more_games: false,
    time: 0
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_INFO:
            return action.payload;
        default:
            return state;
    }
}
export const getGameInfo = () => async dispatch => {
    // let body = {
    //     missionId: this.props.selectedMission.id,
    //     qrCode: qrcode.data
    //   };
    //   let promise = httpPost(
    //     urls.send_qr_code,
    //     JSON.stringify(body),
    //     this.props.token
    //   );
    //   promise.then(
    //     result => {
    //     },
    //     error => {
    //       this.props.loaderState(false);
    //       this.props.setShowQR(true)
    //       let error_respons = handleError(error, this.constructor.name, "sendQRCode");
    //       this.setState({ errorText: error_respons.error_text });
    //       this.setModalVisible(error_respons.error_modal);
    //     }
    //   );
    let info = {
        description: "Test description from initialState. Loooooooooooooooooooooong one.",
        cost: "2",
        title: "LACOSTE",
        no_more_games: false,
        time: 60
    }
    dispatch(setFixedTime(info.time))
    dispatch(setTempTime(info.time))
    dispatch(setGameInfo(info))
}
export const setGameInfo = (payload) => ({
    type: GAME_INFO, payload
})



