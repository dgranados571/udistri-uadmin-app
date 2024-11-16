import React, { useEffect, useState } from 'react'
import ZoneRoot from '../zone_root/zoneRoot'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IZoneProps } from '../../models/IProps';
import ZoneAdmin from '../zone_admin/zoneAdmin';
import ZoneRole1 from '../zone_role_1/zoneRole1';
import ZoneRole2 from '../zone_role_2/zoneRole2';

const ZonePrivate: React.FC<IZoneProps> = () => {

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
                    <ZoneRoot infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROOT' />
                )
            case 'ROLE_ADMIN':
                return (
                    <ZoneAdmin infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='ROLE_ADMIN'/>
                )
            case 'ROLE_1':
                return (
                    <ZoneRole1 infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROLE_1' />
                )
            case 'ROLE_2':
                return (
                    <ZoneRole2 infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROLE_2' />
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <ToastContainer autoClose={8000} hideProgressBar={true} />
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