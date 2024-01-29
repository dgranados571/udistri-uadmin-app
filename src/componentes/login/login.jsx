import React, { useRef, useState } from 'react'
import './login.css'
import { UtilUrl } from '../../utilUrl';
import axios from 'axios'

const Login = ({ setRedirect, toast, setCargando }) => {

    const { urlEntorno } = UtilUrl();

    const [actionLogin, setActionLogin] = useState('LOGIN')

    const [loginElements, setLoginElements] = useState({
        usuario: '',
        contrasenia: '',
        newContrasenia: '',
        confimaContrasenia: ''
    })

    const usuarioRef = useRef('')
    const contrasenaRef = useRef('')

    const contrasenaPreRef = useRef('')
    const contrasenaPostRef = useRef('')

    const { usuario, contrasenia, newContrasenia, confimaContrasenia } = loginElements

    const inputEvent = (e) => {
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

        usuarioRef.current.className = 'form-control'
        if (usuario.length === 0) {
            formValidado.push('Usuario');
            usuarioRef.current.className = 'form-control form-control-error';
        }

        contrasenaRef.current.className = 'form-control'
        if (contrasenia.length === 0) {
            formValidado.push('Contrasenia');
            contrasenaRef.current.className = 'form-control form-control-error'
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

        contrasenaPreRef.current.className = 'form-control'
        if (newContrasenia.length === 0) {
            formValidado.push('Nueva contrasenia');
            contrasenaPreRef.current.className = 'form-control form-control-error';
        }

        contrasenaPostRef.current.className = 'form-control'
        if (confimaContrasenia.length === 0) {
            formValidado.push('Contrasenia');
            contrasenaPostRef.current.className = 'form-control form-control-error'
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
        const body = {
            "usuario": usuario,
            "contrasenia": confimaContrasenia
        }
        await axios.post(`${urlEntorno}/service/uadmin/activacionUsuarioApp`, body)
            .then((response) => {
                setTimeout(() => {
                    if (response.data.estado) {
                        setActionLogin('LOGIN')
                        setLoginElements({
                            usuario: '',
                            contrasenia: '',
                            newContrasenia: '',
                            confimaContrasenia: ''
                        })
                    }
                    toast(response.data.mensaje)
                    setCargando(false)
                }, 250)
            }).catch(() => {
                setTimeout(() => {
                    toast('Error activando el usuario, contacte al administrador')
                    setCargando(false)
                }, 250)
            })
    }

    const getLoginService = async () => {
        setCargando(true)
        const body = {
            "usuario": usuario,
            "contrasenia": contrasenia
        }
        await axios.post(`${urlEntorno}/service/uadmin/loginApp`, body)
            .then((response) => {
                setTimeout(() => {
                    if (response.data.estado) {
                        if (response.data.objeto.usuario_activo) {
                            sessionStorage.setItem('usuarioApp', JSON.stringify(response.data.objeto))
                            setRedirect({
                                usuario: JSON.stringify(response.data.objeto),
                                rol: response.data.objeto.role
                            });
                        } else {
                            setActionLogin('ACTUALIZA_PASS')
                            setRedirect({
                                usuario: response.data.objeto,
                                rol: 'USUARIO_LOGIN'
                            });
                            toast(response.data.mensaje)
                        }
                    } else {
                        toast(response.data.mensaje)
                    }
                    setCargando(false)
                }, 250)
            }).catch(() => {
                setTimeout(() => {
                    toast('Error en la autenticación, contacte al administrador')
                    setCargando(false)
                }, 250)
            })
    }

    return (
        <>
            <div className='div-container-login' style={{ display: actionLogin === 'LOGIN' ? 'flex' : 'none' }}>
                <div className='div-login'>
                    <div className='div-login-elements'>
                        <div className='div-elements-children' >
                            <h3 className='titulo-login'>Ingreso a: Gestión contractual</h3>
                            <div className='div-inputs-login'>
                                <p className='p-label-form-login'> Usuario </p>
                                <input ref={usuarioRef} type="text" name='usuario' value={usuario} onChange={(e) => inputEvent(e)} className='form-control' placeholder='Usuario' autoComplete='off' />
                                <p className='p-label-form-login'> Contraseña </p>
                                <input ref={contrasenaRef} type="password" name='contrasenia' value={contrasenia} onChange={(e) => inputEvent(e)} className='form-control' placeholder='Contraseña' autoComplete='off' />
                            </div>
                            {
                                /*
                                <div className='div-links-login'>
                                    <button className='btn btn-link a-link-login'>
                                        Olvide mi contraseña
                                    </button>
                                </div>
                                */
                            }
                            <div className='div-bottom-custom-login'>
                                <button className='bottom-custom-login' onClick={() => clickLogin()} >
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className='p-info-login'>Desarrollado por equipo de especialidad U-Distrital </p>
                </div>
            </div>
            <div className='div-container-login' style={{ display: actionLogin === 'ACTUALIZA_PASS' ? 'flex' : 'none' }}>
                <div className='div-login'>
                    <div className='div-login-elements'>
                        <div className='div-elements-children' >
                            <h3 className='titulo-login'>Activar cuenta</h3>
                            <div>
                                <p>Para activar tu cuenta debes actualizar tu constraseña</p>
                            </div>
                            <div className='div-inputs-login'>
                                <p className='p-label-form-login'>Nueva contraseña  </p>
                                <input ref={contrasenaPreRef} type="password" name='newContrasenia' value={newContrasenia} onChange={(e) => inputEvent(e)} className='form-control' placeholder='Constraseña' autoComplete='off' />
                                <p className='p-label-form-login'>Confirma contraseña </p>
                                <input ref={contrasenaPostRef} type="password" name='confimaContrasenia' value={confimaContrasenia} onChange={(e) => inputEvent(e)} className='form-control' placeholder='Confirma Contraseña' autoComplete='off' />
                            </div>
                            <div className='div-bottom-custom-login'>
                                <button className='bottom-custom-login' onClick={() => clickActualizaPass()} >
                                    Activar
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className='p-info-login'>dgc-software | Todos los derechos reservados </p>
                </div>
            </div>
        </>
    )
}

export default Login 
