import React, { useState } from 'react'
import { IGenericResponse, IGestionSolicitudProps } from '../../../models/IProps';
import { AuthServices } from '../../services/authServices';

const GestionSolicitud: React.FC<IGestionSolicitudProps> = ({ toast, setCargando, useSelect, idDetalleSolicitud, setRedirectSolicitudes,
    setExecuteConsultaSolicitudes, executeConsultaSolicitudes
 }) => {

    const [valueSelected, setValueSelected] = useState('INITIAL');
    const [valueSelectedRef, setValueSelectedRef] = useState(false);

    const [observacion, setObservacion] = useState('');

    const list0 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_ASIGNA_A_REVISION', label: 'Asignar a revisor documental' }
    ]

    const list1 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_PREAPROBADO', label: 'Preaprobado' },
        { value: 'EVENTO_NO_PREAPROBADO', label: 'No Preaprobado' },
        { value: 'EVENTO_DEVUELTO_GESTION_CREADOR_SOLICITUD', label: 'Devolución a gestor - creador solicitud' }
    ]

    const list2 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_ESTUDIO_VIABILIDAD', label: 'Viable técnicamente' },
        { value: 'EVENTO_DEVUELTO_GESTION', label: 'Devolución a gestor' },
        { value: 'EVENTO_NO_APROBADO', label: 'No aprobado' }
    ]

    const list3 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_FACTIBLE_ACTUALIZACION', label: 'Factible para actualización' },
        { value: 'EVENTO_DEVUELTO_GESTION', label: 'Devolución a gestor' },
        { value: 'EVENTO_NO_APROBADO', label: 'No aprobado' }
    ]

    const list4 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_LICENCIAR', label: 'Licenciar' },
        { value: 'EVENTO_NO_APROBADO', label: 'No aprobado' }
    ]

    const list5 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_LICENCIA_SUBSIDIO', label: 'Licencia y subsidio' }
    ]
    
    const list6 = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'EVENTO_VO_BO_SUBSIDIO', label: 'Vo-Bo Subsidio' },
        { value: 'EVENTO_DEVUELTO_GESTION', label: 'Devolución a gestor' },
        { value: 'EVENTO_NO_APROBADO', label: 'No aprobado' }
    ]

    const ejecutaEventoEstadoActon = () => {
        let formValidado = [];
        setValueSelectedRef(false)
        if (valueSelected === 'INITIAL') {
            formValidado.push('valueSelected');
            setValueSelectedRef(true)
        }

        if (formValidado.length === 0) {
            ejecutaEventoEstadoService()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario, valide la información')
        }
    }

    const ejecutaEventoEstadoService = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "idProcesamiento": idDetalleSolicitud,
                "userApp": usuarioLocalStorage.usuario,
                "nombreOperacion": valueSelected,
                "observaciones": observacion
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 18);
                setExecuteConsultaSolicitudes(!executeConsultaSolicitudes)
                if (response.estado) {
                    setRedirectSolicitudes('LISTA_SOLICITUDES')
                }
                toast(response.mensaje);
                setCargando(false);
            } catch (error) {
                toast('No es posible consultar la información, contacte al administrador');
                setCargando(false);
            }
        } else {
            toast('No es posible consultar la información, contacte al administrador')
        }
    }

    const validateSelected = () => {
        switch (useSelect) {
            case 'MODULO_0':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list0.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_1':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list1.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_2':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list2.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_3':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list3.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_4':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list4.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_5':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list5.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_6':
                return (
                    <>
                        <hr />
                        <h4> Que puedo hacer con la solicitud? </h4>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        {
                                            list6.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value.toUpperCase())} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' onClick={() => ejecutaEventoEstadoActon()} >Enviar</button>
                                </div>
                            </div>
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
                validateSelected()
            }
        </>
    )
}

export default GestionSolicitud