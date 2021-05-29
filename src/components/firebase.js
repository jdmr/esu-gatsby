import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore/lite'

const config = {
    apiKey: 'AIzaSyCCAxC8aP_ugjB5GByI1Ra5S5XC2UUh8DQ',
    authDomain: 'esu2020.firebaseapp.com',
    databaseURL: 'https://esu2020.firebaseio.com',
    projectId: 'esu2020',
    storageBucket: 'esu2020.appspot.com',
    messagingSenderId: '843894306921',
    appId: '1:843894306921:web:aceeace148027af6b8caf8',
    measurementId: 'G-82L0ST4PNK'
}

let instance = null
let db = null

export default function getFirebase() {
    if (typeof window !== 'undefined') {
        if (instance) return { firebase: instance, firestore: db }
        instance = initializeApp(config)
        if (instance) {
            db = initializeFirestore(instance)
            import('firebase/analytics').then(({ getAnalytics }) => {
                getAnalytics(instance)
            })
            import('firebase/performance').then(({ getPerformance }) => {
                getPerformance(instance)
            })
        }
    }

    return { firebase: instance, firestore: db }
}
