import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './usuariosApp.css'
import { UtilUrl } from '../../../utilUrl'
import axios from 'axios'
import Modal from '../modal/modal'

const UsuariosApp = ({ toast, setCargando }) => {

    const { urlEntorno } = UtilUrl();
    const [modal, setModal] = useState(false)

    const [userEdita, setUserEdita] = useState({})

    const [usuariosList, setUsuariosList] = useState([])

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [tipoIdentificacion, setTipoIdentificacion] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [correo, setCorreo] = useState('')
    const [role, setRole] = useState('')
    const [usuario, setUsuario] = useState('')

    const nombresRef = useRef('')
    const apellidosRef = useRef('')
    const tipoIdentificacionRef = useRef('')
    const identificacionRef = useRef('')
    const correoRef = useRef('')
    const roleRef = useRef('')
    const usuarioRef = useRef('')

    useEffect(() => {
        consultaInformacionUsuariosApp()
    }, [])

    const tiposDeDocumento = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CC', label: 'Cedula de ciudadania' },
        { value: 'CE', label: 'Cedula de extranjeria' },
        { value: 'NIP', label: 'Número identificación personal' },
        { value: 'NIT', label: 'Número identificación tributaria' },
        { value: 'TI', label: 'Tarjeta identidad' },
        { value: 'PAP', label: 'Pasaporte' },
    ]

    const roles = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'JEFE_DEPENDENCIA_ROLE', label: 'Jefe de dependencia' },
        { value: 'PRECONTRATUAL_ROLE', label: 'Precontractual' },
        { value: 'PRESUPUETO_ROLE', label: 'Presupuesto' },
        { value: 'AFILIACIONES_ROLE', label: 'Afiliaciones' },
        { value: 'CONTRATUAL_ROLE', label: 'Contractual' }
    ]

    const guardaUsuarioAction = () => {
        let formValidado = [];

        nombresRef.current.className = 'form-control'
        if (nombres.length === 0) {
            formValidado.push('Nombres');
            nombresRef.current.className = 'form-control form-control-error';
        }

        apellidosRef.current.className = 'form-control'
        if (apellidos.length === 0) {
            formValidado.push('Apellidos');
            apellidosRef.current.className = 'form-control form-control-error'
        }

        if (tipoIdentificacion.length === 0 || tipoIdentificacion === 'INITIAL') {
            formValidado.push('Tipo identificacion');
        }

        identificacionRef.current.className = 'form-control'
        if (identificacion.length === 0) {
            formValidado.push('identificacion');
            identificacionRef.current.className = 'form-control form-control-error'
        }

        correoRef.current.className = 'form-control'
        if (correo.length === 0) {
            formValidado.push('Correo');
            correoRef.current.className = 'form-control form-control-error'
        }

        if (role.length === 0 || role === 'INITIAL') {
            formValidado.push('Tipo identificacion');
        }

        usuarioRef.current.className = 'form-control'
        if (usuario.length === 0) {
            formValidado.push('Usuario');
            usuarioRef.current.className = 'form-control form-control-error'
        }

        if (formValidado.length === 0) {
            enviaCreacionUsuarioApp()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const resetForm = () => {
        setNombres('')
        setApellidos('')
        tipoIdentificacionRef.current.setValue(tiposDeDocumento[0])
        setIdentificacion('')
        setCorreo('')
        roleRef.current.setValue(roles[0])
        setUsuario('')
    }

    const actualizaContrasenia = (usuario) => {
        setModal(true)
        setUserEdita(usuario)
    }

    const modalSi = () => {
        setModal(false)
        actualizaContraseniaUser()
    }

    const modalNo = () => {
        setModal(false)
        setUserEdita({})
    }

    const actualizaContraseniaUser = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
            setCargando(true)
            const body = {
                "usuarioEdita": userEdita,
                "usuarioApp": usuarioLocalStorage.usuario,
            }
            await axios.post(`${urlEntorno}/service/uadmin/actualizaContraseniaApp`, body)
                .then((response) => {
                    setTimeout(() => {
                        toast(response.data.mensaje)
                        consultaInformacionUsuariosApp()
                        setCargando(false)
                    }, 250)
                }).catch(() => {
                    setTimeout(() => {
                        toast('No es posible actualizar la información, contacte al administrador')
                        setCargando(false)
                    }, 250)
                })
        } else {
            toast('No es posible actualizar la información, contacte al administrador')
        }
    }

    const enviaCreacionUsuarioApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
            setCargando(true)
            const body = {
                "nombres": nombres,
                "apellidos": apellidos,
                "tipoIdentificacion": tipoIdentificacion,
                "identificacion": identificacion,
                "correo": correo,
                "role": role,
                "usuario": usuario.toUpperCase(),
                "fechaRegistro": new Date(),
                "usuarioApp": usuarioLocalStorage.usuario
            }
            await axios.post(`${urlEntorno}/service/uadmin/registroUsuarioApp`, body)
                .then((response) => {
                    setTimeout(() => {
                        setCargando(false)
                        if (response.data.estado) {
                            consultaInformacionUsuariosApp()
                            resetForm()
                        }
                        toast(response.data.mensaje)
                    }, 250)
                }).catch(() => {
                    setTimeout(() => {
                        setCargando(false)
                        toast('No es posible el registro, contacte al administrador')
                    }, 250)
                })
        } else {
            toast('No es posible el registro, contacte al administrador')
        }
    }

    const consultaInformacionUsuariosApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
            setCargando(true)
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
            }
            await axios.post(`${urlEntorno}/service/uadmin/getUsuariosApp`, body)
                .then((response) => {
                    setTimeout(() => {
                        setUsuariosList(response.data.objeto)
                        if (!response.data.estado) {
                            toast(response.data.mensaje)
                        }
                        setCargando(false)
                    }, 250)
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
                <h3 className='titulo-form'>Registro de usuarios aplicación</h3>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Nombres: </p>
                            <input ref={nombresRef} value={nombres} onChange={(e) => setNombres(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Apellidos: </p>
                            <input ref={apellidosRef} value={apellidos} onChange={(e) => setApellidos(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Tipo identificación: </p>
                            <Select ref={tipoIdentificacionRef} options={tiposDeDocumento} onChange={(e) => setTipoIdentificacion(e.value)} placeholder='Seleccione' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Identificación: </p>
                            <input ref={identificacionRef} value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder='' className='form-control' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Correo: </p>
                            <input ref={correoRef} value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder='' className='form-control' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Role: </p>
                            <Select ref={roleRef} options={roles} onChange={(e) => setRole(e.value)} placeholder='Seleccione' />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Usuario: </p>
                            <input ref={usuarioRef} value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' className='form-control' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' onClick={() => guardaUsuarioAction()} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='div-style-form'>
                <table className='table-info'>
                    <thead>
                        <tr>
                            <td className='td-info'><p className='p-label-form'> Nombres </p></td>
                            <td className='td-info'><p className='p-label-form'> Role </p></td>
                            <td className='td-info'><p className='p-label-form'> Estado </p></td>
                            <td className='td-info'><p className='p-label-form'> Usuario APP </p></td>
                            <td className='td-info'><p className='p-label-form'> Contraseña </p></td>
                            <td className='td-info'><p className='p-label-form'> Correo </p></td>
                            <td className='td-info'><p className='p-label-form'> Acciones </p></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuariosList.map((usuario) => {
                                return (
                                    <tr>
                                        <td className='td-info'>
                                            <p>{usuario.nombre} {usuario.apellidos}  </p>
                                        </td>
                                        <td className='td-info'>
                                            <p>{usuario.role}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className='mt-2'>
                                                {
                                                    usuario.usuario_activo ?
                                                        'ACTIVO'
                                                        :
                                                        'PENDIENTE DE ACTIVAR'
                                                }
                                            </p>
                                        </td>
                                        <td className='td-info'>
                                            <p>{usuario.usuario}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p>{usuario.contrasenia}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p>{usuario.correo}</p>
                                        </td>
                                        <td className='td-info d-flex justify-content-around'>
                                            <a title='Reiniciar contraseña'>
                                                <FontAwesomeIcon className='icons-table' icon={faRotateLeft} onClick={() => actualizaContrasenia(usuario)} />
                                            </a>
                                            <a title='Editar usuario'>
                                                <FontAwesomeIcon className='icons-table' icon={faPenToSquare} />
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                modal ?
                    <Modal modalSi={modalSi} modalNo={modalNo} />
                    :
                    <></>
            }
        </>
    )
}

export default UsuariosApp