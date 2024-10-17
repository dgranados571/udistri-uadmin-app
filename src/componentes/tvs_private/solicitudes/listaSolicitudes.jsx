import React, { useEffect, useState } from 'react'
import { UtilUrl } from '../../services/utilUrl';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Paginador } from '../../tvs/paginacion/paginador';
import Modal from '../../tvs/modal/modal';

const ListaSolicitudes = ({ toast, setCargando, setRedirectSolicitudes, setDetalleSolicitud, zonaConsulta }) => {

    const { url, apiLambda } = UtilUrl();

    const [modal, setModal] = useState(false)
    const [propsModal, setPropsModal] = useState({})

    const [solicitudesList, setSolicitudesList] = useState([])

    const [paginacionSolicitudes, setPaginacionSolicitudes] = useState(
        { totalElementos: '', elementosPorPagina: '10', paginaActual: '1' }
    );

    const [idSolicitudEliminar, setIdSolicitudEliminar] = useState('')

    useEffect(() => {
        solicitudesPorZonaConsulta()
    }, [paginacionSolicitudes.paginaActual])

    const detalleSolicitud = (idSolicitud) => {
        setDetalleSolicitud(idSolicitud)
        setRedirectSolicitudes('DETALLE_SOLICITUD')
    }

    const solicitudesPorZonaConsulta = () => {
        switch (zonaConsulta) {
            case 'ROOT':
                consultaInformacionSolicitudesApp();
                break
            case 'ZoneJefeDependencia':
                consultaInformacionSolicitudesApp();
                break
            case 'ZonePrecontractual':
                consultaInformacionSolicitudesPorZonaApp('ASIGNA_USUARIO_PRECONTRACTUAL');
                break
            case 'ZonePresupuesto':
                consultaInformacionSolicitudesPorZonaApp('ASIGNA_USUARIO_PRESUPUESTO');
                break
            case 'ZoneContractual':
                consultaInformacionSolicitudesPorZonaApp('ASIGNA_USUARIO_CONTRACTUAL');
                break
            default:
                break
        }
    }

    const eliminarSolicitud = (idSolicitud) => {
        setModal(true)
        setIdSolicitudEliminar(idSolicitud)
        setPropsModal({
            titulo: 'Eliminar solicitud',
            descripcion: 'Esta seguro de eliminar la solicitud: ' + idSolicitud
        })
    }

    const eliminarSolicitudAction = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
            setCargando(true);
            const f = new FormData();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "idProcesamiento": idSolicitudEliminar,
            }
            let urlRq;
            let headers;
            if (apiLambda) {
                headers = {
                    'Content-Type': 'multipart/form-data'
                }
                f.append('body', JSON.stringify(body))
                f.append('urlPath', url[17].pathLambda)
                urlRq = `${url[17].urlEntornoLambda}`;
            } else {
                headers = {
                    'Content-Type': 'application/json'
                }
                urlRq = `${url[17].urlEntornoLocal}${url[17].pathLambda}`;
            }
            const rqBody = apiLambda ? f : body;
            await axios.post(`${urlRq}`, rqBody, {
                headers
            }).then((response) => {
                setTimeout(() => {
                    solicitudesPorZonaConsulta()
                    toast(response.data.mensaje)
                    setCargando(false)
                }, 250)
            }).catch(() => {
                setTimeout(() => {
                    toast('No es posible eliminar la solicitud, contacte al administrador')
                    setCargando(false)
                }, 250)
            })
        } else {
            toast('No es posible eliminar la solicitud, contacte al administrador')
        }
    }

    const consultaInformacionSolicitudesPorZonaApp = async (nombreOperacion) => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
            setCargando(true);
            const f = new FormData();
            const body = {
                "nombreOperacion": nombreOperacion,
                "resultadoOperacion": usuarioLocalStorage.usuario
            }
            let urlRq;
            let headers;
            if (apiLambda) {
                headers = {
                    'Content-Type': 'multipart/form-data'
                }
                f.append('body', JSON.stringify(body))
                f.append('urlPath', url[9].pathLambda)
                urlRq = `${url[9].urlEntornoLambda}`;
            } else {
                headers = {
                    'Content-Type': 'application/json'
                }
                urlRq = `${url[9].urlEntornoLocal}${url[9].pathLambda}`;
            }
            const rqBody = apiLambda ? f : body;
            await axios.post(`${urlRq}`, rqBody, {
                headers
            }).then((response) => {
                setSolicitudesList(response.data.objeto.listaSolicitudesAppDto)
                setPaginacionSolicitudes({
                    ...paginacionSolicitudes,
                    totalElementos: response.data.objeto.totalElementos
                })
                if (!response.data.estado) {
                    toast(response.data.mensaje)
                }
                setCargando(false)
            }).catch(() => {
                setTimeout(() => {
                    toast('No es posible consultar la información, contacte al administrador')
                    setCargando(false)
                }, 250)
            })
        } else {
            toast('No es posible consultar la información, contacte al administrador')
        }
    }

    const consultaInformacionSolicitudesApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
            setCargando(true)
            const f = new FormData();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "elementosPorPagina": paginacionSolicitudes.elementosPorPagina,
                "paginaActual": paginacionSolicitudes.paginaActual,
            }
            let urlRq;
            let headers;
            if (apiLambda) {
                headers = {
                    'Content-Type': 'multipart/form-data'
                }
                f.append('body', JSON.stringify(body))
                f.append('urlPath', url[8].pathLambda)
                urlRq = `${url[8].urlEntornoLambda}`;
            } else {
                headers = {
                    'Content-Type': 'application/json'
                }
                urlRq = `${url[8].urlEntornoLocal}${url[8].pathLambda}`;
            }
            const rqBody = apiLambda ? f : body;
            await axios.post(`${urlRq}`, rqBody, {
                headers
            }).then((response) => {
                setSolicitudesList(response.data.objeto.listaSolicitudesAppDto)
                setPaginacionSolicitudes({
                    ...paginacionSolicitudes,
                    totalElementos: response.data.objeto.totalElementos
                })
                if (!response.data.estado) {
                    toast(response.data.mensaje)
                }
                setCargando(false)
            }).catch(() => {
                setTimeout(() => {
                    toast('No es posible consultar la información, contacte al administrador')
                    setCargando(false)
                }, 250)
            })
        } else {
            toast('No es posible consultar la información, contacte al administrador')
        }
    }

    const modalSi = () => {
        setModal(false)
        eliminarSolicitudAction()
    }

    const modalNo = () => {
        setModal(false)
    }

    return (
        <>
            <div className='div-style-form'>
                {
                    solicitudesList.length > 0 ?
                        <>
                            <div className='div-style-form-whit-table'>
                                <table className='table-info'>
                                    <thead>
                                        <tr>
                                            <td className='td-info'>
                                                <p className='p-label-form'> ID Solictud </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'> Fecha de radicación </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'> Nombre </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'> Dependencia </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'> Estado </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'> Descripción </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>  Acciones </p>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            solicitudesList.map((solicitud) => {
                                                return (
                                                    <tr className='tr-tablet'>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.id_procesamiento}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.fecha_registro}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.nombres} {solicitud.solicitud.apellidos}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.dependencia}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {solicitud.solicitud.estado} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {solicitud.solicitud.descripcion} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <div className='div-icons-table'>
                                                                <button className='btn btn-link' onClick={() => detalleSolicitud(solicitud.solicitud.id_procesamiento)}>
                                                                    <FontAwesomeIcon className='icons-table' icon={faPenToSquare} />
                                                                </button>
                                                                {
                                                                    zonaConsulta === 'ROOT' ?
                                                                        <button className='btn btn-link' onClick={() => eliminarSolicitud(solicitud.solicitud.id_procesamiento)}>
                                                                            <FontAwesomeIcon className='icons-table' icon={faTrash} />
                                                                        </button>
                                                                        :
                                                                        <></>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row ">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" ></div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                                    <Paginador elementsPaginacion={paginacionSolicitudes} setElementsPaginacion={setPaginacionSolicitudes} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" ></div>
                            </div>
                        </>
                        :
                        <p className=''>No hay información</p>
                }
            </div>
            {
                modal ?
                    <Modal modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }
        </>
    )
}

export default ListaSolicitudes