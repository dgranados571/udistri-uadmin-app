import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Paginador } from '../../tvs/paginacion/paginador';
import Modal from '../../tvs/modal/modal';
import { IGenericResponse, IListaSolicitudesProps } from '../../../models/IProps';
import { AuthServices } from '../../services/authServices';

const ListaSolicitudes: React.FC<IListaSolicitudesProps> = ({ toast, setCargando, setRedirectSolicitudes, setIdDetalleSolicitud, zonaConsulta }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [propsModal, setPropsModal] = useState({})

    const [solicitudesList, setSolicitudesList] = useState<any[]>([])

    const [paginacionSolicitudes, setPaginacionSolicitudes] = useState(
        { totalElementos: '', elementosPorPagina: '10', paginaActual: '1' }
    );

    const [idSolicitudEliminar, setIdSolicitudEliminar] = useState('')

    useEffect(() => {
        solicitudesPorZonaConsulta()
    }, [paginacionSolicitudes.paginaActual])

    const detalleSolicitud = (idSolicitud: string) => {
        setIdDetalleSolicitud(idSolicitud)
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
            default:
                break
        }
    }

    const eliminarSolicitud = (idSolicitud: string) => {
        setModalOpen(true)
        setIdSolicitudEliminar(idSolicitud)
        setPropsModal({
            titulo: 'Eliminar solicitud',
            descripcion: 'Esta seguro de eliminar la solicitud: ' + idSolicitud
        })
    }

    const eliminarSolicitudAction = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "idProcesamiento": idSolicitudEliminar,
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 17);
                solicitudesPorZonaConsulta()
                toast(response.mensaje)
                setCargando(false)
            } catch (error) {
                toast('No es posible eliminar la solicitud, contacte al administrador')
                setCargando(false)
            }
        } else {
            toast('No es posible eliminar la solicitud, contacte al administrador')
        }
    }

    const consultaInformacionSolicitudesPorZonaApp = async (nombreOperacion: string) => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "nombreOperacion": nombreOperacion,
                "resultadoOperacion": usuarioLocalStorage.usuario
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 9);
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

    const modalSi = () => {
        setModalOpen(false)
        eliminarSolicitudAction()
    }

    const modalNo = () => {
        setModalOpen(false)
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
                modalOpen ?
                    <Modal tipoModal='MODAL_CONTROL' modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }
        </>
    )
}

export default ListaSolicitudes