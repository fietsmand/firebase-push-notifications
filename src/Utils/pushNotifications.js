import {
    initializeApp, messaging, sendTokenToServer,
    updateUIForPushEnabled, updateUIForPushPermissionRequired, setTokenSentToServer, showToken } from 'firebase';
import firebaseConfig, { config } from '../Config/firebase';

initializeApp(firebaseConfig)

export const askForPermissionToReceiveNotifications = async () => {
    const messagingInstance = messaging();
    await messagingInstance.requestPermission().then(res => {
        console.log('Permission granted');
        return messagingInstance.getToken();
        
    }).then(token => {
        console.log('🚀: askForPermissionToReceiveNotifications -> token', token);
    }).catch(err => {
    console.log('🚀: askForPermissionToReceiveNotifications -> err', err);
        console.log('Permission rejected');

    });

    messagingInstance.onMessage((payload) => {
        console.log('🚀: askForPermissionToReceiveNotifications -> payload', payload);
    })
}
