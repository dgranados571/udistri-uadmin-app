import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import axios from 'axios'
import { UtilUrl } from '../../../utilUrl';

const DetalleSolicitud = ({ toast, setCargando, setRedirectSolicitudes, idDetalleSolicitud }) => {

  const { urlEntorno } = UtilUrl();
  const [disabledButtom, setDisabledButtom] = useState(true)
  const [usuariosPrecontractual, setUsuariosPrecontractual] = useState([])
  const [usuarioPrecontractual, setUsuarioPrecontractual] = useState('')

  const [detalleSolicitud, setDetalleSolicitud] = useState({})
  const [showDetalleSolicitud, setShowDetalleSolicitud] = useState(false)

  const [descripcion, setDescripcion] = useState('');

  const usuarioPrecontractualRef = useRef('')
  const opcionesGestionPrecontractualRef = useRef('')
  const descripcionRef = useRef('')

  const opcionesGestionPrecontractual = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'AVANZA_A_PRESUPUESTO', label: 'Avanza a presupuesto' },
    { value: 'CANCELA_SOLICTUD', label: 'Cancela solcitud' },
    { value: 'DEVUELVE_JEFE_DEPENDENCIA', label: 'Devolver a Jefe de dependencia' },
]

  useEffect(() => {
    consultaInformacionUsuariosPrecontractual()
  }, [])

  const asignaUsuarioPrecontractual = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
      setCargando(true)
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "usuarioPrecontractual": usuarioPrecontractual,
        "idProcesamiento": idDetalleSolicitud,
        "fechaEvento": new Date()
      }
      await axios.post(`${urlEntorno}/service/uadmin/asignaUsuarioPrecontractual`, body)
        .then((response) => {
          setTimeout(() => {
            toast(response.data.mensaje)
            setCargando(false)
            consultaDetalleSolicitud()
          }, 250)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
          }, 250)
        })

    } else {
      toast('No es posible consultar la información, contacte al administrador')
    }
  }

  const consultaDetalleSolicitud = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
      setCargando(true)
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "idProcesamiento": idDetalleSolicitud,
      }
      await axios.post(`${urlEntorno}/service/uadmin/getSolicitudApp`, body)
        .then((response) => {
          setTimeout(() => {
            if (response.data.estado) {
              setDetalleSolicitud(response.data.objeto)
              setShowDetalleSolicitud(true)
            } else {
              toast(response.data.mensaje)
            }
            setCargando(false)
          }, 50)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
          }, 250)
        })
    } else {
      toast('No es posible consultar la información, contacte al administrador')
    }
  }

  const consultaInformacionUsuariosPrecontractual = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'))
      setCargando(true)
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "role": 'PRECONTRATUAL_ROLE',
      }
      await axios.post(`${urlEntorno}/service/uadmin/getUsuariosApp`, body)
        .then((response) => {
          setTimeout(() => {
            const arrayUsers = Array.from(response.data.objeto);
            const userPrecontractual = arrayUsers.map((element) => {
              return {
                value: element.usuario,
                label: element.nombre + ' ' + element.apellidos
              }
            })
            setUsuariosPrecontractual(userPrecontractual)
            if (!response.data.estado) {
              toast(response.data.mensaje)
            }
            consultaDetalleSolicitud()
          }, 150)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
          }, 250)
        })
    } else {
      toast('No es posible consultar la información, contacte al administrador')
    }
  }

  const selectAction = (e) => {
    setUsuarioPrecontractual(e.value)
    setDisabledButtom(false)
  }

  const selectActionSolutionPrecontractual = (e) => {
    
  }

  return (
    <>
      <div className='div-style-form'>
        <div className='div-titulo-component'>
          <h3 className='titulo-form'>Detalle de la solicitud {idDetalleSolicitud}: </h3>
          <button className='btn btn-link bottom-custom-link' onClick={() => setRedirectSolicitudes('LISTA_SOLICITUDES')}>
            <FontAwesomeIcon className='icons-table' icon={faRotateLeft} /> <p className='p-label-bottom-custom-link'>Volver</p>
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> ID Solictud: </p>
              {idDetalleSolicitud}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Fecha de radicación: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.fecha_registro
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Nombres: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.nombres + ' ' + detalleSolicitud.solicitud.apellidos
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Dependencia: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.dependencia
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Autorizado: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.autorizado
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Fondo: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.fondo
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Correo: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.correo
                  :
                  'Cargando ...'
              }
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Descripción: </p>
              {
                showDetalleSolicitud ?
                  detalleSolicitud.solicitud.descripcion
                  :
                  'Cargando ...'
              }
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
            <p className='mb-1'>A continuación, encontrara el listado de documentos asociados a la solicitud {idDetalleSolicitud}. (Dar click en cada uno para visualizar el archivo): </p>
          </div>
          {
            showDetalleSolicitud ?
              detalleSolicitud.urlDocuments.map((urlDoc, i) => {
                return (
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 mt-3" >
                    <a className='a-bottom-custom-link' target='blank' href={urlDoc} >
                      <FontAwesomeIcon className='icons-table' icon={faFilePdf} /> <p className='p-label-bottom-custom-link'>Documento {i + 1} </p>
                    </a>
                  </div>
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
              <div className='div-style-form'>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <p className='mb-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne un analista del area Precontractual:</p>
                      <Select ref={usuarioPrecontractualRef} options={usuariosPrecontractual} onChange={(e) => selectAction(e)} placeholder='Seleccione' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-buttom-registra '>
                      {
                        disabledButtom ?
                          <button className='btn btn-primary bottom-custom' disabled >Asignar</button>
                          :
                          <button className='btn btn-primary bottom-custom' onClick={() => asignaUsuarioPrecontractual()} >Asignar</button>
                      }
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
        showDetalleSolicitud ?
          detalleSolicitud.detalleSolicitudVista.modulo3 ?
            <>
              <div className='div-style-form'>
                <h3 className='titulo-form mb-3'>Resolviendo la solicitud {idDetalleSolicitud}: </h3>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <p className='mb-3'>A continuación, selecciona la tipificacion correcta de la solcitud y deja las observaciones correspondientes:</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <Select ref={opcionesGestionPrecontractualRef} options={opcionesGestionPrecontractual} onChange={(e) => selectActionSolutionPrecontractual(e)} placeholder='Seleccione' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <p className='p-label-form'> Observaciones: </p>
                      <textarea ref={descripcionRef} placeholder='' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} autoComplete='off' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='h-100 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-primary bottom-custom'>Enviar</button>
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
      <div className='div-style-form'>
        <h3 className='titulo-form mb-3'>En que anda mi solicitud {idDetalleSolicitud}: </h3>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
            <p className='mb-1'>A continuación, encontrara el histórico de la gestión asociada a la solicitud {idDetalleSolicitud} </p>
          </div>
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
                  detalleSolicitud.eventosSolicitud.map((evento) => {
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
                          <p className=''></p>
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
    </>
  )
}

export default DetalleSolicitud