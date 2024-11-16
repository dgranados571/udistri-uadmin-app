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

  const [detalleSolicitud, setDetalleSolicitud] = useState<any>({});
  const [showDetalleSolicitud, setShowDetalleSolicitud] = useState(false);
  const [editaDetalleSolicitud, setEditaDetalleSolicitud] = useState(false);
  const [activaBeneficiarios, setActivaBeneficiarios] = useState(false);
  const [beneficiariosList, setBeneficiariosList] = useState<IBeneficiarios[]>([]);
  const [eventosList, setEventosList] = useState<any[]>([])

  const formDetalleInfoSolicitudRef = useRef<FormDetalleInfoSolicitudHandle>(null);

  useEffect(() => {
    if(!editaDetalleSolicitud){
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

  return (
    <>
      <div className='div-titulo-ds'>
        <h4 className='titulo-form'>Detalle de la solicitud: {detalleSolicitud.idDefSolicitud} </h4>
        <button className='btn btn-link bottom-custom-link' onClick={() => setRedirectSolicitudes('LISTA_SOLICITUDES')}>
          <FontAwesomeIcon className='icons-table-ds' icon={faRotateLeft} /><p className='margin-icons'>Volver</p>
        </button>
      </div>
      {
        showDetalleSolicitud ?
          <>
            {
              editaDetalleSolicitud ?
                <FormDetalleInfoSolicitud ref={formDetalleInfoSolicitudRef} toast={toast} setCargando={setCargando} zonaConsulta={zonaConsulta}
                  setEditaDetalleSolicitud={setEditaDetalleSolicitud} solicitud={detalleSolicitud.solicitud} idDetalleSolicitud={idDetalleSolicitud} />
                :
                <DetalleInfoSolicitud idDetalleSolicitud={idDetalleSolicitud} solicitud={detalleSolicitud.solicitud} setEditaDetalleSolicitud={setEditaDetalleSolicitud} />
            }
          </>
          :
          'Cargando ...'
      }
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
        <Beneficiarios idProcesamiento={idDetalleSolicitud} toast={toast} setCargando={setCargando}
          setBeneficiariosList={setBeneficiariosList}
          beneficiariosList={beneficiariosList}
          setActivaBeneficiarios={setActivaBeneficiarios}
          activaBeneficiarios={activaBeneficiarios}
          zonaConsulta={zonaConsulta} />
      </div>
      <GestionSolicitud toast={toast} setCargando={setCargando} useSelect={detalleSolicitud.gestionSolicitud} idDetalleSolicitud={idDetalleSolicitud} setRedirectSolicitudes={setRedirectSolicitudes} />
      <hr />
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