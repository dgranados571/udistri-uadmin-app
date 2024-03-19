import React, { useState } from 'react'
import Header from '../tvs/header/header'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp';
import Solicitudes from '../tvs_private/solicitudes/solicitudes';

const ZoneJefeDependencia = ({ setRedirect, toast, setCargando }) => {

    const [stateMenu, setStateMenu] = useState({
        menuPadre: 'MENU1',
        menuHijo: ''
    });

    const componentsHeader = [
        {
            name: 'MENU1',
            label: 'Solicitudes',
            id: 'Solicitudes',
            className: 'btn btn-link a-buttom-active',
            classNameResponse: 'btn btn-link a-buttom-responsive-active'
        },
        {
            name: 'MENU2',
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
                        <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta='ZoneJefeDependencia' />
                    </div>
                )
            case 'MENU2':
                return (
                    <div className='div-container'>
                        <UsuariosApp toast={toast} setCargando={setCargando} />
                    </div>
                )
            case 'MENU3':
                return (
                    <div className='div-container'>

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

export default ZoneJefeDependencia