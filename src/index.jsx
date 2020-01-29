import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import firebaseConfig from './Config/firebase';


firebase.initializeApp(firebaseConfig)

const messagingInstance = firebase.messaging();
navigator.serviceWorker.register('./firebase-messaging-sw.js')
    .then((registration) => {
        messagingInstance.useServiceWorker(registration);
        
        messagingInstance.requestPermission().then(res => {
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
        // Request permission and get token.....
    });

ReactDOM.render(<App />, document.getElementById('root'));