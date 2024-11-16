import React from 'react'
import { IDetalleInfoSolicitudProps } from '../../../models/IProps'

const DetalleInfoSolicitud: React.FC<IDetalleInfoSolicitudProps> = ({toast, setCargando, idDetalleSolicitud, solicitud, zonaConsulta }) => {
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
            <div className="col-12 col-sm-12 col-md-6 col-lg-8" >
                <div className='div-form'>
                    <p className='p-label-form'> Observaciones: </p>
                    <p> {solicitud.descripcion} </p>
                </div>
            </div>
        </div>
    )
}

export default DetalleInfoSolicitud