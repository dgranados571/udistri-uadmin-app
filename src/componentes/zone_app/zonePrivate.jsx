import React, { useState } from 'react'
import Login from '../login/login'
import ZoneRoot from '../zone_root/zoneRoot'
import ZoneJefeDependencia from '../zone_jefe_dependencia/zoneJefeDependencia'
import ZonePrecontractual from '../zone_precontractual/zonePrecontractual'
import ZonePresupuesto from '../zone_presupuesto/zonePresupuesto'
import ZoneAfiliaciones from '../zone_afiliaciones/zoneAfiliaciones'
import ZoneContractual from '../zone_contractual/zoneContractual'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderUnal from '../tvs/header_unal/headerUnal'

const ZonePrivate = () => {

    const [cargando, setCargando] = useState(false)

    const [redirect, setRedirect] = useState({
        usuario: '',
        rol: 'USUARIO_LOGIN'
    })

    const validateRedirect = () => {
        switch (redirect.rol) {
            case 'USUARIO_LOGIN':
                return (
                    <>
                        <HeaderUnal />
                        <Login setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                    </>
                )
            case 'USUARIO_ROOT':
                return (
                    <ZoneRoot setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                )
            case 'JEFE_DEPENDENCIA_ROLE':
                return (
                    <ZoneJefeDependencia setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                )
            case 'PRECONTRATUAL_ROLE':
                return (
                    <ZonePrecontractual setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                )
            case 'PRESUPUETO_ROLE':
                return (
                    <ZonePresupuesto setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                )
            case 'AFILIACIONES_ROLE':
                return (
                    <ZoneAfiliaciones setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                )
            case 'CONTRATUAL_ROLE':
                return (
                    <ZoneContractual setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                )
            default:
                return (
                    <>
                        <HeaderUnal />
                        <Login setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
                    </>
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