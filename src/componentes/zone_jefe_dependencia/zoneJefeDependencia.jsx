import  { useState } from 'react'
import UsuariosApp from '../tvs_private/usuarios/usuariosApp';
import Solicitudes from '../tvs_private/solicitudes/solicitudes';

const ZoneJefeDependencia = ({ toast, setCargando }) => {

    const [stateMenu, setStateMenu] = useState({
        menuPadre: 'MENU1',
        menuHijo: ''
    });

    const componentMenu = () => {
        switch (stateMenu.menuPadre) {
            case 'MENU1':
                return (
                    <div className='div-container'>
                        <Solicitudes toast={toast} setCargando={setCargando} zonaConsulta='ZoneJefeDependencia' />
                    </div>
                )
            case 'MENU2':
                return (
                    <div className='div-container'>
                        <UsuariosApp toast={toast} setCargando={setCargando} />
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
            {
                componentMenu()
            }
        </>
    )
}

export default ZoneJefeDependencia