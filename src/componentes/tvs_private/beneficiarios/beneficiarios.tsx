import React, { useEffect, useRef, useState } from 'react'
import { IBeneficiarios, IBeneficiariosProps, IGenericResponse } from '../../../models/IProps';
import { faCheckCircle, faXmarkCircle, faFilePdf, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthServices } from '../../services/authServices';

const Beneficiarios: React.FC<IBeneficiariosProps> = ({ idProcesamiento, toast, setCargando,
    setBeneficiariosList, beneficiariosList, setActivaBeneficiarios, activaBeneficiarios, zonaConsulta }) => {

    const [nombresBeneficiario, setNombresBeneficiario] = useState('');
    const [numIdentificacionBeneficiario, setNumIdentificacionBeneficiario] = useState('');

    const [nombresBeneficiarioRef, setNombresBeneficiarioRef] = useState(false);
    const [numIdentificacionBeneficiarioRef, setNumIdentificacionBeneficiarioRef] = useState(false);

    const [fileBeneficiario, setFileBeneficiario] = useState('');
    const [fileBeneficiarioRef, setFileBeneficiarioRef] = useState(false);
    const fileBeneficiarioInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!activaBeneficiarios) {
            resetFormBeneficiarioAction()
            if (zonaConsulta === 'ZONA_PUBLICA') {
                setBeneficiariosList([])
            }
        }
    }, [activaBeneficiarios])

    const resetFormBeneficiarioAction = () => {
        setNombresBeneficiario('')
        setNumIdentificacionBeneficiario('')
        setFileBeneficiario('')
        if (fileBeneficiarioInputRef.current) {
            fileBeneficiarioInputRef.current.value = ""
        }
        setNombresBeneficiarioRef(false)
        setNumIdentificacionBeneficiarioRef(false)
        setFileBeneficiarioRef(false)
    }

    const activaVistaBeneficiario = () => {
        setActivaBeneficiarios(!activaBeneficiarios)
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
            if (zonaConsulta === 'ZONA_PUBLICA') {
                const benneficiarioObj: IBeneficiarios = {
                    nombresBen: nombresBeneficiario,
                    identificacionBen: numIdentificacionBeneficiario,
                    documentoPdfBen: fileBeneficiario,
                    registraDocPdf: fileBeneficiario.length > 0 ? true : false
                }
                setBeneficiariosList([...beneficiariosList, benneficiarioObj])
                resetFormBeneficiarioAction()
            } else {
                enviaRegistroBeneficiarioService()
            }
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const enviaRegistroBeneficiarioService = async () => {
        setCargando(true)
        const body = {
            "nombresBen": nombresBeneficiario,
            "identificacionBen": numIdentificacionBeneficiario,
            "registraDocPdf": fileBeneficiario.length > 0 ? true : false,
            "idProcesamiento": idProcesamiento
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 19);
            toast(response.mensaje)
            if (response.estado) {
                if (fileBeneficiario.length > 0) {
                    await cargaDocumentos(idProcesamiento, response.objeto)
                }
                resetFormBeneficiarioAction()                           
                await consultaBeneficiarioService()
                setActivaBeneficiarios(false)
            }
            setCargando(false)
        } catch (error) {
            toast('No es posible crear la solicitud, contacte al administrador')
            setCargando(false)
        }
    }

    const consultaBeneficiarioService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const body = {
                "idProcesamiento": idProcesamiento
            }
            const response: IGenericResponse = await authServices.requestPost(body, 21);
            if (response.estado) {
                setBeneficiariosList(response.objeto)
            } else {
                toast(response.mensaje);
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
        }
    }

    const cargaDocumentos = async (idProcesamiento: string, i: number) => {
        const pathBeneficiarioX = `OT_UADMIN/${idProcesamiento}/MODULO_BEN/${idProcesamiento}_${i}.txt`;
        await cargaDocumentosService(fileBeneficiario, pathBeneficiarioX, `DOCUMENTO beneficiario: ${nombresBeneficiario}`)
    }

    const cargaDocumentosService = async (fileBase64: string, fileName: string, idArchivo: string) => {
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
                    <p className=''>Si registra PDF</p>
                    <FontAwesomeIcon icon={faCheckCircle} className='icon-modal-info-true' />
                </div>
            )
        } else {
            return (
                <div className='div-info-item-ben'>
                    <p className=''>No registra PDF</p>
                    <FontAwesomeIcon icon={faXmarkCircle} className='icon-modal-info-false' />
                </div>
            )
        }
    }

    const tituloDescripcionHeader = () => {
        if (zonaConsulta === 'ZONA_PUBLICA') {
            return (
                <>
                    <h4 >La solicitud incluye beneficiarios?</h4>
                </>
            )
        } else {
            return (
                <>
                    <h4 className='titulo-form'>Beneficiarios de la solicitud: </h4>
                    <p className='mb-1'>A continuación, encontrará el detalle de los beneficiarios asociados a la solicitud: </p>
                </>
            )
        }
    }

    const consultaPDF = async (urlTxt: string | undefined) => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const body = {
                "urlTxt": urlTxt,
            }
            const response: IGenericResponse = await authServices.requestPost(body, 12);
            if (response.estado) {
                handleOpenPDF(response.objeto)
            } else {
                toast(response.mensaje);
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
        }
    }

    const handleOpenPDF = (pdfInBase64: string) => {
        const byteCharacters = atob((pdfInBase64.split(",")[1]))
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const pdfBlobUrl = URL.createObjectURL(blob);
        window.open(pdfBlobUrl, '_blank');
    };

    const eliminarBeneficiarios = async (beneficiario: IBeneficiarios) => {
        await eliminarBeneficiariosService(beneficiario)
    }

    const eliminarBeneficiariosService = async (beneficiario: IBeneficiarios) => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const body = {
                "idProcesamiento": idProcesamiento,
                "beneficiariosDto": beneficiario
            }
            const response: IGenericResponse = await authServices.requestPost(body, 20);
            toast(response.mensaje);
            if (response.estado) {
                setBeneficiariosList(response.objeto)
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
        }
    }

    return (
        <>
            <div className="div-info-beneficiarios">
                <div className="">
                    {
                        tituloDescripcionHeader()
                    }
                </div>
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
                        beneficiariosList.map((beneficiario, ind) => {
                            return (
                                <div className="col-12 col-sm-12 col-md-12 col-lg-4" >
                                    <div className='d-flex justify-content-between align-items-start p-label-form' >
                                        <p>Beneficiario {ind + 1}</p>
                                    </div>
                                    <div className='d-flex justify-content-start align-items-start' >
                                        <p className='p-label-form m-0'> Nombre: </p>
                                        <p className='mx-2'> {beneficiario.nombresBen} </p>
                                    </div>
                                    {
                                        zonaConsulta === 'ZONA_PUBLICA' ?
                                            <>
                                                <div className='d-flex justify-content-start' >
                                                    <p className='p-label-form m-0'>Documento No: </p>
                                                    <p className='mx-2'> {beneficiario.identificacionBen} </p>
                                                </div>
                                                {
                                                    labelArchivosCargados(beneficiario.documentoPdfBen.length > 0)
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    beneficiario.registraDocPdf ?
                                                        <div className="d-flex justify-content-between">
                                                            <p className='p-label-form m-0'>Documento No: </p>
                                                            <p className='mx-2'>{beneficiario.identificacionBen} </p>
                                                            <button className='btn btn-link bottom-custom-link p-0' onClick={() => consultaPDF(beneficiario.documentosDto?.urlTxt)}>
                                                                <FontAwesomeIcon className='icons-table-ds' icon={faFilePdf} />
                                                            </button>
                                                            <button className='btn btn-link p-0' onClick={() => eliminarBeneficiarios(beneficiario)}>
                                                                <FontAwesomeIcon className='icons-table' icon={faTrash} />
                                                            </button>
                                                        </div>
                                                        :
                                                        <div className="d-flex justify-content-between">
                                                            <p className='p-label-form m-0'>Documento No: </p>
                                                            <p> {beneficiario.identificacionBen} </p>
                                                            <button className='btn btn-link p-0' onClick={() => eliminarBeneficiarios(beneficiario)}>
                                                                <FontAwesomeIcon className='icons-table' icon={faTrash} />
                                                            </button>
                                                        </div>
                                                }
                                            </>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Beneficiarios