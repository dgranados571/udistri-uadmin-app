import React from 'react'
import { logoBase64 } from '../../zone_app/imgLogo'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { IMenuLateralProps } from '../../../models/IProps'

const MenuLateralComponent: React.FC<IMenuLateralProps> = ({ setOpenMenu, selecionaMenu, menuLateral, openMenu, infoMenuUsuario }) => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <div className={openMenu ? 'div-menu-lateral-padre active' : 'div-menu-lateral-padre'} onClick={() => setOpenMenu(false)}  >
                <div className='div-menu-lateral'>
                    <div className='div-dashboard-container-logo'>
                        <div className='div-dashboard-logo'>
                            <img src={logoBase64} alt='idelpan-logo' className='img-logo-idelpan'></img>
                        </div>
                    </div>
                    <div className='div-dashboard-info-padre'>
                        <div className='div-dashboard-info'>
                            <p className='m-0'>{infoMenuUsuario.nombre_completo} </p>
                        </div>
                        <div className='div-dashboard-info'>
                            <p className='m-0'>{infoMenuUsuario.usuario} </p>
                        </div>
                    </div>
                </div>
                <div className='div-menu-lateral'>
                    <div className='div-dashboard-info-padre'>
                        {
                            menuLateral.map((itemMenu, index) => {
                                return (
                                    <div key={index} className={itemMenu.className} onClick={() => selecionaMenu(itemMenu)}>
                                        <FontAwesomeIcon icon={itemMenu.iconMenu} className='icon-menu-lateral' />
                                        <p className='m-0'>{itemMenu.nombreItem} </p>
                                    </div>
                                )
                            })
                        }
                        <div className='div-item-menu' onClick={() => cerrarSesion()}>
                            <FontAwesomeIcon icon={faSignOut} className='icon-menu-lateral' />
                            <p className='m-0'>Cerrar sesión </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuLateralComponent