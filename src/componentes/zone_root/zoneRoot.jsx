import React, { useState } from 'react'
import Header from '../tvs/header/header'
import './zoneRoot.css'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp'
import Resume from './resume/resume'
import Solicitudes from '../tvs_private/solicitudes/solicitudes'

const ZoneRoot = ({ setRedirect, toast, setCargando }) => {

    const [stateMenu, setStateMenu] = useState({
        menuPadre: 'MENU1',
        menuHijo: ''
    });

    const componentsHeader = [
        {
            name: 'MENU1',
            label: 'Principal',
            id: 'Principal',
            className: 'btn btn-link a-buttom-active',
            classNameResponse: 'btn btn-link a-buttom-responsive-active'
        },
        {
            name: 'MENU2',
            label: 'Solicitudes',
            id: 'Solicitudes',
            className: 'btn btn-link a-buttom',
            classNameResponse: 'btn btn-link a-buttom'
        },
        {
            name: 'MENU3',
            label: 'Usuarios',
            id: 'Usuarios',
            className: 'btn btn-link a-buttom',
            classNameResponse: 'btn btn-link a-buttom'
        }
    ];

    const componentMenu = () => {
        switch (stateMenu.menuPadre) {
            case 'MENU1':
                return (
                    <div className='div-container'>
                        <Resume toast={toast} setCargando={setCargando} />
                    </div>
                )
            case 'MENU2':
                return (
                    <div className='div-container'>
                        <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta= 'ROOT' />
                    </div>
                )
            case 'MENU3':
                return (
                    <div className='div-container'>
                        <UsuariosApp toast={toast} setCargando={setCargando} />
                    </div>
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <Header setStateMenu={setStateMenu} setRedirect={setRedirect} componentsHeader={componentsHeader} />
            {
                componentMenu()
            }
        </>
    )
}

export default ZoneRoot