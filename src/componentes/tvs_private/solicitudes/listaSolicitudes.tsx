import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Paginador } from '../../tvs/paginacion/paginador';
import Modal from '../../tvs/modal/modal';
import { IGenericResponse, IListaSolicitudesProps, IlPropsModal } from '../../../models/IProps';
import { AuthServices } from '../../services/authServices';

const ListaSolicitudes: React.FC<IListaSolicitudesProps> = ({ toast, setCargando, setRedirectSolicitudes, setIdDetalleSolicitud, zonaConsulta }) => {

    const rolesPermitenEliminar = ['USUARIO_ROOT', 'USUARIO_ROLE_ADMIN']
    const [showBotomElimina, setShowBotomElimina] = useState(false);

    const [modalOpen, setModalOpen] = useState(false)
    const [propsModal, setPropsModal] = useState<IlPropsModal>({
        titulo: '',
        descripcion: '',
    })

    const [solicitudesList, setSolicitudesList] = useState<any[]>([])

    const [paginacionSolicitudes, setPaginacionSolicitudes] = useState(
        { totalElementos: '', elementosPorPagina: '10', paginaActual: '1' }
    );

    const [idSolicitudEliminar, setIdSolicitudEliminar] = useState('')

    useEffect(() => {
        if (rolesPermitenEliminar.includes(zonaConsulta)) {
            setShowBotomElimina(true)
        }
        consultaInformacionSolicitudesApp();
    }, [paginacionSolicitudes.paginaActual])

    const detalleSolicitud = (idSolicitud: string) => {
        setIdDetalleSolicitud(idSolicitud)
        setRedirectSolicitudes('DETALLE_SOLICITUD')
    }

    const eliminarSolicitud = (idSolicitud: string) => {
        setModalOpen(true)
        setIdSolicitudEliminar(idSolicitud)
        setPropsModal({
            titulo: 'Eliminar solicitud',
            descripcion: `Esta seguro de eliminar la solicitud: ${idSolicitud} ?`
        })
    }

    const eliminarSolicitudService = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "idProcesamiento": idSolicitudEliminar,
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 11);
                consultaInformacionSolicitudesApp()
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
        eliminarSolicitudService()
    }

    const modalNo = () => {
        setModalOpen(false)
        setIdSolicitudEliminar('')
    }

    return (
        <>
            <div className='mt-3'>
                {
                    solicitudesList.length > 0 ?
                        <>
                            <div className='div-style-form-whit-table'>
                                <table className='table-info'>
                                    <thead>
                                        <tr>
                                            <td className='td-info'>
                                                <p className='p-label-form'> Fecha de radicación </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>No. identificación </p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Nombre</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Estado</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='p-label-form'>Acciones</p>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            solicitudesList.map((solicitud, key) => {
                                                return (
                                                    <tr key={key} className='tr-tablet'>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.fecha_registro}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.numero_identificacion}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''>{solicitud.solicitud.nombres} {solicitud.solicitud.apellidos}</p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <p className=''> {solicitud.solicitud.estado} </p>
                                                        </td>
                                                        <td className='td-info'>
                                                            <div className='d-flex'>
                                                                <button className='btn btn-link bottom-custom-link' onClick={() => detalleSolicitud(solicitud.solicitud.id_procesamiento)}>
                                                                    <FontAwesomeIcon className='icons-table-ds' icon={faEye} /><p className='margin-icons'>Ver</p>
                                                                </button>                                                                
                                                                {
                                                                    showBotomElimina ?
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
                    <Modal tipoModal='MODAL_CONTROL_2' modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }
        </>
    )
}

export default ListaSolicitudes