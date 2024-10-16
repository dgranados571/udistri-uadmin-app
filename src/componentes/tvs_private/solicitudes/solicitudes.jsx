import { useState } from 'react'
import ListaSolicitudes from './listaSolicitudes'
import DetalleSolicitud from './detalleSolicitud'

const Solicitudes = ({ toast, setCargando, zonaConsulta }) => {

    const [redirectSolicitudes, setRedirectSolicitudes] = useState('LISTA_SOLICITUDES')
    const [detalleSolicitud, setDetalleSolicitud] = useState('')

    const validateRedirectSolcitudes = () => {
        switch (redirectSolicitudes) {
            case 'LISTA_SOLICITUDES':
                return (
                    <>
                        <div className='div-style-form'>
                            <div className='div-titulo-component'>
                                <h3 className='titulo-form'>Solicitudes de aplicación</h3>
                            </div>
                        </div>
                        <ListaSolicitudes toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} setDetalleSolicitud={setDetalleSolicitud} zonaConsulta= {zonaConsulta} />
                    </>
                )
            case 'DETALLE_SOLICITUD':
                return (
                    <>
                        <DetalleSolicitud toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} idDetalleSolicitud={detalleSolicitud} />
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
            {
                validateRedirectSolcitudes()
            }
        </>
    )
}

export default Solicitudes