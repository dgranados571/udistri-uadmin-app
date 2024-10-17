import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../tvs/modal/modal'
import { IGenericResponse, IUsuariosAppProps } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'

const UsuariosApp: React.FC<IUsuariosAppProps> = ({ toast, setCargando }) => {

    const [modal, setModal] = useState(false)
    const [propsModal, setPropsModal] = useState({})

    const [modoEditar, setModoEditar] = useState(false)
    const [userEdita, setUserEdita] = useState<any>({})

    const [usuariosList, setUsuariosList] = useState([])

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [tipoIdentificacion, setTipoIdentificacion] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [correo, setCorreo] = useState('')
    const [role, setRole] = useState('')
    const [usuario, setUsuario] = useState('')


    const [nombresRef, setNombresRef] = useState(false)
    const [apellidosRef, setApellidosRef] = useState(false)
    const [tipoIdentificacionRef, setTipoIdentificacionRef] = useState(false)
    const [identificacionRef, setIdentificacionRef] = useState(false)
    const [correoRef, setCorreoRef] = useState(false)
    const [roleRef, setRoleRef] = useState(false)
    const [usuarioRef, setUsuarioRef] = useState(false)

    useEffect(() => {
        consultaInformacionUsuariosApp()
    }, [])

    const modalMensajes = [
        {
            titulo: 'Actualizar constraseña',
            descripcion: 'Esta seguro de actualizar la contraseña del usuario: '
        },
        {
            titulo: 'Actualizar usuario de aplicación',
            descripcion: 'Esta seguro de actualizar la información del usuario: '
        },
    ]

    const tiposDeDocumento = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CC', label: 'Cedula de ciudadania' },
        { value: 'CE', label: 'Cedula de extranjeria' }
    ]

    const roles = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'ROLE_1', label: 'Gestor documental' },
        { value: 'ROLE_2', label: 'Revisor documental' }
    ]

    const guardaUsuarioAction = () => {
        let formValidado = [];
        setNombresRef(false)
        if (nombres.length === 0) {
            formValidado.push('Nombres');
            setNombresRef(true)
        }
        setApellidosRef(false)
        if (apellidos.length === 0) {
            formValidado.push('Apellidos');
            setApellidosRef(true)
        }
        setTipoIdentificacionRef(false)
        if (tipoIdentificacion.length === 0 || tipoIdentificacion === 'INITIAL') {
            formValidado.push('Tipo identificacion');
            setTipoIdentificacionRef(true)
        }
        setIdentificacionRef(false)
        if (identificacion.length === 0) {
            formValidado.push('identificacion');
            setIdentificacionRef(true)
        }
        setCorreoRef(false)
        if (correo.length === 0) {
            formValidado.push('Correo');
            setCorreoRef(true)
        }
        setRoleRef(false)
        if (role.length === 0 || role === 'INITIAL') {
            formValidado.push('Tipo identificacion');
            setRoleRef(true)
        }
        setUsuarioRef(false)
        if (usuario.length === 0) {
            formValidado.push('Usuario');
            setUsuarioRef(true)
        }
        if (formValidado.length === 0) {
            if (modoEditar) {
                modalActualizaUsuario()
            } else {
                enviaCreacionUsuarioApp()
            }
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const resetForm = () => {
        setNombres('')
        setApellidos('')
        setTipoIdentificacion('INITIAL')
        setIdentificacion('')
        setCorreo('')
        setRole('INITIAL')
        setUsuario('')

        setNombresRef(false)
        setApellidosRef(false)
        setIdentificacionRef(false)
        setCorreoRef(false)
        setUsuarioRef(false)
    }

    const actualizaUsuario = (usuario: any) => {
        resetForm()
        setModoEditar(true)
        setUserEdita(usuario)
        setNombres(usuario.nombre)
        setApellidos(usuario.apellidos)
        for (let step = 0; step < tiposDeDocumento.length; step++) {
            if (tiposDeDocumento[step].value === usuario.tipo_identificacion) {
                setTipoIdentificacion(usuario.tipo_identificacion)
                break
            }
        }
        setIdentificacion(usuario.identificacion)
        setCorreo(usuario.correo)
        for (let step = 0; step < roles.length; step++) {
            if (roles[step].value === usuario.role) {
                setRole(usuario.role)
                break
            }
        }
        setUsuario(usuario.usuario)
    }

    const cancelaActualizaUsuario = () => {
        setModoEditar(false)
        setUserEdita({})
        resetForm()
    }

    const actualizaContrasenia = (usuario: any) => {
        modalMensajes[0].descripcion = modalMensajes[0].descripcion + usuario.usuario
        setPropsModal(modalMensajes[0])
        setModal(true)
        setUserEdita(usuario)
    }

    const modalActualizaUsuario = () => {
        modalMensajes[1].descripcion = modalMensajes[1].descripcion + userEdita.usuario
        setPropsModal(modalMensajes[1])
        setModal(true)
    }

    const modalSi = () => {
        setModal(false)
        if (modoEditar) {
            enviaEdicionUsuarioApp()
        } else {
            actualizaContraseniaUser()
        }
    }

    const modalNo = () => {
        setModal(false)
        setUserEdita({})
    }

    const actualizaContraseniaUser = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp') || '')
            const authServices = new AuthServices();
            const body = {
                "usuarioEdita": userEdita,
                "usuarioApp": usuarioLocalStorage.usuario,
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 7);
                setCargando(false);
                if (response.estado) {
                    toast(response.mensaje)
                    consultaInformacionUsuariosApp()
                    setCargando(false)
                }
            } catch (error) {
                toast('No es posible actualizar la información, contacte al administrador')
                setCargando(false)
            }
        } else {
            toast('No es posible actualizar la información, contacte al administrador')
        }
    }

    const enviaCreacionUsuarioApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp') || '')
            const authServices = new AuthServices();
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
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 6);
                setCargando(false);
                if (response.estado) {
                    consultaInformacionUsuariosApp()
                    resetForm()
                }
                toast(response.mensaje)
            } catch (error) {
                setCargando(false)
                toast('No es posible el registro, contacte al administrador')
            }
        } else {
            toast('No es posible el registro, contacte al administrador')
        }
    }

    const enviaEdicionUsuarioApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp') || '')
            const authServices = new AuthServices();
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
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 5);
                setCargando(false);
                if (response.estado) {
                    consultaInformacionUsuariosApp()
                    resetForm()
                    setModoEditar(false)
                }
                toast(response.mensaje)
            } catch (error) {
                setCargando(false)
                toast('No es posible el registro, contacte al administrador')
            }
        } else {
            toast('No es posible el registro, contacte al administrador')
        }
    }

    const consultaInformacionUsuariosApp = async () => {
        if (!!sessionStorage.getItem('usuarioApp')) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp') || '')
            const authServices = new AuthServices();
            const body = {
                "usuarioApp": usuarioLocalStorage.usuario,
                "role": '',
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 4);
                if (response.estado) {
                    setUsuariosList(response.objeto)
                } else {
                    toast(response.mensaje)
                }
                setCargando(false);
            } catch (error) {
                toast('No es posible consultar la información, contacte al administrador')
                setCargando(false)
            }
        } else {
            toast('No es posible consultar la información, contacte al administrador')
        }
    }

    return (
        <>
            <div className='div-style-form'>
                <h3 className='titulo-form'>Registro de usuarios de aplicación</h3>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Nombres: </p>
                            <input value={nombres} onChange={(e) => setNombres(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Apellidos: </p>
                            <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Tipo identificación: </p>
                            <select className='form-control' value={tipoIdentificacion} onChange={(e) => setTipoIdentificacion(e.target.value)} >
                                {
                                    tiposDeDocumento.map((key, i) => {
                                        return (
                                            <option key={i} value={key.value}>{key.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Identificación: </p>
                            <input value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder='' className='form-control' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Correo: </p>
                            <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder='' className='form-control' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Role: </p>
                            <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)} >
                                {
                                    roles.map((key, i) => {
                                        return (
                                            <option key={i} value={key.value}>{key.label}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Usuario: </p>
                            {
                                modoEditar ?
                                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' className='form-control' autoComplete='off' disabled />
                                    :
                                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' className='form-control' autoComplete='off' />
                            }
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-bottom-custom'>
                            {
                                modoEditar ?
                                    <>
                                        <button className='btn btn-secondary bottom-custom-secondary' onClick={() => cancelaActualizaUsuario()} >Cancelar</button>
                                        <button className='btn btn-primary bottom-custom' onClick={() => guardaUsuarioAction()} >Actualizar</button>
                                    </>
                                    :
                                    <button className='btn btn-primary bottom-custom' onClick={() => guardaUsuarioAction()} >Guardar</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='div-style-form mt-3'>
                <h3 className='titulo-form'>Usuarios de aplicación</h3>
                <div className='div-style-form-whit-table'>
                    <table className='table-info'>
                        <thead>
                            <tr>
                                <td className='td-info'><p className='p-label-form'> Nombres </p></td>
                                <td className='td-info'><p className='p-label-form'> Role </p></td>
                                <td className='td-info'><p className='p-label-form'> Estado </p></td>
                                <td className='td-info'><p className='p-label-form'> Usuario de aplicación </p></td>
                                <td className='td-info'><p className='p-label-form'> Contraseña </p></td>
                                <td className='td-info'><p className='p-label-form'> Correo </p></td>
                                <td className='td-info'><p className='p-label-form'> Acciones </p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuariosList.map((usuario: any) => {
                                    return (
                                        <tr >
                                            <td className='td-info'>
                                                <p>{usuario.nombre} {usuario.apellidos}  </p>
                                            </td>
                                            <td className='td-info'>
                                                <p>{usuario.role}</p>
                                            </td>
                                            <td className='td-info'>
                                                <p className='mt-0'>
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
                                            <td className='td-info'>
                                                <div className='d-flex justify-content-around'>
                                                    <button className='btn btn-link' onClick={() => actualizaContrasenia(usuario)}>
                                                        <FontAwesomeIcon className='icons-table' icon={faRotateLeft} />
                                                    </button>
                                                    <button className='btn btn-link' onClick={() => actualizaUsuario(usuario)}>
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
                </div>
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

export default UsuariosApp