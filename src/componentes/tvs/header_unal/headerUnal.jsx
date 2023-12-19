import React from 'react'
import './css_unal/reset.css'
import './css_unal/unal.css'
import './css_unal/base.css'
import './css_unal/tablet.css'
import './css_unal/phone.css'
import './css_unal/small.css'
import imageUnal from './images_unal/escudoUnal.svg'
import imageEscudoCol from './images_unal/sealColombia.png'

const HeaderUnal = () => {
    return (
        <>
            <header id="unalTop">
                <div class="logo">
                    <a href="http://unal.edu.co" target="_blank">
                        <svg width="93%" height="93%">
                            <image href={imageUnal} width="100%" height="100%" class="hidden-print" />
                        </svg>
                    </a>
                </div>
                <div class="seal">
                    <img class="hidden-print" alt="Escudo de la República de Colombia" src={imageEscudoCol} width="66" height="66" />
                </div>
                <div class="firstMenu">
                    <ul class="socialLinks hidden-xs">
                        <li>
                            <a href="https://www.facebook.com/UNColombia" target="_blank" class="facebook" title="Página oficial en Facebook"></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/UNColombia" target="_blank" class="twitter" title="Cuenta oficial en Twitter"></a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/channel/UCnE6Zj2llVxcvL5I38B0Ceg" target="_blank" class="youtube" title="Canal oficial de Youtube"></a>
                        </li>
                        <li>
                            <a href="http://agenciadenoticias.unal.edu.co/nc/sus/type/rss2.html" target="_blank" class="rss" title="Suscripción a canales de información RSS"></a>
                        </li>
                    </ul>
                    <div className="navbar-default">
                        {
                            /*
                          }
                          <nav id="profiles" >
                            <ul className='nav navbar-nav dropdown-menu d-flex flex-row'>
                              <li className="item_Aspirantes #>"><a target="_blank" href="index.html#">Aspirantes</a></li>
                              <li className="item_Estudiantes #>"><a target="_blank" href="index.html#">Estudiantes</a></li>
                              <li className="item_Egresados #>"><a href="index.html#">Egresados</a></li>
                              <li className="item_Docentes #>"><a href="index.html#">Docentes</a></li>
                              <li className="item_Administrativos #>"><a href="index.html#">Administrativos</a></li>
                            </ul>
                          </nav>
                          {
                            */
                        }
                    </div>
                </div>
                <div id="bs-navbar" class="navbar-collapse collapse navigation d-block">
                    <div class="site-url">
                        <p>Unidad administrativa facultad de derecho</p>
                    </div>
                    <div class="mainMenu d-flex justify-content-end">
                        <div class="btn-group">
                            <a href="radica-solicitud" class="btn btn-default" style={{ 'text-transform': 'none' }} >Radicar solicitud</a>
                        </div>
                        <div class="btn-group">
                            <a href="privateZone" class="btn btn-default" style={{ 'text-transform': 'none' }}>Ingresar</a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderUnal