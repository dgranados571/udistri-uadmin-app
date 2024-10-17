import React, { useState } from 'react'
import './login.css'
import { IGenericResponse, ILoginProps } from '../../models/IProps';
import { AuthServices } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<ILoginProps> = ({ toast, setCargando }) => {

    const navigate = useNavigate();

    const [actionLogin, setActionLogin] = useState('LOGIN')

    const [loginElements, setLoginElements] = useState({
        usuario: '',
        contrasenia: '',
        newContrasenia: '',
        confimaContrasenia: ''
    })

    const [usuarioRef, setUsuarioRef] = useState(false)
    const [contrasenaRef, setContrasenaRef] = useState(false)
    const [contrasenaPreRef, setContrasenaPreRef] = useState(false)
    const [contrasenaPostRef, setContrasenaPostRef] = useState(false)

    const { usuario, contrasenia, newContrasenia, confimaContrasenia } = loginElements

    const inputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'usuario') {
            setLoginElements({
                ...loginElements,
                'usuario': e.target.value
            })
        } else if (e.target.name === 'contrasenia') {
            setLoginElements({
                ...loginElements,
                'contrasenia': e.target.value
            })
        } else if (e.target.name === 'newContrasenia') {
            setLoginElements({
                ...loginElements,
                'newContrasenia': e.target.value
            })
        } else if (e.target.name === 'confimaContrasenia') {
            setLoginElements({
                ...loginElements,
                'confimaContrasenia': e.target.value
            })
        }
    }

    const clickLogin = () => {
        let formValidado = [];
        setUsuarioRef(false)
        if (usuario.length === 0) {
            formValidado.push('Usuario');
            setUsuarioRef(true)
        }
        setContrasenaRef(false)
        if (contrasenia.length === 0) {
            formValidado.push('Contrasenia');
            setContrasenaRef(true)
        }
        if (formValidado.length === 0) {
            getLoginService()            
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Algunos campos son obligatorios !!!')
        }
    }

    const clickActualizaPass = () => {
        let formValidado = [];
        setContrasenaPreRef(false)
        if (newContrasenia.length === 0) {
            formValidado.push('Nueva contrasenia');
            setContrasenaPreRef(true)
        }
        setContrasenaPostRef(false)
        if (confimaContrasenia.length === 0) {
            formValidado.push('Contrasenia');
            setContrasenaPostRef(true)
        }
        if (formValidado.length === 0) {
            if (newContrasenia === confimaContrasenia) {
                getActivaCuentaService()
            } else {
                toast('Las constraseñas no son iguales')
            }
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Algunos campos son obligatorios !!!')
        }
    }

    const getActivaCuentaService = async () => {
        setCargando(true)
        const authServices = new AuthServices();
        const body = {
            "usuario": usuario,
            "contrasenia": confimaContrasenia
        }
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 3);
            if (response.estado) {
                setActionLogin('LOGIN')
                setLoginElements({
                    usuario: '',
                    contrasenia: '',
                    newContrasenia: '',
                    confimaContrasenia: ''
                })
            } else {
                toast(response.mensaje)
            }
            setCargando(false);
        } catch (error) {
            toast('Error activando el usuario, contacte al administrador')
            setCargando(false);
        }
    }

    const getLoginService = async () => {
        setCargando(true)
        const authServices = new AuthServices();
        const body = {
            "usuario": usuario,
            "contrasenia": contrasenia
        }
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 2);
            if (response.estado) {
                if (response.objeto.usuario_activo) {
                    sessionStorage.setItem('usuarioApp', JSON.stringify(response.objeto))
                    navigate('/privateZone');
                } else {
                    setActionLogin('ACTUALIZA_PASS')
                    toast(response.mensaje)
                }
            } else {
                toast(response.mensaje)
            }
            setCargando(false);
        } catch (error) {
            toast('Error en la autenticación, contacte al administrador')
            setCargando(false);
        }
    }

    return (
        <>
            <div className='div-container-login' style={{ display: actionLogin === 'LOGIN' ? 'block' : 'none' }}>
                <div className="row mt-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <div className='div-login'>
                            <div className='div-login-elements'>
                                <div className='div-elements-children' >
                                    <p className=''>A travez de la zona transaccional podra hacer seguimiento y gestión a todas sus solicitudes:</p>
                                    <div className='div-inputs-login'>
                                        <p className='p-label-form-login'> Usuario </p>
                                        <input type="text" name='usuario' value={usuario} onChange={(e) => inputEvent(e)} className={usuarioRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                                        <p className='p-label-form-login'> Contraseña </p>
                                        <input type="password" name='contrasenia' value={contrasenia} onChange={(e) => inputEvent(e)} className={contrasenaRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                                    </div>
                                    <div className='div-bottom-custom'>
                                        <button className='btn btn-primary bottom-custom' onClick={() => clickLogin()} >
                                            Ingresar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className='p-info-login'>Desarrollado por soluciones dgc-software </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='div-container-login' style={{ display: actionLogin === 'ACTUALIZA_PASS' ? 'block' : 'none' }}>
                <div className="row mt-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className='div-login'>
                            <div className='div-login-elements'>
                                <div className='div-elements-children' >
                                    <p>Para activar su cuenta, debe actualizar la contraseña:</p>
                                    <div className='div-inputs-login'>
                                        <p className='p-label-form-login'>Nueva contraseña  </p>
                                        <input type="password" name='newContrasenia' value={newContrasenia} onChange={(e) => inputEvent(e)} className={contrasenaPreRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                                        <p className='p-label-form-login'>Confirma contraseña </p>
                                        <input type="password" name='confimaContrasenia' value={confimaContrasenia} onChange={(e) => inputEvent(e)} className={contrasenaPostRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                                    </div>
                                    <div className='div-bottom-custom'>
                                        <button className='btn btn-primary bottom-custom' onClick={() => clickActualizaPass()} >
                                            Activar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className='p-info-login'>Desarrollado por soluciones dgc-software </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login 
