import React, { useEffect, useState } from 'react'
import { IDetalleInfoSolicitudProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const DetalleInfoSolicitud: React.FC<IDetalleInfoSolicitudProps> = ({ idDetalleSolicitud, solicitud, setEditaDetalleSolicitud, zonaConsulta }) => {

    const rolesPermitenEditar = ['USUARIO_ROOT', 'USUARIO_ROLE_ADMIN', 'USUARIO_ROLE_1']
    const [showBotomEdita, setShowBotomEdita] = useState(false);

    useEffect(() => {
        if (rolesPermitenEditar.includes(zonaConsulta)) {
            setShowBotomEdita(true)
        }
    }, [])

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'> ID Solictud: </p>
                    <p> {idDetalleSolicitud} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'> Fecha de radicación: </p>
                    <p> {solicitud.fecha_registro} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'> Nombres: </p>
                    <p> {solicitud.nombres + ' ' + solicitud.apellidos} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'> No. Identificación: </p>
                    <p> {solicitud.numero_identificacion} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'>Correo:</p>
                    <p> {solicitud.correo} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'>Teléfono: </p>
                    <p> {solicitud.telefono} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                <div className='div-form'>
                    <p className='p-label-form'>Matrícula inmobiliaria: </p>
                    <p> {solicitud.matricula_inmobiliaria} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-5" >
                <div className='div-form'>
                    <p className='p-label-form'> Observaciones: </p>
                    <p> {solicitud.descripcion} </p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                {
                    showBotomEdita ?
                        <div className='div-titulo-ds'>
                            <h4 className='titulo-form'></h4>
                            <button className='btn btn-link bottom-custom-link' onClick={() => setEditaDetalleSolicitud(true)} >
                                <FontAwesomeIcon className='icons-table-ds' icon={faPenToSquare} /><p className='margin-icons'>Editar</p>
                            </button>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default DetalleInfoSolicitud