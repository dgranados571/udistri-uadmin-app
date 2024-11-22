import React, { useEffect, useState } from 'react'
import { IConfiguracionProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

const ConfigMod2: React.FC<IConfiguracionProps> = ({ toast, setCargando }) => {

    useEffect(() => {

    }, [])

    const listNotificacion = [
        {
            nombreEvento: 'EVENTO_PREAPROBADO',
            notificaUsuario: false,
            correosNotifica: 'ej: correo1@gmail.com, correo2@gmail.com'

        },
        {
            nombreEvento: 'EVENTO_NO_PREAPROBADO',
            notificaUsuario: true,
            correosNotifica: 'ej: correo1@gmail.com, correo2@gmail.com'

        },
        {
            nombreEvento: 'EVENTO_DEVUELTO_GESTION',
            notificaUsuario: true,
            correosNotifica: 'ej: correo1@gmail.com, correo2@gmail.com'

        },
    ]

    const [activaEdicionCorreos, setActivaEdicionCorreos] = useState(false)
    const [correosNotificacion, setCorreosNotificacion] = useState('')
    const [activaEnvioCliente, setActivaEnvioCliente] = useState(false)

    return (
        <>
            <hr />

            <div className='div-edita-notificacion'>
                <h4>Configuración de notificación:</h4>
                {
                    activaEdicionCorreos ?
                        <></>
                        :
                        <button className='btn btn-link bottom-custom-link' onClick={() => { setActivaEdicionCorreos(true) }} >
                            <FontAwesomeIcon className='icons-table-ds' icon={faPenToSquare} /><p className='margin-icons'>Editar</p>
                        </button>
                }

            </div>
            <p className='mb-2'>Las notificaciones por correo electrónico se configuran de acuerdo con los eventos operativos de cada solicitud **:</p>

            <div className="row">
                {
                    listNotificacion.map((key, i) => {
                        return (
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-3" >
                                <p className='p-label-menu-configura'>{key.nombreEvento}</p>
                                <div className="div-notifica-cliente">
                                    {
                                        activaEdicionCorreos ?
                                            <>
                                                {
                                                    key.notificaUsuario ?
                                                        <>
                                                            <p className='p-label-form my-0'>Desactivar notificación al solicitante?:</p>
                                                            <div className={key.notificaUsuario ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => setActivaEnvioCliente(!activaEnvioCliente)} >
                                                                <div className={key.notificaUsuario ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <p className='p-label-form my-0'>Activar notificación al solicitante?:</p>
                                                            <div className={key.notificaUsuario ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => setActivaEnvioCliente(!activaEnvioCliente)} >
                                                                <div className={key.notificaUsuario ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
                                                            </div>
                                                        </>
                                                }
                                            </>
                                            :
                                            <>
                                                <p className='p-label-form my-0'>Notifica al solicitante?:</p>
                                                {
                                                    key.notificaUsuario ?
                                                        <div className='div-icon-informacion-notifica'>
                                                            <p className='mx-2'>Si</p>
                                                            <FontAwesomeIcon className='icon-notifica-si' icon={faCheckCircle} />
                                                        </div>
                                                        :
                                                        <div className='div-icon-informacion-notifica'>
                                                            <p className='mx-2'>No</p>
                                                            <FontAwesomeIcon className='icon-notifica-no' icon={faXmarkCircle} />
                                                        </div>
                                                }
                                            </>
                                    }
                                </div>
                                <div className='div-form mt-3'>
                                    {
                                        activaEdicionCorreos ?
                                            <textarea className='form-control' value={correosNotificacion}
                                                onChange={(e) => setCorreosNotificacion(e.target.value)}
                                                autoComplete='off' />
                                            :
                                            <textarea className='form-control' value={correosNotificacion} disabled
                                                onChange={(e) => setCorreosNotificacion(e.target.value)}
                                                autoComplete='off' />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <div className='div-bottom-custom'>
                        {
                            activaEdicionCorreos ?
                                <div className="d-flex mb-4">
                                    <button className='btn btn-primary bottom-custom' onClick={() => { }} >Guardar</button>
                                    <button className='btn btn-secondary bottom-custom-secondary' onClick={() => setActivaEdicionCorreos(false)} >Cancelar</button>                                    
                                </div>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            <p className='p-label-form-text my-0'>** Agregue los correos a los que desea notificar separado por coma ','</p>
            <p className='p-label-form-text my-0'>** Ej: correo1@gmail.com,correo2@gmail.com</p>
        </>
    )
}

export default ConfigMod2