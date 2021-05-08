import React, { useEffect } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import firebase from 'gatsby-plugin-firebase'
import { navigate } from 'gatsby'

const CompartePage = () => {
    useEffect(async () => {
        try {
            const d = new Date()
            d.getDay() === 6 && d.getHours() < 12 && d.setDate(d.getDate() - 1)
            let ds = ''
            ds += d.getFullYear()
            d.getMonth() + 1 < 10
                ? (ds += '0' + (d.getMonth() + 1))
                : (ds += d.getMonth() + 1)
            d.getDate() < 10 ? (ds += '0' + d.getDate()) : (ds += d.getDate())
            const doc = await firebase
                .firestore()
                .doc('/dias/' + ds)
                .get()
            if (!doc.exists) {
                return alert('No pude encontrar el dia')
            }
            const x = doc.data()
            navigate(`/comparte/${x.AO}/${x.TR}/${x.LC}`)
        } catch (err) {
            console.error('Could not get url: ', err)
        }
    })
    return (
        <Layout>
            <Seo title="Comparte" description="Comparte la Escuela Sabática" />
            <div className="flex justify-center items-center h-full">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Layout>
    )
}

export default CompartePage
