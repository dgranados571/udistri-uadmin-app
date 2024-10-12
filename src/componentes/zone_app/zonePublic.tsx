import React, { useState } from 'react'
import RadicaSolicitud from './radicaSolicitud'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ZonePublic = () => {

  const [cargando, setCargando] = useState(false)

  return (
    <>
      <ToastContainer autoClose={4000} hideProgressBar={true} />
      <RadicaSolicitud toast={toast} setCargando={setCargando} />
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