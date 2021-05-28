import { useEffect, useState } from 'react'
import getFirebase from './firebase' // import our getFirebase function

export default function useFirebase() {
    const [instance, setInstance] = useState(null)
    const [db, setDb] = useState(null)

    useEffect(() => {
        const { firebase, firestore } = getFirebase()
        setInstance(firebase)
        setDb(firestore)
    }, [])

    return { firebase: instance, firestore: db }
}
