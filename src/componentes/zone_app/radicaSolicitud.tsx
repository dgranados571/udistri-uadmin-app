import React, { useRef, useState } from 'react';
import './radicaSolicitud.css'
import { FormDetalleInfoSolicitudHandle, IBeneficiarios, IGenericResponse, IlPropsModal, IRadicaSolicitudProps } from '../../models/IProps';
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
        let validaForm = null;
        if (formDetalleInfoSolicitudRef.current) {
            validaForm = formDetalleInfoSolicitudRef.current.funcionHandle1()
            if (!validaForm) {
                formValidado.push('Error formulario');
            }
        } else {
            formValidado.push('Error formulario');
        }
        if (file1Ref || file2Ref || file3Ref) {
            formValidado.push('Error de archivos');
        }
        if (formValidado.length === 0) {
            setPropsModal({
                titulo: 'Resumen de la radicación:',
                descripcion: '',
                prop0: validaForm.prop0,
                prop1: validaForm.prop1,
                prop2: validaForm.prop2,
                prop3: validaForm.prop3,
                prop4: validaForm.prop4,
                prop5: file1.length > 0 ? true : false,
                prop6: file2.length > 0 ? true : false,
                prop7: file3.length > 0 ? true : false,
                prop8: beneficiariosList,
                prop9: validaForm.prop9,
                prop10: validaForm.prop10,
            })
            setModalOpen(true)
            setTipoModal('MODAL_RESUMEN_1')
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const modalSi = () => {
        enviaRegistroSolicitudService()
    }

    const modalNo = () => {
        setModalOpen(false)
        setTipoModal('')
    }

    const confirmaRadicacionSolicitud = () => {
        setPropsModal({
            titulo: 'Estado de la solicitud:',
            descripcion: 'Se ha radicado la solicitud de manera satisfactoria',
        })
        setModalOpen(true)
        setTipoModal('MODAL_CONTROL_1')
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
        setModalOpen(false)
        setTipoModal('')
        setCargando(true)
        const body = {
            "nombres": propsModal.prop0,
            "apellidos": propsModal.prop1,
            "numeroIdentificacion": propsModal.prop2,
            "correo": propsModal.prop3,
            "telefono": propsModal.prop4,
            "descripcion": descripcion,
            "beneficiariosList": beneficiariosList,
            "matriculaInmobiliaria": propsModal.prop9,
            "municipio": propsModal.prop10
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
        let formValidado = [];
        const uploadFile1 = file1.length > 0 ? true : false;
        if (uploadFile1) {
            const pathFinal1 = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_1.txt`;
            const uploadSucces = await cargaDocumentosService(file1, pathFinal1, idProcesamiento)
            if (!uploadSucces) {
                formValidado.push('Error cargando Archivo DOCUMENTO');
            }
        }

        const uploadFile2 = file2.length > 0 ? true : false;
        if (uploadFile2) {
            const pathFinal2 = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_2.txt`;
            const uploadSucces = await cargaDocumentosService(file2, pathFinal2, idProcesamiento)
            if (!uploadSucces) {
                formValidado.push('Error formulario CERTIFICADO DE LIBERTAD');
            }
        }

        const uploadFile3 = file3.length > 0 ? true : false;
        if (uploadFile3) {
            const pathFinal3 = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_3.txt`;
            const uploadSucces = await cargaDocumentosService(file3, pathFinal3, idProcesamiento)
            if (!uploadSucces) {
                formValidado.push('Error formulario IMPUESTO PREDIAL');
            }
        }

        for (let i = 0; i < beneficiariosList.length; i++) {
            if (beneficiariosList[i].documentoPdfBen.length > 0) {
                const pathBeneficiarioX = `OT_UADMIN/${idProcesamiento}/MODULO_BEN/${idProcesamiento}_${i}.txt`;
                const uploadSucces = await cargaDocumentosService(beneficiariosList[i].documentoPdfBen, pathBeneficiarioX, idProcesamiento)
                if (!uploadSucces) {
                    formValidado.push(`Error formulario DOCUMENTO beneficiario: ${beneficiariosList[i].nombresBen}`);
                }
            }
        }
        if (formValidado.length === 0) {
            toast(`Los archivos fueron cargados satisfactoriamente`)
        } else {
            formValidado.splice(0, formValidado.length)
            toast(`Existieron algunos errores cargando los documnetos, porfavor contacte al administrador`)
        }

    }

    const cargaDocumentosService = async (fileBase64: string, fileName: string, idProcesamiento: string) => {
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPostFile(fileBase64, fileName);
            if (response.estado) {
                return true
            } else {                            
                await controlRegistroBeneficiariosService(idProcesamiento, fileName)
                return false
            }
        } catch (error) {            
            await controlRegistroBeneficiariosService(idProcesamiento, fileName)
            return false
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

    return (
        <>
            <div className='div-style-form mt-3'>
                <h4 >Información del aspirante</h4>
                <p>A continuación, ingresa la información del titular de la solicitud:</p>
                <FormDetalleInfoSolicitud ref={formDetalleInfoSolicitudRef} toast={toast} setCargando={setCargando}
                    zonaConsulta='ZONA_PUBLICA' />
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
                <Beneficiarios idProcesamiento='' toast={toast} setCargando={setCargando}
                    setBeneficiariosList={setBeneficiariosList}
                    beneficiariosList={beneficiariosList}
                    setActivaBeneficiarios={setActivaBeneficiarios}
                    activaBeneficiarios={activaBeneficiarios} zonaConsulta='ZONA_PUBLICA' />
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
                            <button className='btn btn-primary bottom-custom' onClick={() => registraSolicitud()} >Registrar</button>
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