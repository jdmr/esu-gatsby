import React, { useEffect } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import useFirebase from '../components/useFirebase'
import { doc, getDoc } from 'firebase/firestore/lite'
import { navigate } from 'gatsby'

const EstudiaPage = () => {
    const { firebase, firestore } = useFirebase()
    useEffect(async () => {
        if (!firebase) return
        try {
            let d = new Date()
            d.getDay() === 6 && d.getHours() < 12 && d.setDate(d.getDate() - 1)
            let ds = ''
            ds += d.getFullYear()
            d.getMonth() + 1 < 10
                ? (ds += '0' + (d.getMonth() + 1))
                : (ds += d.getMonth() + 1)
            d.getDate() < 10 ? (ds += '0' + d.getDate()) : (ds += d.getDate())
            const dia = await getDoc(doc(firestore, '/dias/' + ds))
            if (!dia.exists) {
                return alert('No pude encontrar el dia')
            }
            const x = dia.data()
            navigate(`/estudia/${x.AO}/${x.TR}/${x.LC}/${x.DA}`)
        } catch (err) {
            console.error('Could not get url: ', err)
        }
    })
    return (
        <Layout>
            <Seo title="Estudia" description="Estudia la Escuela Sabática" />
            <div className="flex justify-center items-center h-full">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Layout>
    )
}

export default EstudiaPage
