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
                            <ListaSolicitudes toast={toast} setCargando={setCargando}
                                setRedirectSolicitudes={setRedirectSolicitudes}
                                setIdDetalleSolicitud={setIdDetalleSolicitud}
                                zonaConsulta={zonaConsulta} />
                    </>
                )
            case 'DETALLE_SOLICITUD':
                return (
                    <>
                        <div className='div-style-form'>
                            <DetalleSolicitud toast={toast} setCargando={setCargando}
                                setRedirectSolicitudes={setRedirectSolicitudes}
                                idDetalleSolicitud={idDetalleSolicitud}
                                zonaConsulta={zonaConsulta} />
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