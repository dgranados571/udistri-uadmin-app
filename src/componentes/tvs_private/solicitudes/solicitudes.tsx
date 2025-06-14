import { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import ListaSolicitudes from './listaSolicitudes'
import DetalleSolicitud from './detalleSolicitud'
import { IGenericResponse, ISolicitudesProps } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'
import { Paginador } from '../../tvs/paginacion/paginador'
import FitrosSolicitudes from './fitrosSolicitudes'

const Solicitudes: React.FC<ISolicitudesProps> = ({ toast, setCargando, zonaConsulta }) => {

    const [redirectSolicitudes, setRedirectSolicitudes] = useState('LISTA_SOLICITUDES')
    const [idDetalleSolicitud, setIdDetalleSolicitud] = useState('')

    const [paginacionSolicitudes, setPaginacionSolicitudes] = useState(
        { totalElementos: '', elementosPorPagina: '20', paginaActual: '1' }
    );

    const [executeConsultaSolicitudes, setExecuteConsultaSolicitudes] = useState(true)

    useEffect(() => {
        consultaInformacionSolicitudesApp();
    }, [executeConsultaSolicitudes])

    const [faseFiltro, setFaseFiltro] = useState('INITIAL')
    const [eventoFiltro, setEventoFiltro] = useState('INITIAL')
    const [nombreFiltro, setNombreFiltro] = useState('')
    const [departamentoFiltro, setDepartamentoFiltro] = useState('INITIAL');
    const [municipioFiltro, setMunicipioFiltro] = useState('INITIAL');
    const [diasUltimaActualizacionFiltro, setDiasUltimaActualizacionFiltro] = useState('INITIAL');

    const [solicitudesList, setSolicitudesList] = useState<any[]>([])

    const consultaInformacionSolicitudesApp = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "elementosPorPagina": paginacionSolicitudes.elementosPorPagina,
                "paginaActual": paginacionSolicitudes.paginaActual,
                "faseFiltro": faseFiltro,
                "eventoFiltro": eventoFiltro,
                "nombreFiltro": nombreFiltro.trim(),
                "departamentoFiltro": departamentoFiltro,
                "municipioFiltro": municipioFiltro,
                "diasUltimaActualizacionFiltro": diasUltimaActualizacionFiltro
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 8);
                setSolicitudesList(response.objeto.listaSolicitudesAppDto)
                setPaginacionSolicitudes({
                    ...paginacionSolicitudes,
                    totalElementos: response.objeto.totalElementos
                })
                if (!response.estado) {
                    toast(response.mensaje)
                }
                setCargando(false)
            } catch (error) {
                toast('No es posible consultar la información, contacte al administrador')
                setCargando(false)
            }
        } else {
            toast('No es posible consultar la información, contacte al administrador')
        }
    }

    const descargarExcel = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "elementosPorPagina": paginacionSolicitudes.elementosPorPagina,
                "paginaActual": paginacionSolicitudes.paginaActual,
                "faseFiltro": faseFiltro,
                "eventoFiltro": eventoFiltro,
                "nombreFiltro": nombreFiltro.trim(),
                "departamentoFiltro": departamentoFiltro,
                "municipioFiltro": municipioFiltro,
                "diasUltimaActualizacionFiltro": diasUltimaActualizacionFiltro
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 28);
                if (response.estado) {
                    const hoja = XLSX.utils.aoa_to_sheet(response.objeto);
                    const libro = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(libro, hoja, "Solicitudes");
                    XLSX.writeFile(libro, "datos.xlsx");
                } else {
                    toast(response.mensaje)
                }
                setCargando(false)
            } catch (error) {
                toast('No es posible consultar la información, contacte al administrador')
                setCargando(false)
            }
        } else {
            toast('No es posible consultar la información, contacte al administrador')
        }
    }

    const validateRedirectSolcitudes = () => {
        switch (redirectSolicitudes) {
            case 'LISTA_SOLICITUDES':
                return (
                    <>
                        <div className='div-style-form'>
                            <FitrosSolicitudes toast={toast} setCargando={setCargando} setFaseFiltro={setFaseFiltro} faseFiltro={faseFiltro}
                                setEventoFiltro={setEventoFiltro} setNombreFiltro={setNombreFiltro} setDepartamentoFiltro={setDepartamentoFiltro}
                                setMunicipioFiltro={setMunicipioFiltro} setDiasUltimaActualizacionFiltro={setDiasUltimaActualizacionFiltro}
                                eventoFiltro={eventoFiltro} nombreFiltro={nombreFiltro} departamentoFiltro={departamentoFiltro} municipioFiltro={municipioFiltro}
                                diasUltimaActualizacionFiltro={diasUltimaActualizacionFiltro}
                                setExecuteConsultaSolicitudes={setExecuteConsultaSolicitudes} executeConsultaSolicitudes={executeConsultaSolicitudes}
                            />
                        </div>
                        <div className='div-style-form mt-3'>
                            <ListaSolicitudes toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} setIdDetalleSolicitud={setIdDetalleSolicitud}
                                zonaConsulta={zonaConsulta} solicitudesList={solicitudesList} descargarExcel={descargarExcel}
                                setExecuteConsultaSolicitudes={setExecuteConsultaSolicitudes} executeConsultaSolicitudes={executeConsultaSolicitudes} />
                            <div className="row ">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" ></div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                                    <Paginador elementsPaginacion={paginacionSolicitudes} setElementsPaginacion={setPaginacionSolicitudes}
                                        setExecuteConsultaSolicitudes={setExecuteConsultaSolicitudes} executeConsultaSolicitudes={executeConsultaSolicitudes} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <p className="p-info-elementos-paginador">Total elementos {paginacionSolicitudes.totalElementos} </p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'DETALLE_SOLICITUD':
                return (
                    <>
                        <div className='div-style-form'>
                            <DetalleSolicitud toast={toast} setCargando={setCargando} setRedirectSolicitudes={setRedirectSolicitudes} idDetalleSolicitud={idDetalleSolicitud}
                                zonaConsulta={zonaConsulta}
                                setExecuteConsultaSolicitudes={setExecuteConsultaSolicitudes} executeConsultaSolicitudes={executeConsultaSolicitudes}
                            />
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