import React, { useState } from 'react';
import './radicaSolicitud.css'
import { IGenericResponse, IRadicaSolicitudProps } from '../../models/IProps';
import { AuthServices } from '../services/authServices';

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [responsable, setResponsable] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [base64, setBase64] = useState('');

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
                const file = fileList[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result && typeof reader.result === 'string') {
                        setBase64(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                toast("*Los archivos cargados superan las 10 MB")
            }
        }
    }

    const registraSolicitud = () => {
        enviaRegistroSolicitud()
    }

    const enviaRegistroSolicitud = async () => {
        setCargando(true)
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPostFile(base64, 'miArchiDesdeReact.txt');
            toast(response.mensaje)
            setCargando(false)
        } catch (error) {
            toast('No es posible eliminar la solicitud, contacte al administrador')
            setCargando(false)
        }
    }

    return (
        <>
            <div className='div-style-form mt-3'>
                <p >A continuación, ingresa la información de la solicitud que deseas registrar:</p>
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
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-bottom-custom'>
                            <button className='btn btn-primary bottom-custom' onClick={() => registraSolicitud()} >Registrar solicitud</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {base64 && (
                    <div>
                        <h3>Archivo en Base64:</h3>
                        <textarea rows={10} cols={50} value={base64} readOnly />
                    </div>
                )}
            </div>
        </>
    )
}

export default RadicaSolicitud