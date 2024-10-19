import React, { useState } from 'react';
import './radicaSolicitud.css'
import { IGenericResponse, IRadicaSolicitudProps } from '../../models/IProps';
import { AuthServices } from '../services/authServices';

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
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
                toast("*El archivo cargado supera los 10 MB")
            }
        }
    }

    const registraSolicitud = () => {
        enviaRegistroSolicitud()
    }

    const enviaRegistroSolicitud = () => {

    }

    const cargaDocumentos = async (fileBase64: string, fileName: string) => {
        // Nom,bre del archio en .TXT
        setCargando(true)
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPostFile(fileBase64, fileName);
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
                <h4 >Información del aspirante</h4>
                <p>A continuación, ingresa la información del titular de la solicitud:</p>
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
                            <p className='p-label-form'> Teléfono: </p>
                            <input placeholder='' className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} autoComplete='off' />
                        </div>
                    </div>
                </div>
                <hr />
                <h4 >Cargar documentación</h4>
                <p>Adjunte la documentación unicamente en formato PDF.</p>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Cargar documento identificación: </p>
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Cargar certificado de libertad y tradición: </p>
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Cargar impuesto predial: </p>
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e)} />
                        </div>
                    </div>
                </div>
                <hr />
                <p>De requerirlo, agregue las observaciones nescesarias a la solicitud:</p>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'></p>
                            <textarea placeholder='' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-bottom-custom'>
                            <button className='btn btn-primary bottom-custom' onClick={() => registraSolicitud()} >Registrar solicitud</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

// CEDULA DE CIUDADANIA
// CERTIFICADO DE LIBERTAD Y TRADICION
// IMPUESTO PREDIAL

// ESTADOS: APTO - NO APTO- PENDIENTE CON OBSERVACION

// BENEFICIOARIO DE LA SOLCITUD -- EJ: ESPOSA

// FASE DE PREAPROBACION

export default RadicaSolicitud