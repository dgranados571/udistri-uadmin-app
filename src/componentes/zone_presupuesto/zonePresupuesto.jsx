import React, { useState } from 'react'
import Header from '../tvs/header/header'
import Solicitudes from '../tvs_private/solicitudes/solicitudes';

const ZonePresupuesto = ({ setRedirect, toast, setCargando }) => {

    const [stateMenu, setStateMenu] = useState({
        menuPadre: 'MENU1',
        menuHijo: ''
    });

    const componentsHeader = [
        {
            name: 'MENU1',
            label: 'Bandeja de entrada',
            id: 'Bandeja de entrada',
            className: 'btn btn-link a-buttom-active',
            classNameResponse: 'btn btn-link a-buttom-responsive-active'
        },
        {
            name: 'MENU2',
            label: 'Histórico',
            id: 'Histórico',
            className: 'btn btn-link a-buttom',
            classNameResponse: 'btn btn-link a-buttom'
        }
    ];

    const componentMenu = () => {
        switch (stateMenu.menuPadre) {
            case 'MENU1':
                return (
                    <div className='div-container'>
                        <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta='ZonePresupuesto' />
                    </div>
                )
            case 'MENU2':
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

export default ZonePresupuesto