import React, { useEffect, useState } from 'react'
import ZoneRoot from '../zone_root/zoneRoot'
import ZoneJefeDependencia from '../zone_jefe_dependencia/zoneJefeDependencia'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ZonePrivate = () => {

    const [cargando, setCargando] = useState(false)

    const [redirectZone, setRedirectZone] = useState('')

    const [infoMenuUsuario, setInfoMenuUsuario] = useState({
        usuario: '',
        nombre_completo: '',
        id_procesamiento: ''
    })

    useEffect(() => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage)
            setInfoMenuUsuario({
                usuario: usuarioLocalStorageObj.usuario,
                nombre_completo: usuarioLocalStorageObj.nombre + ' ' + usuarioLocalStorageObj.apellidos,
                id_procesamiento: usuarioLocalStorageObj.id_procesamiento
            })
            setRedirectZone(usuarioLocalStorageObj.role)
            setCargando(false);
        } else {
            setCargando(false);
        }
    }, [])

    const validateRedirect = () => {
        switch (redirectZone) {
            case 'USUARIO_ROOT':
                return (
                    <ZoneRoot infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} />
                )
            case 'JEFE_DEPENDENCIA_ROLE':
                return (
                    <ZoneJefeDependencia toast={toast} setCargando={setCargando} />
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <ToastContainer autoClose={4000} hideProgressBar={true} />
            {
                validateRedirect()
            }
            {
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>
    )
}

export default ZonePrivate