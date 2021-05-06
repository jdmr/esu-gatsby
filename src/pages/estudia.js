import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const EstudiaPage = () => {
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
