import React, { useState } from 'react'
import './zoneRoot.css'
import { faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { IMenuLateral, IZoneRootProps } from '../../models/IProps'
import MenuLateralComponent from '../tvs/headerLateral/menuLateral'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp'
import Solicitudes from '../tvs_private/solicitudes/solicitudes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons'
import Configuracion from '../tvs_private/configuracion/configuracion'

const ZoneRoot: React.FC<IZoneRootProps> = ({ infoMenuUsuario, toast, setCargando, zonaConsulta }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const [redirect, setRedirect] = useState('');

    const [menuLateral, setMenuLateral] = useState<IMenuLateral[]>([
        {
            nombreItem: 'Gestión',
            className: 'div-item-menu active',
            iconMenu: faHome,
            controlVista: ''
        },
        {
            nombreItem: 'Usuarios app',
            className: 'div-item-menu',
            iconMenu: faUsers,
            controlVista: 'VISTA_USUARIOS_APP'
        },
        {
            nombreItem: 'Configuración',
            className: 'div-item-menu',
            iconMenu: faCog,
            controlVista: 'VISTA_CONFIGURACION'
        },
        {
            nombreItem: 'Mi cuenta',
            className: 'div-item-menu',
            iconMenu: faUser,
            controlVista: 'VISTA_MI_CUENTA'
        }
    ])

    const selecionaMenu = (itemSeleccionado: IMenuLateral) => {
        setRedirect(itemSeleccionado.controlVista)
        const nuevoMenuLateral = menuLateral.map(itemMenu => {
            if (itemMenu.nombreItem === itemSeleccionado.nombreItem) {
                return { ...itemMenu, className: 'div-item-menu active' };
            } else {
                return { ...itemMenu, className: 'div-item-menu' };
            }
        });
        setMenuLateral(nuevoMenuLateral);
    };

    const validateRedirect = () => {
        switch (redirect) {
            case 'VISTA_USUARIOS_APP':
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                            <h4 className="dasboard-label-header-menu">Usuarios</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                    <div className="div-dashboard-content">
                                        <UsuariosApp toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                )
            case 'VISTA_MI_CUENTA':
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                            <h4 className="dasboard-label-header-menu">Mi cuenta</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                    <div className="div-dashboard-content">
                                        Modulo mi cuenta
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'VISTA_CONFIGURACION':
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                            <h4 className="dasboard-label-header-menu">Configuración</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                    <div className="div-dashboard-content">
                                        <Configuracion toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return (
                    <>
                        <div className='div-container'>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                                    <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                                    <div className='div-dashboard-header-busqueda-padre'>
                                        <div className="div-dashboard-header-busqueda">
                                            <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                            <h4 className="dasboard-label-header-menu">Gestión</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                    <div className="div-dashboard-content">
                                        <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        <>
            {
                validateRedirect()
            }
        </>
    )
}

export default ZoneRoot