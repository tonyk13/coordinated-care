import React from 'react'
import heartlogo from '../c.c_components/img/Heart_Rate.png'
import '../stylesheets/App.css'

export default function Topbanner() {
  return (
    <>
    <div className='topbanner'>
    <img src={heartlogo} className='heartlogo' />
        <h2 className='banner-app-name'>Coordinated Care</h2> 

    </div>
    </>
  )
}