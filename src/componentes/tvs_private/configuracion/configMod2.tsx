import React, { useState } from 'react'
import { IConfiguracionProps } from '../../../models/IProps'

const ConfigMod2: React.FC<IConfiguracionProps> = ({ toast, setCargando }) => {

    const eventosNotificacion = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_PREAPROBADO', label: 'Preaprobado' },
        { value: 'EVENTO_NO_PREAPROBADO', label: 'No preaprobado' },
        { value: 'EVENTO_DEVUELTO_GESTION', label: 'Devuelto con observación' },
        { value: 'EVENTO_ASIGNA_A_REVISION', label: 'Asignado a revisión' }
    ]

    const [correosNotificacion, setCorreosNotificacion] = useState('')
    const [eventoNotificacion, setEventoNotificacion] = useState('')
    const [eventoNotificacionRef, setEventoNotificacionRef] = useState(false)

    const [activaEnvioCliente, setActivaEnvioCliente] = useState(false)

    return (
        <>
            <hr />
            <h4>Configuración de notificación:</h4>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Evento a notificar: </p>
                        <select value={eventoNotificacion} onChange={(e) => setEventoNotificacion(e.target.value)} className={eventoNotificacionRef ? 'form-control form-control-error' : 'form-control'} >
                            {
                                eventosNotificacion.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className="div-notifica-cliente">
                        <p className='p-label-form my-3'>Agregar notificación al solicitante?:</p>
                        <div className={activaEnvioCliente ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => setActivaEnvioCliente(!activaEnvioCliente)} >
                            <div className={activaEnvioCliente ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
                        </div>
                    </div>

                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <div className='div-form'>
                            <p className='p-label-form'>Agregue los correos a los que desea notificar separado por coma ','</p>
                            <textarea className='form-control' value={correosNotificacion}
                                onChange={(e) => setCorreosNotificacion(e.target.value)}
                                autoComplete='off'
                                placeholder='ej: correo1@gmail.com, correo2@gmail.com' />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                    <div className='div-bottom-custom'>
                        <button className='btn btn-primary bottom-custom' onClick={() => { }} >Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfigMod2