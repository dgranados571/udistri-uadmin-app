import React, { useEffect, useState } from 'react'
import './solicitudes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import { IDetalleSolicitudProps, IGenericResponse, IListasSelect } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'

const DetalleSolicitud: React.FC<IDetalleSolicitudProps> = ({ toast, setCargando, setRedirectSolicitudes, idDetalleSolicitud }) => {

  const [usuariosPrecontractual, setUsuariosPrecontractual] = useState<IListasSelect[]>([]);

  const [usuarioPrecontractual, setUsuarioPrecontractual] = useState('');

  const [detalleSolicitud, setDetalleSolicitud] = useState<any>({});
  const [showDetalleSolicitud, setShowDetalleSolicitud] = useState(false);

  useEffect(() => {
    consultaInformacionGeneral();
  }, [])

  const consultaInformacionGeneral = () => {
    consultaInformacionUsuarios('');
    consultaDetalleSolicitud();
  }

  const consultaInformacionUsuarios = async (role: string) => {
    const usuarioSession = sessionStorage.getItem('usuarioApp');
    if (!!usuarioSession) {
      setCargando(true)
      const usuarioLocalStorage = JSON.parse(usuarioSession);
      const authServices = new AuthServices();
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "role": role,
      }
      try {
        const response: IGenericResponse = await authServices.requestPost(body, 4);
        if (response.estado) {
          const arrayUsers = Array.from(response.objeto);
          const usersPorRole = arrayUsers.map((element: any) => {
            return {
              value: element.usuario,
              label: element.nombre + ' ' + element.apellidos
            }
          })
          setUsuariosPrecontractual(usersPorRole);
        } else {
          toast(response.mensaje);
        }
      } catch (error) {
        toast('No es posible consultar la información, contacte al administrador');
        setCargando(false);
      }
    } else {
      toast('No es posible consultar la información, contacte al administrador');
    }
  }

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

  return (
    <>
      <div className='div-style-form'>
        <div className='div-titulo-ds'>
          <h4 className='titulo-form'>Detalle de la solicitud {idDetalleSolicitud}: </h4>
          <button className='btn btn-link bottom-custom-link' onClick={() => setRedirectSolicitudes('LISTA_SOLICITUDES')}>
            <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p>Volver</p>
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'> ID Solictud: </p>
              <p> {idDetalleSolicitud} </p>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'> Fecha de radicación: </p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.fecha_registro} </p>

                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'> Nombres: </p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.nombres + ' ' + detalleSolicitud.solicitud.apellidos} </p>
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'> No. Identificación: </p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.numero_identificacion} </p>
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'>Correo:</p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.correo} </p>
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'>Teléfono: </p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.telefono} </p>
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
            <div className='div-form'>
              <p className='p-label-form'>Matrícula inmobiliaria: </p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.matricula_inmobiliaria} </p>
                  :
                  'Cargando ...'
              }
            </div>
          </div>          
          <div className="col-12 col-sm-12 col-md-6 col-lg-8" >
            <div className='div-form'>
              <p className='p-label-form'> Obseraciones: </p>
              {
                showDetalleSolicitud ?
                  <p> {detalleSolicitud.solicitud.descripcion} </p>
                  :
                  'Cargando ...'
              }
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
            <p className='mb-1'>A continuación, encontrará el listado de documentos asociados a la solicitud. (Dar click en cada uno para visualizar el archivo): </p>
          </div>
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
          <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
            <h4 className='titulo-form'>Beneficiarios de la solicitud: </h4>
            <p className='mb-1'>A continuación, encontrará el detalle de los beneficiarios asociados a la solicitud: </p>
          </div>
          {
            showDetalleSolicitud ?
              detalleSolicitud.beneficiariosList.map((beneficiario: any, i: number) => {
                return (
                  <>                  
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 my-3" >
                      <div className="d-flex justify-content-start align-items-start">
                        <p className='p-label-form m-0'> Nombre: </p>
                        <p className='mx-2'> {beneficiario.nombresBen} </p>
                      </div>
                      {
                        beneficiario.registraDocPdf ?                          
                            <div className="d-flex justify-content-between">
                              <p className='p-label-form m-0'>Documento No: </p>
                              <p className='mx-2'>{beneficiario.identificacionBen} </p>
                              <button className='btn btn-link bottom-custom-link p-0' onClick={() => consultaPDF(beneficiario.documentosDto.urlTxt)}>
                                <FontAwesomeIcon className='icons-table-ds' icon={faFilePdf} />
                              </button>
                            </div>
                          :
                          <div className="d-flex justify-content-between">
                            <p className='p-label-form m-0'>Documento No: </p>
                            <p> {beneficiario.identificacionBen} </p>
                          </div>
                      }
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-1" ></div>
                  </>
                )
              })
              :
              'Cargando ...'
          }
          
        </div>
      </div>
      {
        showDetalleSolicitud ?
          detalleSolicitud.detalleSolicitudVista.modulo2 ?
            <>
              <hr />
              <div className='div-style-form'>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <p className='mb-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne un analista del área Precontractual:</p>
                      <select value={usuarioPrecontractual} onChange={(e) => setUsuarioPrecontractual(e.target.value)} className='form-control' >
                        {
                          usuariosPrecontractual.map((key, i) => {
                            return (
                              <option key={i} value={key.value}>{key.label}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-buttom-registra '>
                      <button className='btn btn-primary bottom-custom' >Asignar</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            <></>
          :
          'Cargando ...'
      }
      {
        /*
      }
            <div className='div-style-form mt-2'>
              <h4 className='titulo-form mb-3'>En que anda mi solicitud {idDetalleSolicitud}: </h4>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                  <p className='mb-1'>A continuación, encontrara el histórico de la gestión asociada a la solicitud {idDetalleSolicitud} </p>
                </div>
                <div className='div-style-form-whit-table'>
                  <table className='table-info'>
                    <thead>
                      <tr>
                        <td className='td-info'>
                          <p className='p-label-form'> Fecha del Evento </p>
                        </td>
                        <td className='td-info'>
                          <p className='p-label-form'> Nombre de Operación </p>
                        </td>
                        <td className='td-info'>
                          <p className='p-label-form'> Resultado de Operación </p>
                        </td>
                        <td className='td-info'>
                          <p className='p-label-form'> Observaciones </p>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        showDetalleSolicitud ?
                          detalleSolicitud.eventosSolicitud.map((evento: any) => {
                            return (
                              <tr className='tr-tablet'>
                                <td className='td-info'>
                                  <p className=''>{evento.fecha_evento}</p>
                                </td>
                                <td className='td-info'>
                                  <p className=''>{evento.nombre_operacion}</p>
                                </td>
                                <td className='td-info'>
                                  <p className=''>{evento.resultado_operacion}</p>
                                </td>
                                <td className='td-info'>
                                  <p className=''>{evento.observaciones}</p>
                                </td>
                              </tr>)
                          })
                          :
                          'Cargando ...'
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      {
        */
      }
    </>
  )
}

export default DetalleSolicitud