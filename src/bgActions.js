// @flow
import firebase from 'react-native-firebase';

export default async (notificationOpen) => {
    if (notificationOpen.action === 'snooze') {
        console.log(notificationOpen, 'notificationOpen')
        // handle the action
    }

    return Promise.resolve();
}