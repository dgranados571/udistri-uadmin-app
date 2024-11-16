import React, { useEffect, useRef, useState } from 'react';
import './radicaSolicitud.css'
import { FormDetalleInfoSolicitudHandle, IBeneficiarios, IGenericResponse, IListasSelect, IlPropsModal, IRadicaSolicitudProps } from '../../models/IProps';
import { AuthServices } from '../services/authServices';
import Modal from '../tvs/modal/modal';
import Beneficiarios from '../tvs_private/beneficiarios/beneficiarios';
import FormDetalleInfoSolicitud from '../tvs_private/formDetalleInfoSolicitud/formDetalleInfoSolicitud';

const RadicaSolicitud: React.FC<IRadicaSolicitudProps> = ({ toast, setCargando }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModal, setPropsModal] = useState<IlPropsModal>({
        titulo: '',
        descripcion: '',
    })

    const [descripcion, setDescripcion] = useState('');
    const [municipiosList, setMunicipiosList] = useState<IListasSelect[]>([]);

    const [file1, setFile1] = useState('');
    const [file2, setFile2] = useState('');
    const [file3, setFile3] = useState('');

    const [file1Ref, setFile1Ref] = useState(false);
    const [file2Ref, setFile2Ref] = useState(false);
    const [file3Ref, setFile3Ref] = useState(false);

    const formDetalleInfoSolicitudRef = useRef<FormDetalleInfoSolicitudHandle>(null);

    const file1InputRef = useRef<HTMLInputElement | null>(null);
    const file2InputRef = useRef<HTMLInputElement | null>(null);
    const file3InputRef = useRef<HTMLInputElement | null>(null);

    const [activaBeneficiarios, setActivaBeneficiarios] = useState(false);
    const [beneficiariosList, setBeneficiariosList] = useState<IBeneficiarios[]>([]);

    useEffect(() => {
        obtieneMunicipioService()
    }, [])

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
        let validaForm = false
        if (formDetalleInfoSolicitudRef.current) {
            validaForm = formDetalleInfoSolicitudRef.current.funcionHandle1()
            if(!validaForm){
                formValidado.push('Error formulario');
            }
        } else {
            formValidado.push('Error formulario');
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
            ...propsModal,
            titulo: 'Resumen de la radicación:',
            descripcion: '',
            prop5: file1.length > 0 ? true : false,
            prop6: file2.length > 0 ? true : false,
            prop7: file3.length > 0 ? true : false,
            prop8: beneficiariosList,
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
        if (formDetalleInfoSolicitudRef.current) {
            formDetalleInfoSolicitudRef.current.funcionHandle2()
        }            
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
        setActivaBeneficiarios(false)
    }

    const enviaRegistroSolicitudService = async () => {
        /*
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
            "matriculaInmobiliaria": matriculaInmobiliaria,
            "municipio": municipio
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
        }*/
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

    const obtieneMunicipioService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost({}, 17);
            if (response.estado) {
                const arrayDepartamentos = Array.from(response.objeto);
                const municipiosList = arrayDepartamentos.map((element: any) => {
                    return {
                        value: `${element.departamentoMunObj.id_departamento}:${element.municipioObj.id_municipio}`,
                        label: `${element.municipioObj.municipio} -- ${element.departamentoMunObj.id_departamento}.${element.municipioObj.id_municipio}`
                    }
                })
                setMunicipiosList(municipiosList)
            } else {
                toast(response.mensaje)
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
        }
    }

    return (
        <>
            <div className='div-style-form mt-3'>
                <h4 >Información del aspirante</h4>
                <p>A continuación, ingresa la información del titular de la solicitud:</p>
                <FormDetalleInfoSolicitud ref={formDetalleInfoSolicitudRef} toast={toast} setCargando={setCargando} municipiosList={municipiosList} setPropsModal={setPropsModal} />
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
                <Beneficiarios idProcesamiento='' toast={toast} setCargando={setCargando} setBeneficiariosList={setBeneficiariosList} beneficiariosList={beneficiariosList} setActivaBeneficiarios={setActivaBeneficiarios} activaBeneficiarios={activaBeneficiarios} zonaConsulta='ZONA_PUBLICA' />
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
            </div>
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