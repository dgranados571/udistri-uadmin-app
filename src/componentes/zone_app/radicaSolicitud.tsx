import React, { useRef, useState } from 'react';
import './radicaSolicitud.css'
import { IGenericResponse, IRadicaSolicitudProps } from '../../models/IProps';
import { AuthServices } from '../services/authServices';
import Modal from '../tvs/modal/modal';

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
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

    const [file1Ref, setFile1Ref] = useState(false);
    const [file2Ref, setFile2Ref] = useState(false);
    const [file3Ref, setFile3Ref] = useState(false);

    const file1InputRef = useRef<HTMLInputElement | null>(null);
    const file2InputRef = useRef<HTMLInputElement | null>(null);
    const file3InputRef = useRef<HTMLInputElement | null>(null);

    const [activaBeneficiarios, setActivaBeneficiarios] = useState(false);

    const eventInputFiles = (e: React.ChangeEvent<HTMLInputElement>, fileProperty: string) => {
        const fileList = e.target.files;
        switch (fileProperty) {
            case 'FILE_1':
                setFile1Ref(false)
                break;
            case 'FILE_2':
                setFile2Ref(false)
                break;
            case 'FILE_3':
                setFile3Ref(false)
                break;
            default:
                break;
        }
        if (fileList) {
            const file = fileList[0];
            if (file) {
                if (file.type === "application/pdf") {
                    let valorFinalMB = 0;
                    for (let step = 0; step < fileList.length; step++) {
                        var fileSizeMB = fileList[step].size / 1024 / 1024;
                        valorFinalMB = valorFinalMB + fileSizeMB;
                    }
                    if (valorFinalMB < 10) {
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
                        toast("*El archivo cargado supera los 10 MB")
                        switch (fileProperty) {
                            case 'FILE_1':
                                setFile1Ref(true)
                                break;
                            case 'FILE_2':
                                setFile2Ref(true)
                                break;
                            case 'FILE_3':
                                setFile3Ref(true)
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    toast("El archivo cargado no está en formato PDF")
                    switch (fileProperty) {
                        case 'FILE_1':
                            setFile1Ref(true)
                            break;
                        case 'FILE_2':
                            setFile2Ref(true)
                            break;
                        case 'FILE_3':
                            setFile3Ref(true)
                            break;
                        default:
                            break;
                    }
                }
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
        if (file1Ref || file2Ref || file3Ref) {
            formValidado.push('Error de archivos');
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
            titulo: 'Resumen de la radicación:',
            descripcion: '',
            prop1: `${nombres} ${apellidos}`,
            prop2: numeroIdentificacion,
            prop3: correo,
            prop4: telefono,
            prop5: file1.length > 0 ? true : false,
            prop6: file2.length > 0 ? true : false,
            prop7: file3.length > 0 ? true : false,
        })
        setModalOpen(true)
        setTipoModal('MODAL_RESUMEN_1')
    }

    const confirmaRadicacionSolicitud = () => {
        setPropsModal({
            titulo: 'Estado de la solicitud:',
            descripcion: 'Se ha radicado la solicitud de manera satisfactoria',
        })
        setModalOpen(true)
        setTipoModal('MODAL_CONTROL_1')
    }

    const modalSi = () => {
        enviaRegistroSolicitudService()
    }

    const modalNo = () => {
        setModalOpen(false)
        setTipoModal('')
    }

    const resetForm = () => {
        setNombres('')
        setApellidos('')
        setNumeroIdentificacion('')
        setCorreo('')
        setTelefono('')
        setDescripcion('')
        setFile1('')
        setFile2('')
        setFile3('')
        if (file1InputRef.current) {
            file1InputRef.current.value = "";
        }
        if (file2InputRef.current) {
            file2InputRef.current.value = "";
        }
        if (file3InputRef.current) {
            file3InputRef.current.value = "";
        }
        setNombresRef(false)
        setApellidosRef(false)
        setNumeroIdentificacionRef(false)
        setCorreoRef(false)
        setTelefonoRef(false)
    }

    const enviaRegistroSolicitudService = async () => {
        setModalOpen(false)
        setTipoModal('')
        setCargando(true)
        const body = {
            "nombres": nombres,
            "apellidos": apellidos,
            "numeroIdentificacion": numeroIdentificacion,
            "correo": correo,
            "telefono": telefono,
            "descripcion": descripcion
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 1);
            toast(response.mensaje)
            if (response.estado) {
                await cargaDocumentos(response.objeto)
                resetForm()
                confirmaRadicacionSolicitud()
            }
            setCargando(false)
        } catch (error) {
            toast('No es posible crear la solicitud, contacte al administrador')
            setCargando(false)
        }
    }

    const cargaDocumentos = async (idProcesamiento: string) => {
        const uploadFile1 = file1.length > 0 ? true : false;
        if (uploadFile1) {
            const pathFinal1 = `OT_UADMIN/${idProcesamiento}/${idProcesamiento}_1.txt`;
            await cargaDocumentosService(file1, pathFinal1, 'DOCUMENTO')
        }

        const uploadFile2 = file2.length > 0 ? true : false;
        if (uploadFile2) {
            const pathFinal2 = `OT_UADMIN/${idProcesamiento}/${idProcesamiento}_2.txt`;
            await cargaDocumentosService(file2, pathFinal2, 'CERTIFICADO DE LIBERTAD')
        }

        const uploadFile3 = file3.length > 0 ? true : false;
        if (uploadFile3) {
            const pathFinal3 = `OT_UADMIN/${idProcesamiento}/${idProcesamiento}_3.txt`;
            await cargaDocumentosService(file3, pathFinal3, 'IMPUESTO PREDIAL')
        }
    }

    const cargaDocumentosService = async (fileBase64: string, fileName: string, idArchivo: string) => {
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPostFile(fileBase64, fileName);
            if (response.estado) {
                toast(`El archivo: ${idArchivo}, fue cargado satisfactoriamente`)
            } else {
                toast(`No fue posible cargar el archivo: ${idArchivo}`)
            }
        } catch (error) {
            toast(`No fue posible cargar el archivo: ${idArchivo}`)
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
                            <p className='p-label-form'> Aqui el documento: </p>
                            <input ref={file1InputRef} type="file" onChange={(e) => eventInputFiles(e, 'FILE_1')} className={file1Ref ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Aqui el certificado de libertad y tradición: </p>
                            <input ref={file2InputRef} type="file" onChange={(e) => eventInputFiles(e, 'FILE_2')} className={file2Ref ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Aqui el impuesto predial: </p>
                            <input ref={file3InputRef} type="file" onChange={(e) => eventInputFiles(e, 'FILE_3')} className={file3Ref ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                </div>
                <hr />


                <div className="div-info-beneficiarios">
                    <h4 >La solicitud incluye beneficiarios?</h4>
                    <div className={activaBeneficiarios ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => setActivaBeneficiarios(!activaBeneficiarios)} >
                        <div className={activaBeneficiarios ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
                    </div>
                </div>
                <div className={activaBeneficiarios ? "div-form-beneficiarios-active" : "div-form-beneficiarios"} >
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                            <div className='div-form'>
                                <p className='p-label-form'>Nombres: </p>
                                <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} className={nombresRef ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                            <div className='div-form'>
                                <p className='p-label-form'>Cédula: </p>
                                <input type="text" value={numeroIdentificacion} onChange={(e) => setNumeroIdentificacion(e.target.value)} className={numeroIdentificacionRef ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                            <div className='div-form'>
                                <p className='p-label-form'> Aqui el documento: </p>
                                <input ref={file1InputRef} type="file" onChange={(e) => eventInputFiles(e, 'FILE_BENEFICIARIO')} className={file1Ref ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                    </div>
                </div>


                
                <hr />
                <p>De requerirlo, agregue las observaciones nescesarias a la solicitud:</p>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'></p>
                            <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-bottom-custom'>
                            <button className='btn btn-primary bottom-custom' onClick={() => registraSolicitud()} >Registrar solicitud</button>
                        </div>
                    </div>
                </div>
            </div >
            {
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }

        </>
    )
}

export default RadicaSolicitud