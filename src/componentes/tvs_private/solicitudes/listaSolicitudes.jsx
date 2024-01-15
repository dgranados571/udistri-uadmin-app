import React, { useEffect, useState } from 'react'
import { UtilUrl } from '../../../utilUrl';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Paginador } from '../../tvs/paginacion/paginador';

const ListaSolicitudes = ({ toast, setCargando, setRedirectSolicitudes, setDetalleSolicitud }) => {

    const { urlEntorno } = UtilUrl();

    const [solicitudesList, setSolicitudesList] = useState([])

    const [paginacionSolicitudes, setPaginacionSolicitudes] = useState(
        { totalElementos: '', elementosPorPagina: '10', paginaActual: '1' }
    );

    useEffect(() => {
        consultaInformacionSolicitudesApp()
    }, [paginacionSolicitudes.paginaActual])

    const detalleSolicitud = (solicitud) => {
        setDetalleSolicitud(solicitud)
        setRedirectSolicitudes('DETALLE_SOLICITUD')
    }

    const consultaInformacionSolicitudesApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
            setCargando(true)
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "elementosPorPagina": paginacionSolicitudes.elementosPorPagina,
                "paginaActual": paginacionSolicitudes.paginaActual,
            }
            await axios.post(`${urlEntorno}/service/uadmin/getSolicitudesApp`, body)
                .then((response) => {
                    setSolicitudesList(response.data.objeto.listaSolicitudesApp)
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

    return (
        <>
            <div className='div-style-form'>
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
                                            <p className=''>{solicitud.id_procesamiento}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''>{solicitud.fecha_registro}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''>{solicitud.nombres} {solicitud.apellidos}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''>{solicitud.dependencia}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''> {solicitud.estado} </p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''> {solicitud.descripcion} </p>
                                        </td>
                                        <td className='td-info'>
                                            <div className='div-icons-table'>
                                                <button className='btn btn-link' onClick={() => detalleSolicitud(solicitud)}>
                                                    <FontAwesomeIcon className='icons-table' icon={faPenToSquare} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="row ">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3" ></div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                        <Paginador elementsPaginacion={paginacionSolicitudes} setElementsPaginacion={setPaginacionSolicitudes} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3" ></div>
                </div>
            </div>
        </>
    )
}

export default ListaSolicitudes