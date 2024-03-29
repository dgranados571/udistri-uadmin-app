import React, { useState } from 'react'
import HeaderUnal from '../tvs/header_unal/headerUnal'
import RadicaSolicitud from './radicaSolicitud'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ZonePublic = () => {

  const [cargando, setCargando] = useState(false)

  return (
    <>
      <ToastContainer autoClose={4000} hideProgressBar={true} />
      <HeaderUnal />
      <div className='div-registra-sol-component'>
        <RadicaSolicitud toast={toast} setCargando={setCargando} />
      </div>
      {
        cargando ?
          <Cargando />
          :
          <></>
      }
    </>
  )
}

export default ZonePublic