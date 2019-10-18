const devServer = "https://epocket.dev.splinestudio.com"
const prodServer = "https://epc.splinestudio.com"
// const devserver = __DEV__ ? devServer : prodServer
// const devserver = prodServer
const devserver = devServer

export const urls = {
  sign_up: devserver + "/sign-in/registration/",
  sign_up_confirm: devserver + "/sign-in/confirm-registration/",
  sing_in: devserver + "/sign-in/",
  sing_in_confirm: devserver + "/sign-in/confirm-login/",
  edit_profile_data: devserver + "/sign-in/edit-profile/",
  outlets: devserver + "/mission/get-outlets/",
  filters: devserver + "/mission/get-filters/",
  missions: devserver + "/mission/get-missions/",
  blank: devserver + "",
  start_mission: devserver + "/mission/start-mission/",
  finish_mission: devserver + "/mission/finish-mission/",
  close_mission: devserver + "/mission/close-mission/",
  send_qr_code: devserver + "/mission/send-qr-code/",
  send_photo: devserver + "/mission/send-photo/", //MAYBE DEPRECATED
  get_received_bonuses: devserver + "/history/wallet-in/",
  get_spent_bonuses: devserver + "/history/wallet-out/",
  get_partners: devserver + "/history/partners",
  get_outlet_products: devserver + "/order/get-outlet-products/",
  create_order: devserver + "/order/create-order/",
  add_device: devserver + "/push-notification/add-device/",
  send_push_all: devserver + "/push-notification/send-push/all", //MAYBE DEPRECATED
  send_push_single: devserver + "/push-notification/send-push/single", //MAYBE DEPRECATED
  insta_login: devserver + "/instagram/api/authorization",
  insta_logout: devserver + "/instagram/api/deleteuser",
  insta_outlet_template: devserver + "/instagram/api/outlet_template",
  insta_upload_photo: devserver + "/instagram/api/upload_photo",
  insta_is_logged: devserver + "/instagram/api/islogged", //MAYBE DEPRECATED
  insta_getmedia: devserver + "/instagram/api/getmedia",
  post_game: devserver + "/instagram/api/post_game",
  facebook_login: devserver + "/facebook/api/authorization",
  facebook_logout: devserver + "/facebook/api/deleteuser",
  facebook_is_logged: devserver + "/facebook/api/islogged", //MAYBE DEPRECATED
  socket: "ws://epocket.dev.splinestudio.com/order/",
  game_get: devserver + "/brand/game", //MAYBE DEPRECATED
  game_expired_timer: devserver + "/brand/time", //MAYBE DEPRECATED
  force_remove_ticker: devserver + "/brand/reset", //MAYBE DEPRECATED
  get_referral_link: devserver + "/link",
  ref_link: devserver + "/reflink?code=",
  echo: devserver + "/echo",
  refill_mobile: devserver + "/payment/send/",
  re_send_code: devserver + "/sign-in/re-send",
  get_user: devserver + "/sign-in/user-info",
  new_game_get: devserver + "/brand/new_game",
  get_a_game: devserver + "/brand/new_data",
  game_result: devserver + "/brand/new_check",
  get_wallet_history: devserver + "/history/new_wallet?page=",
  new_poducts: devserver + "/order/new-products/",
  basket_update: devserver + "/order/basket-update/",
  new_mission_list: devserver + "/mission/mission-list",
  task_process: devserver + "/mission/new-list",
}
