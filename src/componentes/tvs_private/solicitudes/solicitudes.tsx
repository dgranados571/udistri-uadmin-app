import { useState } from 'react'
import ListaSolicitudes from './listaSolicitudes'
import DetalleSolicitud from './detalleSolicitud'
import { ISolicitudesProps } from '../../../models/IProps'

const Solicitudes: React.FC<ISolicitudesProps> = ({ toast, setCargando, zonaConsulta }) => {

    const [redirectSolicitudes, setRedirectSolicitudes] = useState('LISTA_SOLICITUDES')
    const [idDetalleSolicitud, setIdDetalleSolicitud] = useState('')

    const validateRedirectSolcitudes = () => {
        switch (redirectSolicitudes) {
            case 'LISTA_SOLICITUDES':
                return (
                    <>
                        <div className='div-style-form'>
                            <h4>Solicitudes de aplicación</h4>
                            <ListaSolicitudes toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} setIdDetalleSolicitud={setIdDetalleSolicitud} zonaConsulta={zonaConsulta}></ListaSolicitudes>
                        </div>

                    </>
                )
            case 'DETALLE_SOLICITUD':
                return (
                    <>
                        <div className='div-style-form'>
                            <DetalleSolicitud toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} idDetalleSolicitud={idDetalleSolicitud} zonaConsulta={zonaConsulta}></DetalleSolicitud>
                        </div>
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