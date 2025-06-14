import React, { useState } from 'react'
import './configuracion.css'
import { IConfiguracionProps } from '../../../models/IProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import ConfigMod1 from './configMod1'
import ConfigMod2 from './configMod2'

const Configuracion: React.FC<IConfiguracionProps> = ({ toast, setCargando, zonaConsulta }) => {

    const [redirectModConfig, setRedirectModConfig] = useState('')

    const validateRedirectModConfig = () => {
        switch (redirectModConfig) {
            case 'CONFIG_MOD_1':
                return (
                    <ConfigMod1 toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta} />
                )
            case 'CONFIG_MOD_2':
                return (
                    <ConfigMod2 toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta} />
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
                <div className="row m-0">
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                        <div className='div-targer-admin border-div-targer-admin' onClick={() => { setRedirectModConfig('CONFIG_MOD_1') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faGlobeAmericas} />
                            <div className='div-targer-action'>
                                <p className={redirectModConfig === 'CONFIG_MOD_1' ? 'p-menu-label-active' : 'p-menu-label'}>Municipios</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                        <div className='div-targer-admin border-div-targer-admin' onClick={() => { setRedirectModConfig('CONFIG_MOD_2') }}>
                            <FontAwesomeIcon className='icon-menu-principal' icon={faEnvelope} />
                            <div className='div-targer-action'>
                                <p className={redirectModConfig === 'CONFIG_MOD_2' ? 'p-menu-label-active' : 'p-menu-label'} >Notificaciones</p>
                            </div>
                        </div>
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