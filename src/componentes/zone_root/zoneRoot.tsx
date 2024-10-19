import React, { useState } from 'react'
import './zoneRoot.css'
import { faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { IMenuLateral, IZoneRootProps } from '../../models/IProps'
import MenuLateralComponent from '../tvs/headerLateral/menuLateral'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp'
import Solicitudes from '../tvs_private/solicitudes/solicitudes'

const ZoneRoot: React.FC<IZoneRootProps> = ({ infoMenuUsuario, toast, setCargando }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const [redirect, setRedirect] = useState('');

    const [menuLateral, setMenuLateral] = useState<IMenuLateral[]>([
        {
            nombreItem: 'Inicio',
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
                    <UsuariosApp toast={toast} setCargando={setCargando} />
                )
            case 'VISTA_MI_CUENTA':
                return (
                    <>MI CUENTA</>
                )
            default:
                return (
                    <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta='ROOT'></Solicitudes>
                )
        }
    }

    return (
        <>
            <div className='div-container'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                        <MenuLateralComponent setOpenMenu={setOpenMenu} selecionaMenu={selecionaMenu} menuLateral={menuLateral} openMenu={openMenu} infoMenuUsuario={infoMenuUsuario} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-9" >
                        <div className="div-dashboard-content">
                            {
                                validateRedirect()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZoneRoot