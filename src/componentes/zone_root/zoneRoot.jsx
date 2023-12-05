import React, { useState } from 'react'
import Header from '../header/header'
import './zoneRoot.css'
import UsuariosApp from './usuarios/usuariosApp'

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
            label: 'Usuarios App', 
            id: 'Usuarios App',
            className: 'btn btn-link a-buttom',
            classNameResponse: 'btn btn-link a-buttom'
        }
    ];

    const componentMenu = () => {
        switch (stateMenu.menuPadre) {
            case 'MENU1':
                return (
                    <div className='div-container'>

                    </div>
                )
            case 'MENU2':
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