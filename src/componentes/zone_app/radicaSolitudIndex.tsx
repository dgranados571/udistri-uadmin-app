import React, { useState } from 'react'
import RadicaSolicitud from './radicaSolicitud'
import { Cargando } from '../tvs/loader/cargando'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoBase64 } from './imgLogo'
import { IZoneProps } from '../../models/IProps';
import { useNavigate } from 'react-router-dom';
import { faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RadicaSolitudIndex: React.FC<IZoneProps> = () => {

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
                        <div className="row m-0">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                                <div className='div-targer-admin'>
                                    <FontAwesomeIcon className='icon-menu-principal' icon={faFolderOpen} />
                                    <div className='div-targer-action'>
                                        <p className= 'p-menu-label-active'>Registrar solicitud</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 div-targer-admin-padre" >
                                <div className='div-targer-admin' onClick={() => { navigate('/login') }}>
                                    <FontAwesomeIcon className='icon-menu-principal' icon={faUser} />
                                    <div className='div-targer-action'>
                                        <p className='p-menu-label' >Ingresar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RadicaSolicitud toast={toast} setCargando={setCargando} />
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

export default RadicaSolitudIndex