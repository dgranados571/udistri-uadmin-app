import React, { useState } from 'react';
import './radicaSolicitud.css'
import { IGenericResponse, IRadicaSolicitudProps } from '../../models/IProps';
import { AuthServices } from '../services/authServices';
import Modal from '../tvs/modal/modal';

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [propsModal, setPropsModal] = useState({})

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [nombresRef, setNombresRef] = useState(false);
    const [apellidosRef, setApellidosRef] = useState(false);
    const [numeroIdentificacionRef, setNumeroIdentificacionRef] = useState(false);
    const [correoRef, setCorreoRef] = useState(false);
    const [telefonoRef, setTelefonoRef] = useState(false);

    const [file1, setFile1] = useState('');
    const [file2, setFile2] = useState('');
    const [file3, setFile3] = useState('');

    const eventInputFiles = (e: React.ChangeEvent<HTMLInputElement>, fileProperty: string) => {
        const fileList = e.target.files;
        let valorFinalMB = 0;
        if (fileList) {
            for (let step = 0; step < fileList.length; step++) {
                var fileSizeMB = fileList[step].size / 1024 / 1024;
                valorFinalMB = valorFinalMB + fileSizeMB;
            }
            if (valorFinalMB < 10) {
                const file = fileList[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (reader.result && typeof reader.result === 'string') {
                            switch (fileProperty) {
                                case 'FILE_1':
                                    setFile1(reader.result)
                                    break;
                                case 'FILE_2':
                                    setFile2(reader.result)
                                    break;
                                case 'FILE_3':
                                    setFile3(reader.result)
                                    break;
                                default:
                                    break;
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                } else {
                    switch (fileProperty) {
                        case 'FILE_1':
                            setFile1('')
                            break;
                        case 'FILE_2':
                            setFile2('')
                            break;
                        case 'FILE_3':
                            setFile3('')
                            break;
                        default:
                            break;
                    }
                }
            } else {
                toast("*El archivo cargado supera los 10 MB")
            }
        }
    }

    const registraSolicitud = () => {
        let formValidado = [];
        setNombresRef(false)
        if (nombres.length === 0) {
            formValidado.push('Nombres');
            setNombresRef(true)
        }
        setApellidosRef(false)
        if (apellidos.length === 0) {
            formValidado.push('Apellidos');
            setApellidosRef(true)
        }
        setNumeroIdentificacionRef(false)
        if (numeroIdentificacion.length === 0) {
            formValidado.push('Numero identificacion');
            setNumeroIdentificacionRef(true)
        }
        setCorreoRef(false)
        if (correo.length === 0) {
            formValidado.push('correo');
            setCorreoRef(true)
        }
        setTelefonoRef(false)
        if (telefono.length === 0) {
            formValidado.push('telefono');
            setTelefonoRef(true)
        }
        if (formValidado.length === 0) {
            enviaRegistroSolicitud()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const enviaRegistroSolicitud = () => {
        setPropsModal({
            titulo: 'Resumen de la solicitud',
            descripcion: 'Esta seguro de eliminar la solicitud: ',
            prop1: `${nombres} ${apellidos}`,
            prop2: numeroIdentificacion,
            prop3: correo,
            prop4: telefono,
            prop5: file1.length > 0 ? true : false,
            prop6: file2.length > 0 ? true : false,
            prop7: file3.length > 0 ? true : false,
        })
        setModalOpen(true)
    }

    const modalSi = () => {
        enviaRegistroSolicitudService()
    }

    const modalNo = () => {
        setModalOpen(false)
    }

    const enviaRegistroSolicitudService = () => {
        setModalOpen(false)
        toast('Buena papa la enviaste')
    }

    const cargaDocumentosService = async (fileBase64: string, fileName: string) => {
        // Nombre del archio en .TXT
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
                            <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} className={nombresRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Apellidos: </p>
                            <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={apellidosRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Cédula: </p>
                            <input type="text" value={numeroIdentificacion} onChange={(e) => setNumeroIdentificacion(e.target.value)} className={numeroIdentificacionRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Correo: </p>
                            <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} className={correoRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Teléfono: </p>
                            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={telefonoRef ? 'form-control form-control-error' : 'form-control'} />
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
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e, 'FILE_1')} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Cargar certificado de libertad y tradición: </p>
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e, 'FILE_2')} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Cargar impuesto predial: </p>
                            <input type="file" className='form-control' onChange={(e) => eventInputFiles(e, 'FILE_3')} />
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

            {
                modalOpen ?
                    <Modal tipoModal='MODAL_RESUMEN_1' modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }

        </>
    )
}

// ESTADOS: APTO - NO APTO- PENDIENTE CON OBSERVACION

// BENEFICIOARIO DE LA SOLCITUD -- EJ: ESPOSA

// FASE DE PREAPROBACION

export default RadicaSolicitud