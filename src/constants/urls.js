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
    socket :                               'ws://epocket.dev.splinestudio.com/order/',
}