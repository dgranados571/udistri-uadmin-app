import React, { useRef, useState } from 'react';
import './radicaSolicitud.css'
import { IBeneficiarios, IGenericResponse, IlPropsModal, IRadicaSolicitudProps } from '../../models/IProps';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthServices } from '../services/authServices';
import Modal from '../tvs/modal/modal';

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModal, setPropsModal] = useState<IlPropsModal>({
        titulo: '',
        descripcion: '',
    })

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [matriculaInmobiliaria, setMatriculaInmobiliaria] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [nombresRef, setNombresRef] = useState(false);
    const [apellidosRef, setApellidosRef] = useState(false);
    const [numeroIdentificacionRef, setNumeroIdentificacionRef] = useState(false);
    const [correoRef, setCorreoRef] = useState(false);
    const [telefonoRef, setTelefonoRef] = useState(false);
    const [matriculaInmobiliariaRef, setMatriculaInmobiliariaRef] = useState(false);

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

    const [nombresBeneficiario, setNombresBeneficiario] = useState('');
    const [numIdentificacionBeneficiario, setNumIdentificacionBeneficiario] = useState('');

    const [nombresBeneficiarioRef, setNombresBeneficiarioRef] = useState(false);
    const [numIdentificacionBeneficiarioRef, setNumIdentificacionBeneficiarioRef] = useState(false);

    const [fileBeneficiario, setFileBeneficiario] = useState('');
    const [fileBeneficiarioRef, setFileBeneficiarioRef] = useState(false);
    const fileBeneficiarioInputRef = useRef<HTMLInputElement | null>(null);

    const [beneficiariosList, setBeneficiariosList] = useState<IBeneficiarios[]>([]);

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

    const activaVistaBeneficiario = () => {
        setActivaBeneficiarios(!activaBeneficiarios)
        if (activaBeneficiarios) {
            resetFormBeneficiario()
        }
    }

    const resetFormBeneficiario = () => {
        setNombresBeneficiario('')
        setNumIdentificacionBeneficiario('')
        setFileBeneficiario('')
        if (fileBeneficiarioInputRef.current) {
            fileBeneficiarioInputRef.current.value = ""
        }
        setNombresBeneficiarioRef(false)
        setNumIdentificacionBeneficiarioRef(false)
        setFileBeneficiarioRef(false)
        setBeneficiariosList([])
    }

    const eventInputFilesBeneficiario = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        setFileBeneficiarioRef(false)
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
                                setFileBeneficiario(reader.result)
                            }
                        };
                        reader.readAsDataURL(file);
                    } else {
                        toast("*El archivo cargado supera los 10 MB")
                        setFileBeneficiarioRef(true)
                    }
                } else {
                    toast("El archivo cargado no está en formato PDF")
                    setFileBeneficiarioRef(true)
                }
            } else {
                setFileBeneficiario('')
            }
        }
    }

    const agregaBeneficiarioAction = () => {
        let formValidado = [];
        setNombresBeneficiarioRef(false)
        if (nombresBeneficiario.length === 0) {
            setNombresBeneficiarioRef(true)
            formValidado.push('Nombres Beneficiario');
        }
        setNumIdentificacionBeneficiarioRef(false)
        if (numIdentificacionBeneficiario.length === 0) {
            setNumIdentificacionBeneficiarioRef(true)
            formValidado.push('Num Identificacion Beneficiario');
        }
        if (fileBeneficiarioRef) {
            formValidado.push('Error de archivos');
        }
        if (formValidado.length === 0) {
            const benneficiarioObj: IBeneficiarios = {
                nombresBen: nombresBeneficiario,
                identificacionBen: numIdentificacionBeneficiario,
                documentoPdfBen: fileBeneficiario,
                registraDocPdf: fileBeneficiario.length > 0 ? true : false
            }
            setBeneficiariosList([...beneficiariosList, benneficiarioObj])
            setNombresBeneficiario('')
            setNumIdentificacionBeneficiario('')
            setFileBeneficiario('')
            if (fileBeneficiarioInputRef.current) {
                fileBeneficiarioInputRef.current.value = ""
            }
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
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
        setMatriculaInmobiliariaRef(false)
        if (matriculaInmobiliaria.length === 0) {
            formValidado.push('matriculaInmobiliaria');
            setMatriculaInmobiliariaRef(true)
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
            prop8: beneficiariosList,
            prop9: matriculaInmobiliaria
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
        resetFormBeneficiario()
        setActivaBeneficiarios(false)
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
            "descripcion": descripcion,
            "beneficiariosList": beneficiariosList,
            "matriculaInmobiliaria": matriculaInmobiliaria
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 1);
            if (response.estado) {
                toast(response.mensaje)
                await cargaDocumentos(response.objeto)
                resetForm()
                confirmaRadicacionSolicitud()
            } else {
                erroRadicacionSolicitud(response.mensaje)
            }
            setCargando(false)
        } catch (error) {
            toast('No es posible crear la solicitud, contacte al administrador')
            setCargando(false)
        }
    }

    const erroRadicacionSolicitud = (descripcionError: string) => {
        setPropsModal({
            titulo: 'Error en la solicitud:',
            descripcion: descripcionError,
        })
        setModalOpen(true)
        setTipoModal('MODAL_CONTROL_1')
    }

    const cargaDocumentos = async (idProcesamiento: string) => {
        const uploadFile1 = file1.length > 0 ? true : false;
        if (uploadFile1) {
            const pathFinal1 = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_1.txt`;
            await cargaDocumentosService(file1, pathFinal1, 'DOCUMENTO', idProcesamiento)
        }

        const uploadFile2 = file2.length > 0 ? true : false;
        if (uploadFile2) {
            const pathFinal2 = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_2.txt`;
            await cargaDocumentosService(file2, pathFinal2, 'CERTIFICADO DE LIBERTAD', idProcesamiento)
        }

        const uploadFile3 = file3.length > 0 ? true : false;
        if (uploadFile3) {
            const pathFinal3 = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_3.txt`;
            await cargaDocumentosService(file3, pathFinal3, 'IMPUESTO PREDIAL', idProcesamiento)
        }

        for (let i = 0; i < beneficiariosList.length; i++) {
            if (beneficiariosList[i].documentoPdfBen.length > 0) {
                const pathBeneficiarioX = `OT_UADMIN/${idProcesamiento}/MODULO_BEN/${idProcesamiento}_${i}.txt`;
                await cargaDocumentosService(beneficiariosList[i].documentoPdfBen, pathBeneficiarioX, `DOCUMENTO beneficiario: ${beneficiariosList[i].nombresBen}`, idProcesamiento)
            }
        }

    }

    const cargaDocumentosService = async (fileBase64: string, fileName: string, idArchivo: string, idProcesamiento: string) => {
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPostFile(fileBase64, fileName);
            if (response.estado) {
                toast(`El archivo: ${idArchivo}, fue cargado satisfactoriamente`)
            } else {
                toast(`No fue posible cargar el archivo: ${idArchivo}`)
                await controlRegistroBeneficiariosService(idProcesamiento, fileName)
            }
        } catch (error) {
            toast(`No fue posible cargar el archivo: ${idArchivo}`)
            await controlRegistroBeneficiariosService(idProcesamiento, fileName)
        }
    }

    const controlRegistroBeneficiariosService = async (idProcesamiento: string, fileName: string) => {
        const authServices = new AuthServices();
        const body = {
            "idProcesamiento": idProcesamiento,
            "urlTxt": fileName
        }
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 13);
            if (!response.estado) {
                toast('No es posible consultar información, contacte al administrador')
            }
        } catch (error) {
            toast('No es posible consultar información, contacte al administrador')
        }
    }

    const labelArchivosCargados = (prop: boolean) => {
        if (prop) {
            return (
                <div className='div-info-item-ben'>
                    <p className=''>Si registra documento</p>
                    <FontAwesomeIcon icon={faCheckCircle} className='icon-modal-info-true' />
                </div>
            )
        } else {
            return (
                <div className='div-info-item-ben'>
                    <p className=''>No registra documento</p>
                    <FontAwesomeIcon icon={faXmarkCircle} className='icon-modal-info-false' />
                </div>
            )
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
                            <p className='p-label-form'>Apellidos: </p>
                            <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={apellidosRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'>Nombres: </p>
                            <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} className={nombresRef ? 'form-control form-control-error' : 'form-control'} />
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
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Matricula inmobiliaria: </p>
                            <input type="text" value={matriculaInmobiliaria} onChange={(e) => setMatriculaInmobiliaria(e.target.value)} className={matriculaInmobiliariaRef ? 'form-control form-control-error' : 'form-control'} />
                        </div>
                    </div>
                </div>
                <hr />
                <h4 >Cargar documentación</h4>
                <p>Adjunte la documentación del titular unicamente en formato PDF.</p>
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
                    <div className={activaBeneficiarios ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => activaVistaBeneficiario()} >
                        <div className={activaBeneficiarios ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
                    </div>
                </div>
                <div className={activaBeneficiarios ? "div-form-beneficiarios-active" : "div-form-beneficiarios"} >
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Nombres del beneficiario: </p>
                                <input type="text" value={nombresBeneficiario} onChange={(e) => setNombresBeneficiario(e.target.value)} className={nombresBeneficiarioRef ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Cédula beneficiario: </p>
                                <input type="text" value={numIdentificacionBeneficiario} onChange={(e) => setNumIdentificacionBeneficiario(e.target.value)} className={numIdentificacionBeneficiarioRef ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Aqui el documento: </p>
                                <input ref={fileBeneficiarioInputRef} type="file" onChange={(e) => eventInputFilesBeneficiario(e)} className={fileBeneficiarioRef ? 'form-control form-control-error' : 'form-control'} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                            <div className='div-bottom-custom'>
                                <button className='btn btn-primary bottom-custom' onClick={() => { agregaBeneficiarioAction() }} >Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row">
                        {
                            beneficiariosList.map((benficiario, ind) => {
                                return (
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                                        <div className='p-label-form' >
                                            <p>Beneficiario {ind + 1}</p>
                                        </div>
                                        <div className='' >
                                            <p>{benficiario.nombresBen}</p>
                                        </div>
                                        <div className='' >
                                            {benficiario.identificacionBen}
                                        </div>
                                        {
                                            labelArchivosCargados(benficiario.documentoPdfBen.length > 0)
                                        }
                                    </div>
                                )
                            })
                        }
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