import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../tvs/modal/modal'
import { IGenericResponse, IlPropsModal, IUsuariosAppProps } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'

const UsuariosApp: React.FC<IUsuariosAppProps> = ({ toast, setCargando, zonaConsulta }) => {

    const rolesPermitenEliminar = ['USUARIO_ROOT']
    const [showBotomElimina, setShowBotomElimina] = useState(false);

    const [modal, setModal] = useState(false)
    const [propsModal, setPropsModal] = useState<IlPropsModal>({
        titulo: '',
        descripcion: '',
    })

    const [modoEditar, setModoEditar] = useState(false)
    const [modoELiminar, setModoELiminar] = useState(false)
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

    const [usuarioRootControl, setUsuarioRootControl] = useState(false)

    useEffect(() => {
        if (rolesPermitenEliminar.includes(zonaConsulta)) {
            setShowBotomElimina(true)
        }
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
        {
            titulo: 'Eliminar usuario de aplicación',
            descripcion: 'Esta seguro de eliminar al usuario: '
        },
    ]

    const tiposDeDocumento = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CC', label: 'Cedula de ciudadania' },
        { value: 'CE', label: 'Cedula de extranjeria' }
    ]

    const roles = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'ROLE_ADMIN', label: 'Administrador de aplicación' },
        { value: 'ROLE_1', label: 'Gestor documental' },
        { value: 'ROLE_2', label: 'Revisor documental' },
        { value: 'ROLE_3', label: 'Creador de solicitudes' }
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
        setTipoIdentificacionRef(false)
        setIdentificacionRef(false)
        setCorreoRef(false)
        setRoleRef(false)
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
        if (usuario.role === 'USUARIO_ROOT') {
            setRole('USUARIO_ROOT')
            setUsuarioRootControl(true)
        } else {
            for (let step = 0; step < roles.length; step++) {
                if (roles[step].value === usuario.role) {
                    setRole(usuario.role)
                    break
                }
            }
        }
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
        setUsuarioRootControl(false)
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

    const eliminarUsuario = (usuario: any) => {
        setModoELiminar(true)
        modalMensajes[2].descripcion = modalMensajes[1].descripcion + usuario.usuario
        setPropsModal(modalMensajes[2])
        setModal(true)
        setUserEdita(usuario)
    }

    const modalSi = () => {
        setModal(false)
        if (modoEditar) {
            enviaEdicionUsuarioApp()
        } else if (modoELiminar) {
            eliminaUsuarioService()
        } else {
            actualizaContraseniaUser()
        }
    }

    const modalNo = () => {
        setModal(false)
        setModoELiminar(false)
        setUserEdita({})
    }

    const eliminaUsuarioService = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
            const authServices = new AuthServices();
            const body = {
                "usuarioElimina": userEdita,
                "usuarioApp": usuarioLocalStorage.usuario,
            }
            try {
                const response: IGenericResponse = await authServices.requestPost(body, 9);                
                if (response.estado) {
                    toast(response.mensaje)
                    setModoELiminar(false)
                    setUserEdita({})
                    consultaInformacionUsuariosApp()                    
                }
                setCargando(false);
            } catch (error) {
                toast('No es posible eliminar la información, contacte al administrador')
                setCargando(false)
            }
        } else {
            toast('No es posible eliminar la información, contacte al administrador')
        }
    }

    const actualizaContraseniaUser = async () => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
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
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
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
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
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
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            setCargando(true)
            const usuarioLocalStorage = JSON.parse(usuarioSession);
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

    const labelRoleList = (role: string) => {
        let labelRole = '';
        if (role === 'USUARIO_ROOT') {
            labelRole = 'Usuario Root'
        } else {
            for (let step = 0; step < roles.length; step++) {
                if (roles[step].value === role) {
                    labelRole = roles[step].label
                    break
                }
            }
        }
        return (
            <p>{labelRole}</p>
        )
    }

    return (
        <>
            <div className='div-style-form'>
                <h4>Registro de usuarios de aplicación</h4>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Nombres: </p>
                            <input value={nombres} onChange={(e) => setNombres(e.target.value)} type="text" className={nombresRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Apellidos: </p>
                            <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} type="text" className={apellidosRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Tipo identificación: </p>
                            <select value={tipoIdentificacion} onChange={(e) => setTipoIdentificacion(e.target.value)} className={tipoIdentificacionRef ? 'form-control form-control-error' : 'form-control'} >
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
                            <input value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} placeholder='' className={identificacionRef ? 'form-control form-control-error' : 'form-control'} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Correo: </p>
                            <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder='' className={correoRef ? 'form-control form-control-error' : 'form-control'} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Role:</p>
                            {
                                usuarioRootControl ?
                                    <select value={role} className='form-control' disabled></select>
                                    :
                                    <select value={role} onChange={(e) => setRole(e.target.value)} className={roleRef ? 'form-control form-control-error' : 'form-control'}>
                                        {
                                            roles.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                            }
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
                                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='' className={usuarioRef ? 'form-control form-control-error' : 'form-control'} autoComplete='off' />
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
                <h4>Usuarios de aplicación</h4>
                <div className="row">
                    {
                        usuariosList.map((usuario: any) => {
                            return (
                                <>
                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-4">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className='p-label-form m-0'> Nombres: </p>
                                            <p className='mx-2'> {usuario.nombre} {usuario.apellidos} </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className='p-label-form m-0'> Role: </p>
                                            <p className='mx-2'>
                                                {
                                                    labelRoleList(usuario.role)
                                                }
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className='p-label-form m-0'> Estado: </p>
                                            <p className='mx-2'>
                                                {
                                                    usuario.usuario_activo ?
                                                        'Activo'
                                                        :
                                                        'Por activar'
                                                }
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className='p-label-form m-0'> Usuario: </p>
                                            <p className='mx-2'> {usuario.usuario} </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className='p-label-form m-0'> Contraseña: </p>
                                            <p className='mx-2'> {usuario.contrasenia} </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className='p-label-form m-0'> Correo: </p>
                                            <p className='mx-2'> {usuario.correo} </p>
                                        </div>
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <p className='p-label-form m-0'> Acciones: </p>
                                            <button className='btn btn-link' onClick={() => actualizaContrasenia(usuario)}>
                                                <FontAwesomeIcon className='icons-table' icon={faRotateLeft} />
                                            </button>
                                            <button className='btn btn-link' onClick={() => actualizaUsuario(usuario)}>
                                                <FontAwesomeIcon className='icons-table' icon={faPenToSquare} />
                                            </button>
                                            {
                                                showBotomElimina ?
                                                    <button className='btn btn-link' onClick={() => eliminarUsuario(usuario)}>
                                                        <FontAwesomeIcon className='icons-table' icon={faTrash} />
                                                    </button>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            {
                modal ?
                    <Modal tipoModal='MODAL_CONTROL_2' modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }
        </>
    )
}

export default UsuariosApp