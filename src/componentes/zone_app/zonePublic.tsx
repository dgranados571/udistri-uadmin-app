import React, { useState } from 'react'
import RadicaSolicitud from './radicaSolicitud'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoBase64 } from './imgLogo'
import Login from '../login/login';

const ZonePublic = () => {

  const [cargando, setCargando] = useState(false)
  const [menuSelected, setMenuSelected] = useState('REGISTRA_SOLICITUD');
  const [redirect, setRedirect] = useState('USUARIO_LOGIN')

  const controlMenuAction = () => {
    switch (menuSelected) {
      case 'REGISTRA_SOLICITUD':
        return (
          <>
            <button className='btn btn-link a-link-custom-active' onClick={() => setMenuSelected('REGISTRA_SOLICITUD')} >Registrar solicitud</button>
            <button className='btn btn-link a-link-custom' onClick={() => setMenuSelected('GESTIONAR_SOLCITUD')} >Gestionar solicitudes</button>
          </>
        )
      case 'GESTIONAR_SOLCITUD':
        return (
          <>
            <button className='btn btn-link a-link-custom' onClick={() => setMenuSelected('REGISTRA_SOLICITUD')} >Registrar solicitud</button>
            <button className='btn btn-link a-link-custom-active' onClick={() => setMenuSelected('GESTIONAR_SOLCITUD')} >Gestionar solicitudes</button>
          </>
        )
      default:
        break;
    }
  }

  const controlMenu = () => {
    switch (menuSelected) {
      case 'REGISTRA_SOLICITUD':
        return (
          <>
            <RadicaSolicitud toast={toast} setCargando={setCargando} />
          </>
        )
      case 'GESTIONAR_SOLCITUD':
        return (
          <>
            <Login setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
          </>
        )
      default:
        break;
    }
  }

  return (
    <>
      <ToastContainer autoClose={4000} hideProgressBar={true} />
      <div className='div-container'>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
            <div className='div-logo'>
              <img src={logoBase64} alt='logoFranco' className='img-logo-franco-osorio'></img>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
            <div className='div-menu-principal'>
              {
                controlMenuAction()
              }
            </div>
          </div>
        </div>
        {
          controlMenu()
        }
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