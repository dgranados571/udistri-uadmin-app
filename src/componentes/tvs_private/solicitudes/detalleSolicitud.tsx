import React, { useEffect, useRef, useState } from 'react'
import './solicitudes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import { FormDetalleInfoSolicitudHandle, IBeneficiarios, IDetalleSolicitudProps, IGenericResponse } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'
import GestionSolicitud from './gestionSolicitud'
import Beneficiarios from '../beneficiarios/beneficiarios'
import DetalleInfoSolicitud from '../detalleInfoSolicitud/detalleInfoSolicitud'
import FormDetalleInfoSolicitud from '../formDetalleInfoSolicitud/formDetalleInfoSolicitud'

const DetalleSolicitud: React.FC<IDetalleSolicitudProps> = ({ toast, setCargando, setRedirectSolicitudes, idDetalleSolicitud, zonaConsulta }) => {

  const rolesPermitenEditar = ['USUARIO_ROOT', 'USUARIO_ROLE_ADMIN', 'USUARIO_ROLE_1']
  const [showBotomEditaDocumentos, setShowBotomEditaDocumentos] = useState(false);

  const tiposDeArchivoEdita = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'FILE_1', label: 'Cédula de ciudadania' },
    { value: 'FILE_2', label: 'Certificado de libertad' },
    { value: 'FILE_3', label: 'Impuesto predial' }
  ]

  const [tipoDeArchivoEdita, setTipoDeArchivoEdita] = useState('INITIAL');
  const [tipoDeArchivoEditaRef, setTipoDeArchivoEditaRef] = useState(false);

  const [fileEdita, setFileEdita] = useState('');
  const [fileEditaRef, setFileEditaRef] = useState(false);
  const fileEditaInputRef = useRef<HTMLInputElement | null>(null);

  const [detalleSolicitud, setDetalleSolicitud] = useState<any>({});
  const [showDetalleSolicitud, setShowDetalleSolicitud] = useState(false);
  const [editaDetalleSolicitud, setEditaDetalleSolicitud] = useState(false);
  const [activaEdicionDocumentos, setActivaEdicionDocumentos] = useState(false);
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
          setBeneficiariosList(response.objeto.beneficiariosList)
          setDetalleSolicitud(response.objeto);
          setEventosList(response.objeto.eventosSolicitud)
          setShowDetalleSolicitud(true);
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

  const activaVistaEditaDocumentos = () => {
    setActivaEdicionDocumentos(!activaEdicionDocumentos)
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
          cargaDocumentos(idDetalleSolicitud, 1, 'DOCUMENTO')
          break;
        case 'FILE_2':
          cargaDocumentos(idDetalleSolicitud, 2, 'CERTIFICADO DE LIBERTAD')
          break;
        case 'FILE_3':
          cargaDocumentos(idDetalleSolicitud, 3, 'IMPUESTO PREDIAL')
          break;
        default:
          break;
      }
    } else {
      formValidado.splice(0, formValidado.length)
      toast('Errores en el formulario, valide la información')
    }
  }

  const cargaDocumentos = async (idProcesamiento: string, i: number, idArchivo: string) => {
    const pathBeneficiarioX = `OT_UADMIN/${idProcesamiento}/MODULO_1/${idProcesamiento}_${i}.txt`;
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
    setFileEdita('')
    if (fileEditaInputRef.current) {
      fileEditaInputRef.current.value = "";
    }
    setActivaEdicionDocumentos(false)
  }

  return (
    <>
      <div className='div-titulo-ds'>
        <h4 className='titulo-form'>Detalle de la solicitud:</h4>
        <button className='btn btn-link bottom-custom-link' onClick={() => setRedirectSolicitudes('LISTA_SOLICITUDES')}>
          <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p className='margin-icons'>Volver</p>
        </button>
      </div>
      <h4 className='titulo-form'>{detalleSolicitud.idDefSolicitud} </h4>
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
        {
          showBotomEditaDocumentos ?
            <div className={activaEdicionDocumentos ? "div-slide-padre-active" : "div-slide-padre"} onClick={() => activaVistaEditaDocumentos()} >
              <div className={activaEdicionDocumentos ? "div-slide-hijo-active" : "div-slide-hijo"}></div>
            </div>
            :
            <></>
        }
      </div>
      <div className={activaEdicionDocumentos ? "div-form-beneficiarios-active" : "div-form-beneficiarios"} >
        <p className='my-2'>Seleccione el tipo de documento y cargue el archivo que desea actualizar:</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'>Seleccione el archivo: </p>
              <select value={tipoDeArchivoEdita} onChange={(e) => setTipoDeArchivoEdita(e.target.value)} className={tipoDeArchivoEditaRef ? 'form-control form-control-error' : 'form-control'} >
                {
                  tiposDeArchivoEdita.map((key, i) => {
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
              <input ref={fileEditaInputRef} type="file"
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
      <p className='my-2'>A continuación, encontrará el listado de documentos asociados a la solicitud: </p>
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
    </>
  )
}

export default DetalleSolicitud