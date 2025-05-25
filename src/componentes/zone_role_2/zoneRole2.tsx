import React, { useState } from 'react'
import { IMenuLateral, IZoneRoleProps } from '../../models/IProps'
import MenuLateralComponent from '../tvs/headerLateral/menuLateral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import Solicitudes from '../tvs_private/solicitudes/solicitudes'

const ZoneRole2: React.FC<IZoneRoleProps> = ({ infoMenuUsuario, toast, setCargando, zonaConsulta }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const [redirect, setRedirect] = useState('');

    const [menuLateral, setMenuLateral] = useState<IMenuLateral[]>([
        {
            nombreItem: 'Gestión',
            className: 'div-item-menu active',
            iconMenu: faHome,
            controlVista: ''
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
            case 'VISTA_MI_CUENTA':
                return (
                    <>MI CUENTA</>
                )
            default:
                return (
                    <>
                        <div className='div-dashboard-header-busqueda-padre'>
                            <div className="div-dashboard-header-busqueda">
                                <FontAwesomeIcon icon={faBars} className='dasboard-icon-header-menu' onClick={() => setOpenMenu(true)} />
                                <h4 className="dasboard-label-header-menu">Gestión</h4>
                            </div>
                        </div>
                        <div className="div-dashboard-content">
                            <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta} />
                        </div>
                    </>
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
                        {
                            validateRedirect()
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZoneRole2