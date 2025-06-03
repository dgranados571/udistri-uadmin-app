import React, { useEffect, useState } from 'react'
import ZoneRoot from '../zone_root/zoneRoot'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IlPropsModal, IZoneProps } from '../../models/IProps';
import ZoneAdmin from '../zone_admin/zoneAdmin';
import ZoneRole1 from '../zone_role_1/zoneRole1';
import ZoneRole2 from '../zone_role_2/zoneRole2';
import Modal from '../tvs/modal/modal';
import { useNavigate } from 'react-router-dom';

const ZonePrivate: React.FC<IZoneProps> = () => {

    const navigate = useNavigate();

    const [cargando, setCargando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModal, setPropsModal] = useState<IlPropsModal>({
        titulo: '',
        descripcion: '',
    })

    const [redirectZone, setRedirectZone] = useState('')

    const [infoMenuUsuario, setInfoMenuUsuario] = useState({
        usuario: '',
        nombre_completo: '',
        id_procesamiento: '',
        role: ''
    })

    useEffect(() => {
        setCargando(true);
        let usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        if (!!usuarioLocalStorage) {
            const usuarioLocalStorageObj = JSON.parse(usuarioLocalStorage)
            setInfoMenuUsuario({
                usuario: usuarioLocalStorageObj.usuario,
                nombre_completo: usuarioLocalStorageObj.nombre + ' ' + usuarioLocalStorageObj.apellidos,
                id_procesamiento: usuarioLocalStorageObj.id_procesamiento,
                role: usuarioLocalStorageObj.role
            })
            setRedirectZone(usuarioLocalStorageObj.role)
            setCargando(false);
        } else {
            setCargando(false);
            setTipoModal('MODAL_CONTROL_1')
            setPropsModal({
                titulo: 'Sesión requerida',
                descripcion: 'Para continuar, es necesario iniciar sesión nuevamente.'
            })
            setModalOpen(true)
        }
    }, [])

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const validateRedirect = () => {
        switch (redirectZone) {
            case 'USUARIO_ROOT':
                return (
                    <ZoneRoot infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROOT' />
                )
            case 'ROLE_ADMIN':
                return (
                    <ZoneAdmin infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROLE_ADMIN' />
                )
            case 'ROLE_1':
                return (
                    <ZoneRole1 infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROLE_1' />
                )
            case 'ROLE_2':
                return (
                    <ZoneRole2 infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROLE_2' />
                )
            case 'ROLE_3':
                return (
                    <ZoneRole2 infoMenuUsuario={infoMenuUsuario} toast={toast} setCargando={setCargando} zonaConsulta='USUARIO_ROLE_3' />
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
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={() => { }} modalNo={() => { cerrarSesion() }} propsModal={propsModal} />
                    :
                    <></>
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