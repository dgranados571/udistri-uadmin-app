import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './header.css'

function Header({ setStateMenu, setRedirect, componentsHeader }) {

  const [menuTituloNav, setmenuTituloNav] = useState(componentsHeader[0].id)
  const [menuResponsive, setMenuResponsive] = useState(false)

  const selectMenu = (e) => {
    selectedClearELement(e.target.name)
    setStateMenu({
      menuPadre: e.target.name,
      menuHijo: ''
    });
  }

  const selectedClearELement = (e) => {
    const elementsNav = document.querySelectorAll('#nav-menu > .btn');
    elementsNav.forEach((element) => {
      element.setAttribute('class', (e === element.name) ? 'btn btn-link a-buttom-active' : 'btn btn-link a-buttom')
      return element;
    })
  }

  const selectMenuResponsive = (e) => {
    selectedClearELementResposnsive(e.target.name);
    setmenuTituloNav(e.target.id);
    const elementsNav = document.querySelector('#div-menu-control');
    elementsNav.classList.replace('div-menu-responsive-post', 'div-menu-responsive-pre');
    setStateMenu({
      menuPadre: e.target.name,
      menuHijo: ''
    });
    setTimeout(() => {
      setMenuResponsive(false)
    }, 350)
  }

  const selectedClearELementResposnsive = (e) => {
    const elementsNav = document.querySelectorAll('#nav-menu > .btn');
    elementsNav.forEach((element) => {
      element.setAttribute('class', (e === element.name) ? 'btn btn-link a-buttom-responsive-active' : 'btn btn-link a-buttom')
      return element;
    })
  }

  const activeMenuResponsive = (e) => {
    setMenuResponsive(!menuResponsive)
    setTimeout(() => {
      const elementsNav = document.querySelector('#div-menu-control');
      if (menuResponsive) {
        elementsNav.classList.replace('div-menu-responsive-post', 'div-menu-responsive-pre');
      } else {
        elementsNav.classList.replace('div-menu-responsive-pre', 'div-menu-responsive-post');
      }
    }, 50)
  }

  const cierraSesion = () => {
    sessionStorage.removeItem('usuarioApp')
    setRedirect({
      usuario: '',
      rol: 'USUARIO_LOGIN'
    });
  }

  return (
    <>
      <div className='div-header'>
        <div className='div-normal'>
          <div className="row ">
            <div className="col-12 col-sm-12 col-md-12 col-lg-1" ></div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-10" >
              <nav id='nav-menu' className="nav flex-row div-nav-header">
                {
                  componentsHeader.map((header) => {
                    return (
                      <button name={header.name} className={header.className} onClick={(e) => selectMenu(e)}>{header.label}</button>
                    )
                  })
                }
                <button className='btn btn-link a-link-cerrar-sesion' onClick={() => cierraSesion()} >
                  Cerrar sesión
                </button>
              </nav>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-1" ></div>
          </div>
        </div>
        <div className='div-responsive'>
          <div className='div-header-responsive' >
            <p className='p-titulo-nav'>{menuTituloNav}</p>
            <button onClick={(e) => activeMenuResponsive(e)} className='btn btn-link icon-menu-link'>
              <FontAwesomeIcon className='icon-bars' icon={faBars} />
            </button>
          </div>
        </div>
      </div>
      <div className={menuResponsive ? 'div-menu-control-responsive-active' : 'div-menu-control-responsive'} >
        <div id='div-menu-control' className='div-menu-responsive-pre' >
          <div id='nav-menu' className='div-menu-responsive'>
            {
              componentsHeader.map((header) => {
                return (
                  <button name={header.name} id={header.id} className={header.classNameResponse} onClick={(e) => selectMenuResponsive(e)}>{header.label}</button>
                )
              })
            }
            <div className='div-cerrar-sesion-responsive'>
              <button className='btn btn-link a-link-cerrar-sesion-responsive' onClick={() => cierraSesion()} >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;