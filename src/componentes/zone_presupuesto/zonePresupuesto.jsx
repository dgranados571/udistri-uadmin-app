import React, { useState } from 'react'
import Header from '../tvs/header/header'

const ZonePresupuesto = ({ setRedirect, toast, setCargando }) => {

    const [stateMenu, setStateMenu] = useState({
        menuPadre: 'MENU1',
        menuHijo: ''
    });

    const componentsHeader = [
        {
            name: 'MENU1',
            label: 'MENU1',
            id: 'MENU1',
            className: 'btn btn-link a-buttom-active',
            classNameResponse: 'btn btn-link a-buttom-responsive-active'
        },
        {
            name: 'MENU2',
            label: 'MENU2',
            id: 'MENU2',
            className: 'btn btn-link a-buttom',
            classNameResponse: 'btn btn-link a-buttom'
        },
        {
            name: 'MENU3',
            label: 'MENU3',
            id: 'MENU3',
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
            <div className='div-container'>
                <div className='div-style-form'>
                    <h3>Zona Presupuesto</h3>
                </div>
            </div>
            {
                componentMenu()
            }
        </>
    )
}

export default ZonePresupuesto