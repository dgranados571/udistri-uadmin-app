import React, { useState } from 'react'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoBase64 } from './imgLogo'
import { IZoneProps } from '../../models/IProps';
import Login from './login';
import { useNavigate } from 'react-router-dom';

const LoginIndex: React.FC<IZoneProps> = () => {

    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false)

    return (
        <>
            <ToastContainer autoClose={8000} hideProgressBar={true} />
            <div className='div-container'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                        <div className='div-logo'>
                            <img src={logoBase64} alt='logoFranco' className='img-logo-franco-osorio'></img>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
                        <div className='div-menu-principal'>
                            <button className='btn btn-link a-link-custom' onClick={() => navigate('/radica-solicitud')}  >Registrar solicitud</button>
                            <button className='btn btn-link a-link-custom-active' >Gestionar solicitudes</button>
                        </div>
                    </div>
                </div>
                <Login toast={toast} setCargando={setCargando} />
            </div>
            {
                cargando ?
                    <Cargando />
                    :
                    <></>
            }
        </>
    )
}

export default LoginIndex