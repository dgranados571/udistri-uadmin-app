import React, { useEffect, useRef, useState } from 'react'
import './solicitudes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faRotateLeft, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

import { FormDetalleInfoSolicitudHandle, IBeneficiarios, IDetalleSolicitudProps, IGenericResponse, IListasImages, IlPropsModal } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'
import GestionSolicitud from './gestionSolicitud'
import Beneficiarios from '../beneficiarios/beneficiarios'
import DetalleInfoSolicitud from '../detalleInfoSolicitud/detalleInfoSolicitud'
import FormDetalleInfoSolicitud from '../formDetalleInfoSolicitud/formDetalleInfoSolicitud'
import Modal from '../../tvs/modal/modal'

const DetalleSolicitud: React.FC<IDetalleSolicitudProps> = ({ toast, setCargando, setRedirectSolicitudes, idDetalleSolicitud, zonaConsulta }) => {

  const rolesPermitenEditar = ['USUARIO_ROOT', 'USUARIO_ROLE_ADMIN', 'USUARIO_ROLE_1']
  const [showBotomEditaDocumentos, setShowBotomEditaDocumentos] = useState(false);

  const [modalOpen, setModalOpen] = useState(false)
  const [propsModal, setPropsModal] = useState<IlPropsModal>({
    titulo: '',
    descripcion: '',
  })

  const tiposDeArchivoEditaF1 = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'FILE_1', label: 'Cédula de ciudadania' },
    { value: 'FILE_2', label: 'Certificado de libertad' },
    { value: 'FILE_3', label: 'Impuesto predial' }
  ]

  const tiposDeArchivoEditaF2 = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'FILE_4', label: 'Certificado de disponibilidad agua.' },
    { value: 'FILE_5', label: 'Certificado de disponibilidad energía.' },
    { value: 'FILE_6', label: 'Certificado uso del suelo.' },
    { value: 'FILE_7', label: 'Certificado de no riesgo.' },
    { value: 'FILE_8', label: 'Lista de verificación documental' }
  ]

  const tiposDeArchivoEditaF3 = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'FILE_9', label: 'Copia de la última escritura del predio.' },
    { value: 'FILE_10', label: 'Paz y salvo del impuesto predial.' },
    { value: 'FILE_11', label: 'Documentos de los vecinos.' },
    { value: 'FILE_12', label: 'Notificación a vecinos' },
    { value: 'FILE_13', label: 'Certificado de solicitud de licencia.' },
    { value: 'FILE_14', label: 'Poder para solicitud de licencia.' },
    { value: 'FILE_15', label: 'Firmar planos y formato notarial. ' },
    { value: 'FILE_16', label: 'Radicado de la licencia.' },
    { value: 'FILE_17', label: 'Certificación de avalúo catastral.' },
    { value: 'FILE_18', label: 'Certificación de nomenclatura.' },
    { value: 'FILE_19', label: 'Formulario de postulación.' },
    { value: 'FILE_20', label: 'Certificado de responsabilidad documental.' },
    { value: 'FILE_21', label: 'Formulario de cartilla de especificaciones.' },
    { value: 'FILE_22', label: 'Contrato de obra.' },
    { value: 'FILE_23', label: 'Contrato de voluntariado.' },
    { value: 'FILE_24', label: 'Formulario de declaración jurada.' },
  ]

  const [tipoDeArchivoEdita, setTipoDeArchivoEdita] = useState('INITIAL');
  const [tipoDeArchivoEditaRef, setTipoDeArchivoEditaRef] = useState(false);

  const [nombreDeArchivoAnexo, setNombreDeArchivoAnexo] = useState('');
  const [nombreDeArchivoAnexoRef, setNombreDeArchivoAnexoRef] = useState(false);

  const [imageEdita, setImageEdita] = useState('');
  const [fileEdita, setFileEdita] = useState('');
  const [filesImages, setFilesImages] = useState<string[]>([]);
  const [filesImagesView, setFilesImagesView] = useState<IListasImages[]>([]);
  const [fileEditaRef, setFileEditaRef] = useState(false);
  const fileEditaInputRef1 = useRef<HTMLInputElement | null>(null);
  const fileEditaInputRef2 = useRef<HTMLInputElement | null>(null);
  const fileEditaInputRef3 = useRef<HTMLInputElement | null>(null);
  const fileEditaInputRefAnexo = useRef<HTMLInputElement | null>(null);

  const [detalleSolicitud, setDetalleSolicitud] = useState<any>({});
  const [showDetalleSolicitud, setShowDetalleSolicitud] = useState(false);
  const [editaDetalleSolicitud, setEditaDetalleSolicitud] = useState(false);

  const [activaEdicionDocumentosF1, setActivaEdicionDocumentosF1] = useState(false);
  const [activaEdicionDocumentosF2, setActivaEdicionDocumentosF2] = useState(false);
  const [activaEdicionDocumentosF3, setActivaEdicionDocumentosF3] = useState(false);
  const [activaEdicionDocumentosAnexos, setActivaEdicionDocumentosAnexos] = useState(false);

  const [activaBeneficiarios, setActivaBeneficiarios] = useState(false);
  const [beneficiariosList, setBeneficiariosList] = useState<IBeneficiarios[]>([]);
  const [eventosList, setEventosList] = useState<any[]>([])

  const formDetalleInfoSolicitudRef = useRef<FormDetalleInfoSolicitudHandle>(null);

  useEffect(() => {
    if (rolesPermitenEditar.includes(zonaConsulta)) {
      setShowBotomEditaDocumentos(true)
    }
    if (!editaDetalleSolicitud) {
      consultaDetalleSolicitud();
    }
  }, [editaDetalleSolicitud])

  const consultaDetalleSolicitud = async () => {
    const usuarioSession = sessionStorage.getItem('usuarioApp');
    if (!!usuarioSession) {
      setCargando(true)
      const usuarioLocalStorage = JSON.parse(usuarioSession);
      const authServices = new AuthServices();
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "idProcesamiento": idDetalleSolicitud,
      }
      try {
        const response: IGenericResponse = await authServices.requestPost(body, 10);
        if (response.estado) {
          setDetalleSolicitud(response.objeto);
          setBeneficiariosList(response.objeto.beneficiariosList)
          setEventosList(response.objeto.eventosSolicitud)
          setShowDetalleSolicitud(true);
          await listaImagenes(response.objeto.urlImages)
        } else {
          toast(response.mensaje);
        }
        setCargando(false);
      } catch (error) {
        toast('No es posible consultar la información, contacte al administrador');
        setCargando(false);
      }
    } else {
      toast('No es posible consultar la información, contacte al administrador')
    }
  }

  const listaImagenes = async (urlImages: any[]) => {
    if (urlImages.length > 0) {
      let formImages: IListasImages[] = [];
      for (let i = 0; i < urlImages.length; i++) {
        const imgFormat = await consultaImageBase64(urlImages[i].urlTxt)
        if (imgFormat) {
          const imgElement: IListasImages = {
            imgBase64: imgFormat,
            urlTxt: urlImages[i].urlTxt
          }
          formImages.push(imgElement);
        }
      }
      setFilesImagesView(formImages)
    } else {
      setFilesImagesView([])
    }
  }

  const consultaPDF = async (urlTxt: string) => {
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

  const consultaImageBase64 = async (urlTxt: string): Promise<string | null> => {
    setCargando(true);
    const authServices = new AuthServices();
    try {
      const body = {
        "urlTxt": urlTxt,
      }
      const response: IGenericResponse = await authServices.requestPost(body, 12);
      if (response.estado) {
        setCargando(false);
        return response.objeto
      } else {
        toast(response.mensaje);
        setCargando(false);
        return null
      }
    } catch (error) {
      toast('No es posible consultar la información, contacte al administrador');
      setCargando(false);
      return null
    }
  }

  const activaVista1EditaDocumentos = () => {
    setActivaEdicionDocumentosF1(!activaEdicionDocumentosF1)
  }

  const activaVista2EditaDocumentos = () => {
    setActivaEdicionDocumentosF2(!activaEdicionDocumentosF2)
  }

  const activaVista3EditaDocumentos = () => {
    setActivaEdicionDocumentosF3(!activaEdicionDocumentosF3)
  }

  const activaVistaAnexosEditaDocumentos = () => {
    setActivaEdicionDocumentosAnexos(!activaEdicionDocumentosAnexos)
  }

  const eventInputFilesImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    setFileEditaRef(false)
    if (fileList) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      let controlTypeImage = true;
      for (let i = 0; i < fileList.length; i++) {
        if (!validImageTypes.includes(fileList[i].type)) {
          controlTypeImage = false
          break;
        }
      }
      if (controlTypeImage) {
        let valorFinalMB = 0;
        for (let step = 0; step < fileList.length; step++) {
          var fileSizeMB = fileList[step].size / 1024 / 1024;
          valorFinalMB = valorFinalMB + fileSizeMB;
        }
        if (valorFinalMB < 10) {
          const base64Files: string[] = [];
          Array.from(fileList).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result && typeof reader.result === 'string') {
                base64Files.push(reader.result);
                if (base64Files.length === fileList.length) {
                  setFilesImages(base64Files);
                }
              }
            };
            reader.readAsDataURL(file);
          });
        } else {
          toast("*Los archivos cargados supera los 10 MB")
          setFileEditaRef(true)
        }
      } else {
        setFileEditaRef(true)
        toast('Solo permite archivo JPEG y PNG')
      }
    }
  }

  const eventInputFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    setFileEditaRef(false)
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
                setFileEdita(reader.result)
              }
            };
            reader.readAsDataURL(file);
          } else {
            toast("*El archivo cargado supera los 10 MB")
            setFileEditaRef(true)
          }
        } else {
          toast("El archivo cargado no está en formato PDF")
          setFileEditaRef(true)
        }
      } else {
        setFileEdita('')
      }
    }
  }

  const cargaArhivoEditaAction = () => {
    let formValidado = [];
    setTipoDeArchivoEditaRef(false)
    if (tipoDeArchivoEdita === 'INITIAL') {
      setTipoDeArchivoEditaRef(true)
    }
    if (fileEditaRef) {
      formValidado.push('Error archivo');
    } else {
      if (fileEdita.length === 0) {
        setFileEditaRef(true)
        formValidado.push('Error archivo');
      }
    }
    if (formValidado.length === 0) {
      switch (tipoDeArchivoEdita) {
        case 'FILE_1':
          cargaDocumentos(idDetalleSolicitud, 1, 'DOCUMENTO', 'MODULO_1')
          break;
        case 'FILE_2':
          cargaDocumentos(idDetalleSolicitud, 2, 'CERTIFICADO DE LIBERTAD', 'MODULO_1')
          break;
        case 'FILE_3':
          cargaDocumentos(idDetalleSolicitud, 3, 'IMPUESTO PREDIAL', 'MODULO_1')
          break;
        case 'FILE_4':
          cargaDocumentos(idDetalleSolicitud, 4, 'Certificado de Disponibilidad Agua'.toUpperCase(), 'MODULO_2')
          break;
        case 'FILE_5':
          cargaDocumentos(idDetalleSolicitud, 5, 'Certificado de Disponibilidad Energía'.toUpperCase(), 'MODULO_2')
          break;
        case 'FILE_6':
          cargaDocumentos(idDetalleSolicitud, 6, 'Certificado Uso del Suelo'.toUpperCase(), 'MODULO_2')
          break;
        case 'FILE_7':
          cargaDocumentos(idDetalleSolicitud, 7, 'Certificado de No Riesgo'.toUpperCase(), 'MODULO_2')
          break;
        case 'FILE_8':
          cargaDocumentos(idDetalleSolicitud, 8, 'Lista de Verificación Documental'.toUpperCase(), 'MODULO_2')
          break;
        case 'FILE_9':
          cargaDocumentos(idDetalleSolicitud, 9, 'Copia de la última escritura del predio'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_10':
          cargaDocumentos(idDetalleSolicitud, 10, 'Paz y salvo del impuesto predial'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_11':
          cargaDocumentos(idDetalleSolicitud, 11, 'Documentos de los vecinos'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_12':
          cargaDocumentos(idDetalleSolicitud, 12, 'Notificación a vecinos'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_13':
          cargaDocumentos(idDetalleSolicitud, 13, 'Certificado de solicitud de licencia'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_14':
          cargaDocumentos(idDetalleSolicitud, 14, 'Poder para solicitud de licencia'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_15':
          cargaDocumentos(idDetalleSolicitud, 15, 'Firmar planos y formato notarial'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_16':
          cargaDocumentos(idDetalleSolicitud, 16, 'Radicado de la licencia'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_17':
          cargaDocumentos(idDetalleSolicitud, 17, 'Certificación de avalúo catastral'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_18':
          cargaDocumentos(idDetalleSolicitud, 18, 'Certificación de nomenclatura'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_19':
          cargaDocumentos(idDetalleSolicitud, 19, 'Formulario de postulación'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_20':
          cargaDocumentos(idDetalleSolicitud, 20, 'Certificado de responsabilidad documental'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_21':
          cargaDocumentos(idDetalleSolicitud, 21, 'Formulario de cartilla de especificaciones'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_22':
          cargaDocumentos(idDetalleSolicitud, 22, 'Contrato de obra'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_23':
          cargaDocumentos(idDetalleSolicitud, 23, 'Contrato de voluntariado'.toUpperCase(), 'MODULO_3')
          break;
        case 'FILE_24':
          cargaDocumentos(idDetalleSolicitud, 24, 'Formulario de declaración jurada'.toUpperCase(), 'MODULO_3')
          break;
        default:
          break;
      }
    } else {
      formValidado.splice(0, formValidado.length)
      toast('Errores en el formulario, valide la información')
    }
  }

  const cargaArhivoAnexoAction = () => {
    let formValidado = [];
    setNombreDeArchivoAnexoRef(false)
    if (nombreDeArchivoAnexo.length === 0) {
      setNombreDeArchivoAnexoRef(true)
      formValidado.push('Error archivo');
    }
    if (fileEditaRef) {
      formValidado.push('Error NombreDeArchivoAnexo');
    } else {
      if (fileEdita.length === 0) {
        setFileEditaRef(true)
        formValidado.push('Error archivo');
      }
    }
    if (formValidado.length === 0) {
      const nombreArchivo = `${nombreDeArchivoAnexo}`;
      cargaDocumentosAnexos(idDetalleSolicitud, nombreArchivo.trim().replace(/\s+/g, "_"), nombreDeArchivoAnexo.toUpperCase(), 'MODULO_ANEXOS')
    } else {
      formValidado.splice(0, formValidado.length)
      toast('Errores en el formulario, valide la información')
    }
  }

  const cargaImagenesAction = async () => {
    if (filesImages.length > 0) {
      for (let index = 0; index < filesImages.length; index++) {
        const pathImageX = `OT_UADMIN/${idDetalleSolicitud}/MODULO_IMAGES/imagen_${index}.txt`;
        await cargaDocumentosService(filesImages[index], pathImageX, 'Imagen_' + index)
      }
      resetForm()
      consultaDetalleSolicitud();
    } else {
      toast('No hay imagenes para cargar.')
    }
  }

  const cargaDocumentos = async (idProcesamiento: string, i: number, idArchivo: string, moduloBucket: string) => {
    const pathBeneficiarioX = `OT_UADMIN/${idProcesamiento}/${moduloBucket}/${idProcesamiento}_${i}.txt`;
    await cargaDocumentosService(fileEdita, pathBeneficiarioX, idArchivo)
    resetForm()
    consultaDetalleSolicitud();
  }

  const cargaDocumentosAnexos = async (idProcesamiento: string, nombreArchivo: string, idArchivo: string, moduloBucket: string) => {
    const pathBeneficiarioX = `OT_UADMIN/${idProcesamiento}/${moduloBucket}/${nombreArchivo}.txt`;
    await cargaDocumentosService(fileEdita, pathBeneficiarioX, idArchivo)
    resetForm()
    consultaDetalleSolicitud();
  }

  const cargaDocumentosService = async (fileBase64: string, fileName: string, idArchivo: string) => {
    setCargando(true)
    const authServices = new AuthServices();
    try {
      const response: IGenericResponse = await authServices.requestPostFile(fileBase64, fileName);
      if (response.estado) {
        toast(`El archivo: ${idArchivo}, fue cargado satisfactoriamente`)
      } else {
        toast(`No fue posible cargar el archivo: ${idArchivo}`)
      }
      setCargando(false)
    } catch (error) {
      setCargando(false)
      toast(`No fue posible cargar el archivo: ${idArchivo}`)
    }
  }

  const resetForm = () => {
    setTipoDeArchivoEdita('INITIAL')
    setNombreDeArchivoAnexo('')
    setFileEdita('')
    setFilesImages([])
    if (fileEditaInputRef1.current) {
      fileEditaInputRef1.current.value = "";
    }
    if (fileEditaInputRef2.current) {
      fileEditaInputRef2.current.value = "";
    }
    if (fileEditaInputRef3.current) {
      fileEditaInputRef3.current.value = "";
    }
    if (fileEditaInputRefAnexo.current) {
      fileEditaInputRefAnexo.current.value = "";
    }
    setActivaEdicionDocumentosF1(false)
    setActivaEdicionDocumentosF2(false)
    setActivaEdicionDocumentosF3(false)
    setActivaEdicionDocumentosAnexos(false)
  }

  const eliminaImage = (urlTxt: string) => {
    setPropsModal({
      titulo: 'Eliminar imagen',
      descripcion: `Esta seguro de eliminar la imagen seleccionada ?`
    })
    setImageEdita(urlTxt)
    setModalOpen(true)
  }

  const eliminarImageService = async () => {
    setCargando(true)
    const authServices = new AuthServices();
    const body = {
      "idProcesamiento": idDetalleSolicitud,
      "moduloS3": "MODULO_IMAGES",
      "urlTxt": imageEdita,
    }
    try {
      const response: IGenericResponse = await authServices.requestPost(body, 27);
      toast(response.mensaje)
      if (response.estado) {
        consultaDetalleSolicitud();
      } else {
        setCargando(false)
      }
    } catch (error) {
      toast('No es posible eliminar la solicitud, contacte al administrador')
      setCargando(false)
    }
  }

  const modalSi = () => {
    eliminarImageService()
    setModalOpen(false)
  }

  const modalNo = () => {
    setModalOpen(false)

  }

  return (
    <>
      <div className='div-titulo-ds'>
        <h4 className='titulo-form'>Detalle de la solicitud:</h4>
        <button className='btn btn-link bottom-custom-link' onClick={() => setRedirectSolicitudes('LISTA_SOLICITUDES')}>
          <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p className='margin-icons'>Volver</p>
        </button>
      </div>
      <h5 className='titulo-form'>{detalleSolicitud.idDefSolicitud}</h5>
      {
        showDetalleSolicitud ?
          <>
            {
              editaDetalleSolicitud ?
                <FormDetalleInfoSolicitud ref={formDetalleInfoSolicitudRef} toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta}
                  setEditaDetalleSolicitud={setEditaDetalleSolicitud} solicitud={detalleSolicitud.solicitud} idDetalleSolicitud={idDetalleSolicitud} />
                :
                <DetalleInfoSolicitud idDetalleSolicitud={idDetalleSolicitud}
                  solicitud={detalleSolicitud.solicitud} setEditaDetalleSolicitud={setEditaDetalleSolicitud}
                  zonaConsulta={zonaConsulta} />
            }
          </>
          :
          'Cargando ...'
      }
      <hr />
      <div className="div-info-beneficiarios">
        <div className="">
          <h4> Gestión documental </h4>
        </div>
      </div>
      <p className='my-2'>A continuación, encontrará el listado de documentos asociados a la solicitud: </p>
      <div className="div-info-beneficiarios">
        <p className='p-label-menu-configura my-2'>Documentos Fase 1:</p>
        {
          showBotomEditaDocumentos ?
            <div className={activaEdicionDocumentosF1 ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => activaVista1EditaDocumentos()} >
              <div className={activaEdicionDocumentosF1 ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
            </div>
            :
            <></>
        }
      </div>
      <div className={activaEdicionDocumentosF1 ? "div-form-documents-active" : "div-form-beneficiarios"} >
        <p className='my-2'>Seleccione el tipo de documento y cargue el archivo que desea actualizar:</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'>Seleccione el archivo: </p>
              <select value={tipoDeArchivoEdita} onChange={(e) => setTipoDeArchivoEdita(e.target.value)} className={tipoDeArchivoEditaRef ? 'form-control form-control-error' : 'form-control'} >
                {
                  tiposDeArchivoEditaF1.map((key, i) => {
                    return (
                      <option key={i} value={key.value}>{key.label}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Aqui el documento: </p>
              <input ref={fileEditaInputRef1} type="file"
                onChange={(e) => eventInputFiles(e)} className={fileEditaRef ? 'form-control form-control-error' : 'form-control'} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1" >
            <div className='div-bottom-custom'>
              <button className='btn btn-primary bottom-custom' onClick={() => cargaArhivoEditaAction()} >Subir archivo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-0">
        {
          showDetalleSolicitud ?
            detalleSolicitud.urlDocumentsMod1.map((urlDoc: any, i: number) => {
              return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                  <button className='btn btn-link bottom-custom-link' onClick={() => consultaPDF(urlDoc.urlTxt)}>
                    <FontAwesomeIcon className='icons-table-ds' icon={faFilePdf} /><p>{urlDoc.nombreArchivo}</p>
                  </button>
                </div>
              )
            })
            :
            'Cargando ...'
        }
      </div>

      <div className="div-info-beneficiarios">
        <p className='p-label-menu-configura my-2'>Documentos Fase 2:</p>
        {
          showBotomEditaDocumentos ?
            <div className={activaEdicionDocumentosF2 ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => activaVista2EditaDocumentos()} >
              <div className={activaEdicionDocumentosF2 ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
            </div>
            :
            <></>
        }
      </div>
      <div className={activaEdicionDocumentosF2 ? "div-form-documents-active" : "div-form-beneficiarios"} >
        <p className='my-2'>Seleccione el tipo de documento y cargue el archivo que desea actualizar:</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'>Seleccione el archivo: </p>
              <select value={tipoDeArchivoEdita} onChange={(e) => setTipoDeArchivoEdita(e.target.value)} className={tipoDeArchivoEditaRef ? 'form-control form-control-error' : 'form-control'} >
                {
                  tiposDeArchivoEditaF2.map((key, i) => {
                    return (
                      <option key={i} value={key.value}>{key.label}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Aqui el documento: </p>
              <input ref={fileEditaInputRef2} type="file"
                onChange={(e) => eventInputFiles(e)} className={fileEditaRef ? 'form-control form-control-error' : 'form-control'} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1" >
            <div className='div-bottom-custom'>
              <button className='btn btn-primary bottom-custom' onClick={() => cargaArhivoEditaAction()} >Subir archivo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-0">
        {
          showDetalleSolicitud ?
            detalleSolicitud.urlDocumentsMod2.map((urlDoc: any, i: number) => {
              return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                  <button className='btn btn-link bottom-custom-link' onClick={() => consultaPDF(urlDoc.urlTxt)}>
                    <FontAwesomeIcon className='icons-table-ds' icon={faFilePdf} /><p>{urlDoc.nombreArchivo}</p>
                  </button>
                </div>
              )
            })
            :
            'Cargando ...'
        }
      </div>
      <div className="div-info-beneficiarios">
        <p className='p-label-menu-configura my-2'>Documentos Fase 3:</p>
        {
          showBotomEditaDocumentos ?
            <div className={activaEdicionDocumentosF3 ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => activaVista3EditaDocumentos()} >
              <div className={activaEdicionDocumentosF3 ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
            </div>
            :
            <></>
        }
      </div>
      <div className={activaEdicionDocumentosF3 ? "div-form-documents-active" : "div-form-beneficiarios"} >
        <p className='my-2'>Seleccione el tipo de documento y cargue el archivo que desea actualizar:</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'>Seleccione el archivo: </p>
              <select value={tipoDeArchivoEdita} onChange={(e) => setTipoDeArchivoEdita(e.target.value)} className={tipoDeArchivoEditaRef ? 'form-control form-control-error' : 'form-control'} >
                {
                  tiposDeArchivoEditaF3.map((key, i) => {
                    return (
                      <option key={i} value={key.value}>{key.label}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Aqui el documento: </p>
              <input ref={fileEditaInputRef3} type="file"
                onChange={(e) => eventInputFiles(e)} className={fileEditaRef ? 'form-control form-control-error' : 'form-control'} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1" >
            <div className='div-bottom-custom'>
              <button className='btn btn-primary bottom-custom' onClick={() => cargaArhivoEditaAction()} >Subir archivo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-0">
        {
          showDetalleSolicitud ?
            detalleSolicitud.urlDocumentsMod3.map((urlDoc: any, i: number) => {
              return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                  <button className='btn btn-link bottom-custom-link' onClick={() => consultaPDF(urlDoc.urlTxt)}>
                    <FontAwesomeIcon className='icons-table-ds' icon={faFilePdf} /><p>{urlDoc.nombreArchivo}</p>
                  </button>
                </div>
              )
            })
            :
            'Cargando ...'
        }
      </div>
      <div className="div-info-beneficiarios">
        <p className='p-label-menu-configura my-2'>Documentos Anexos:</p>
        {
          showBotomEditaDocumentos ?
            <div className={activaEdicionDocumentosAnexos ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => activaVistaAnexosEditaDocumentos()} >
              <div className={activaEdicionDocumentosAnexos ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
            </div>
            :
            <></>
        }
      </div>
      <div className={activaEdicionDocumentosAnexos ? "div-form-documents-active" : "div-form-beneficiarios"} >
        <p className='my-2'>Otorgue un nombre al archivo Anexo:</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'>Nombre del archivo: </p>
              <input type="text" value={nombreDeArchivoAnexo} onChange={(e) => setNombreDeArchivoAnexo(e.target.value)} className={nombreDeArchivoAnexoRef ? 'form-control form-control-error' : 'form-control'} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Aqui el documento: </p>
              <input ref={fileEditaInputRefAnexo} type="file"
                onChange={(e) => eventInputFiles(e)} className={fileEditaRef ? 'form-control form-control-error' : 'form-control'} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1" >
            <div className='div-bottom-custom'>
              <button className='btn btn-primary bottom-custom' onClick={() => cargaArhivoAnexoAction()} >Subir archivo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-0">
        {
          showDetalleSolicitud ?
            detalleSolicitud.urlDocumentsModAnexos.map((urlDoc: any, i: number) => {
              return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
                  <button className='btn btn-link bottom-custom-link' onClick={() => consultaPDF(urlDoc.urlTxt)}>
                    <FontAwesomeIcon className='icons-table-ds' icon={faFilePdf} /><p>{urlDoc.nombreArchivo}</p>
                  </button>
                </div>
              )
            })
            :
            'Cargando ...'
        }
      </div>
      <hr />
      <div className="row mt-0">
        <Beneficiarios idProcesamiento={idDetalleSolicitud} toast={toast} setCargando={setCargando}
          setBeneficiariosList={setBeneficiariosList}
          beneficiariosList={beneficiariosList}
          setActivaBeneficiarios={setActivaBeneficiarios}
          activaBeneficiarios={activaBeneficiarios}
          zonaConsulta={zonaConsulta} />
      </div>
      <GestionSolicitud toast={toast} setCargando={setCargando} useSelect={detalleSolicitud.gestionSolicitud}
        idDetalleSolicitud={idDetalleSolicitud} setRedirectSolicitudes={setRedirectSolicitudes} />
      <hr />
      <h4> Registro fotográfico: </h4>
      <p className='mb-1'>Cargue las imagenes de manera simultanea solo en formato JPEG o PNG: </p>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
          <div className='div-form'>
            <input ref={fileEditaInputRefAnexo} type="file" multiple onChange={(e) => eventInputFilesImages(e)} className={fileEditaRef ? 'form-control form-control-error' : 'form-control'} />
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-1" >
          <div className='div-bottom-custom mt-0'>
            <button className='btn btn-primary bottom-custom' onClick={() => cargaImagenesAction()} >Cargar imagenes</button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {
          filesImagesView.map((imgElement, key: number) => {
            return (
              <>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-3">
                  <div className="div-action-images-padre">
                    <img src={imgElement.imgBase64} className='img-lista-solicitud' />
                    <div className="div-action-images">
                      <button className='btn btn-link bottom-custom-link' >
                        <FontAwesomeIcon className='icons-image' icon={faEye} />
                      </button>
                      <button className='btn btn-link bottom-custom-link' onClick={() => eliminaImage(imgElement.urlTxt)}>
                        <FontAwesomeIcon className='icons-image' icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
      <hr />
      <h4> Historia de la solicitud </h4>
      <p className='mb-1'>Aqui podra ver la operaciones más representativas de la solicitud: </p>
      <div className='div-style-form-whit-table'>
        <table className='table-info'>
          <thead>
            <tr>
              <td className='td-info'>
                <p className='p-label-form'>Fecha</p>
              </td>
              <td className='td-info'>
                <p className='p-label-form'>Resultado de operación</p>
              </td>
              <td className='td-info'>
                <p className='p-label-form'>Observaciones</p>
              </td>
              <td className='td-info'>
                <p className='p-label-form'>Usuario</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {
              eventosList.map((evento: any, key: number) => {
                return (
                  <tr key={key} className='tr-tablet'>
                    <td className='td-info'>
                      <p className=''>{evento.fecha_evento}</p>
                    </td>
                    <td className='td-info'>
                      <p className=''>{evento.resultado_operacion}</p>
                    </td>
                    <td className='td-info'>
                      <p className=''>{evento.observaciones}</p>
                    </td>
                    <td className='td-info'>
                      <p className=''>{evento.userApp}</p>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {
        modalOpen ?
          <Modal tipoModal='MODAL_CONTROL_2' modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
          :
          <></>
      }
    </>
  )
}

export default DetalleSolicitud