import React, { useState } from 'react'
import {logoBase64} from './imgLogo'
import { UtilUrl } from '../../utilUrl';
import { IRadicaSolicitudProps } from '../../models/IProps';
import './radicaSolicitud.css'

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const { url, apiLambda } = UtilUrl();

    const [menuSelected, setMenuSelected] = useState('REGISTRA_SOLICITUD');

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [responsable, setResponsable] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [archivos, setArchivos] = useState<FileList | null>(null);

    const eventInputFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        let valorFinalMB = 0;
        if (fileList) {
            for (let step = 0; step < fileList.length; step++) {
                var fileSizeMB = fileList[step].size / 1024 / 1024;
                valorFinalMB = valorFinalMB + fileSizeMB;
            }
            console.log('Longitud de archivos --> ', valorFinalMB)
            if (valorFinalMB < 10) {
                setArchivos(fileList)
            } else {
                toast("*Los archivos cargados superan las 10 MB")
            }
        }
    }

    const registraSolicitud = () => {
        enviaRegistroSolicitud()
    }

    const enviaRegistroSolicitud = async () => {

    }

    const controlMenu = () => {
        switch (menuSelected) {
            case 'REGISTRA_SOLICITUD':
                return (
                    <>
                        <button className='btn btn-link a-link-custom-active' onClick={() => setMenuSelected('REGISTRA_SOLICITUD')} >Registrar solicitud</button>
                        <button className='btn btn-link a-link-custom' onClick={() => setMenuSelected('GESTIONAR_SOLCITUD')} >Gestionar solicitudes</button>
                    </>
                )
            case 'GESTIONAR_SOLCITUD':
                return (
                    <>
                        <button className='btn btn-link a-link-custom' onClick={() => setMenuSelected('REGISTRA_SOLICITUD')} >Registrar solicitud</button>
                        <button className='btn btn-link a-link-custom-active' onClick={() => setMenuSelected('GESTIONAR_SOLCITUD')} >Gestionar solicitudes</button>
                    </>
                )
            default:
                break;
        }

    }

    return (
        <>
            <div className='div-container'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                        <div className='div-logo'>
                            <img src={logoBase64} alt='logoFranco' className='img-logo-franco-osorio'></img>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
                        <div className='div-menu-principal'>
                            {
                                controlMenu()
                            }
                        </div>
                    </div>
                </div>
                <div className='div-style-form'>
                    <p >A continuación, ingresa la información de la solicitud que deseas registrar:</p>
                    <br />
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Nombres: </p>
                                <input type="text" className='form-control' value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder='' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Apellidos: </p>
                                <input type="text" className='form-control' value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder='' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Cédula: </p>
                                <input placeholder='' className='form-control' value={numeroIdentificacion} onChange={(e) => setNumeroIdentificacion(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Correo: </p>
                                <input placeholder='' className='form-control' value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Responsable: </p>
                                <input placeholder='' className='form-control' value={responsable} onChange={(e) => setResponsable(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Descripción de la solicitud: </p>
                                <textarea placeholder='' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-bottom-custom'>
                                <input type="file" className='form-control' multiple onChange={(e) => eventInputFiles(e)} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-bottom-custom'>
                                <button className='btn btn-primary bottom-custom' onClick={() => registraSolicitud()} >Registrar solicitud</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadicaSolicitud