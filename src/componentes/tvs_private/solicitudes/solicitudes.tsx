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
                            <div className='div-titulo-component'>
                                <h3 className='titulo-form'>Solicitudes de aplicación</h3>
                            </div>
                        </div>
                        <ListaSolicitudes toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} setIdDetalleSolicitud={setIdDetalleSolicitud} zonaConsulta={zonaConsulta}></ListaSolicitudes>
                    </>
                )
            case 'DETALLE_SOLICITUD':
                return (
                    <>
                        <>DETALLE DE LA SOLICTUD</>
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