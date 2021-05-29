import { useEffect, useState } from 'react'

const addScript = (setScriptAdded) => {
    setScriptAdded(true)
    const el = document.createElement('script')
    el.type = 'text/javascript'
    el.async = true
    el.src = 'https://api.reftagger.com/v2/RefTagger.es.js'
    document.getElementsByTagName('body')[0].appendChild(el)
}

const addRefTagger = (settings) => {
    window.refTagger = { settings }
}

export default function RefTagger(props) {
    const [scriptAdded, setScriptAdded] = useState(false)

    useEffect(() => {
        if (!scriptAdded) {
            addScript(setScriptAdded)
        }
        if (window && !window.refTagger) {
            addRefTagger(props)
        }
        if (window.refTagger && window.refTagger.tag) {
            window.refTagger.tag()
        }
    }, [scriptAdded, props])

    return null
}
