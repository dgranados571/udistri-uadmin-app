import React, { useState } from 'react'
import './configuracion.css'
import { IConfiguracionProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import ConfigMod1 from './configMod1'
import ConfigMod2 from './configMod2'

const Configuracion: React.FC<IConfiguracionProps> = ({ toast, setCargando }) => {

    const [redirectModConfig, setRedirectModConfig] = useState('')

    const validateRedirectModConfig = () => {
        switch (redirectModConfig) {
            case 'CONFIG_MOD_1':
                return (
                    <ConfigMod1 toast={toast} setCargando={setCargando} />
                )
            case 'CONFIG_MOD_2':
                return (
                    <ConfigMod2 toast={toast} setCargando={setCargando} />
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            <div className='div-style-form'>
                <h4>Configuración de parámetros:</h4>
                <p className='mb-4'>Aqui dispondra de módulos de configuración de la aplicación:</p>
                <div className="div-modulos-padre">
                    <div className="div-mod-x">
                        <button className='btn btn-link p-0' onClick={() => { setRedirectModConfig('CONFIG_MOD_1') }}>
                            <FontAwesomeIcon className={redirectModConfig === 'CONFIG_MOD_1' ? 'icon-menu-configuracion-active' : 'icon-menu-configuracion'} icon={faGlobeAmericas} />
                        </button>
                        <p className='p-label-menu-configura'>Municipios</p>
                    </div>

                    <div className="div-mod-x">
                        <button className='btn btn-link p-0' onClick={() => { setRedirectModConfig('CONFIG_MOD_2') }}>
                            <FontAwesomeIcon className={redirectModConfig === 'CONFIG_MOD_2' ? 'icon-menu-configuracion-active' : 'icon-menu-configuracion'} icon={faEnvelope} />
                        </button>
                        <p className='p-label-menu-configura'>Notificaciones</p>
                    </div>
                </div>
                {
                    validateRedirectModConfig()
                }
            </div>
        </>
    )
}

export default Configuracion