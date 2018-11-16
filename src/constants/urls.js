export const devserver = 'https://epocket.dev.splinestudio.com';

export const urls = {
    sign_up :                   devserver+ '/sign-in/registration/',
    sign_up_confirm :           devserver+ '/sign-in/confirm-registration/',
    sing_in :                   devserver+ '/sign-in/',
    sing_in_confirm :           devserver+ '/sign-in/confirm-login/',
    edit_profile_data :         devserver+ '/sign-in/edit-profile/',    
    outlets :                   devserver+ '/mission/get-outlets/',
    missions :                  devserver+ '/mission/get-missions/',
    blank :                     devserver+ '',
    start_mission :             devserver+ '/mission/start-mission/',
    finish_mission :            devserver+ '/mission/finish-mission/',
    close_mission :             devserver+ '/mission/close-mission/',
    send_qr_code :              devserver+ '/mission/send-qr-code/',
    send_photo :                devserver+ '/mission/send-photo/',
    get_received_bonuses :      devserver+ '/history/wallet-in/',
    get_spent_bonuses :         devserver+ '/history/wallet-out/',
    get_outlet_products :       devserver+ '/order/get-outlet-products/',
    create_order :              devserver+ '/order/create-order/',
    add_device :                devserver+ '/push-notification/add-device/',
    send_push_all:              devserver+ '/push-notification/send-push/all',
    send_push_single:           devserver+ '/push-notification/send-push/single',
    insta_login:                devserver+ '/instagram/api/authorization',
    insta_logout:               devserver+ '/instagram/api/deleteuser',
    insta_outlet_template:      devserver+ '/instagram/api/outlet_template',
    insta_upload_photo:         devserver+ '/instagram/api/upload_photo',
    insta_is_logged:            devserver+ '/instagram/api/islogged',
    insta_getmedia:             devserver+ '/instagram/api/getmedia',
    facebook_login:             devserver+ '/facebook/api/authorization',
    facebook_logout:            devserver+ '/facebook/api/deleteuser',
    socket :                               'ws://epocket.dev.splinestudio.com/order/',
    game_get :                  devserver+ '/brand/game',
    game_expired_timer :        devserver+ '/brand/time',
}