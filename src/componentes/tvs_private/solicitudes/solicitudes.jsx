import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import './solicitudes.css'
import ListaSolicitudes from './listaSolicitudes'
import DetalleSolicitud from './detalleSolicitud'

const Solicitudes = ({ toast, setCargando }) => {

    const [redirectSolicitudes, setRedirectSolicitudes] = useState('LISTA_SOLICITUDES')
    const [detalleSolicitud, setDetalleSolicitud] = useState({})

    const validateRedirectSolcitudes = () => {
        switch (redirectSolicitudes) {
            case 'LISTA_SOLICITUDES':
                return (
                    <>
                        <ListaSolicitudes toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} setDetalleSolicitud={setDetalleSolicitud} />
                    </>
                )
            case 'DETALLE_SOLICITUD':
                return (
                    <>
                        <DetalleSolicitud toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} detalleSolicitud={detalleSolicitud} />
                    </>
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <div className='div-style-form'>
                <div className='div-titulo-component'>
                    <h3 className='titulo-form'>Solicitudes App</h3>
                    {
                        redirectSolicitudes === 'DETALLE_SOLICITUD' ?
                            <button className='btn btn-link bottom-custom-link' onClick={() => setRedirectSolicitudes('LISTA_SOLICITUDES')}>
                                <FontAwesomeIcon className='icons-table' icon={faRotateLeft} /> <p className='p-label-bottom-custom-link'>Volver</p>
                            </button>
                            :
                            <></>

                    }
                </div>
            </div>
            {
                validateRedirectSolcitudes()
            }
        </>
    )
}

export default Solicitudes