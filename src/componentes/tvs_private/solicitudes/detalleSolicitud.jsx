import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faFilePdf, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import axios from 'axios'
import { UtilUrl } from '../../../utilUrl';

const DetalleSolicitud = ({ toast, setCargando, setRedirectSolicitudes, idDetalleSolicitud }) => {

  const { urlEntorno } = UtilUrl();
  const [disabledButtom, setDisabledButtom] = useState(true);
  const [usuariosPrecontractual, setUsuariosPrecontractual] = useState([]);
  const [usuariosPresupuesto, setUsuariosPresupuesto] = useState([]);
  const [usuariosContractual, setUsuariosContractual] = useState([]);
  const [usuariosJefeDependencia, setUsuariosJefeDependencia] = useState([]);

  const [usuarioPrecontractual, setUsuarioPrecontractual] = useState('');
  const [usuarioPresupuesto, setUsuarioPresupuesto] = useState('');
  const [usuarioContractual, setUsuarioContractual] = useState('');
  const [usuarioJefeDependencia, setUsuarioJefeDependencia] = useState('');

  const [detalleSolicitud, setDetalleSolicitud] = useState({});
  const [showDetalleSolicitud, setShowDetalleSolicitud] = useState(false);

  const [resuelvePrecontractual, setResuelvePrecontractual] = useState('');
  const [resuelvePresupuesto, setResuelvePresupuesto] = useState('');
  const [descripcionObservaciones, setDescripcionObservaciones] = useState('');
  const [archivos, setArchivos] = useState([]);

  const usuarioPrecontractualRef = useRef('');
  const usuariosPresupuestoRef = useRef('');
  const usuariosContractualRef = useRef('');
  const usuariosJefeDependenciaRef = useRef('');
  const opcionesGestionPrecontractualRef = useRef('');
  const opcionesGestionPresupuestoRef = useRef('');
  const opcionesGestionContractualRef = useRef('');
  const descripcionObservacionesRef = useRef('');
  const archivosRef = useRef('');

  const opcionesGestionPrecontractual = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'AVANZA_A_PRESUPUESTO', label: 'Avanza a presupuesto' },
    { value: 'RECHAZA_SOLICITUD', label: 'Solicitud rechazada' },
    { value: 'DEVUELVE_JEFE_DEPENDENCIA', label: 'Devolver a Jefe de dependencia' },
  ]

  const opcionesGestionPresupuesto = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'AVANZA_A_CONTRACTUAL', label: 'Avanza a contratación' },
    { value: 'RECHAZA_SOLICITUD', label: 'Solicitud rechazada' },
    { value: 'DEVUELVE_JEFE_DEPENDENCIA', label: 'Devolver a Jefe de dependencia' },
    { value: 'DEVUELVE_A_PRECONTRACTUAL', label: 'Devolver a precontractual' }
  ]

  const opcionesGestionContractual = [
    { value: 'INITIAL', label: 'Seleccione' },
    { value: 'CIERRA_SOLICITUD_SATISFACTORIA', label: 'Cierra solicitud' }
  ]

  useEffect(() => {
    consultaInformacionGeneral();
  }, [])

  const consultaInformacionGeneral = () => {
    consultaInformacionUsuarios('PRECONTRACTUAL_ROLE');
    consultaInformacionUsuarios('PRESUPUETO_ROLE');
    consultaInformacionUsuarios('JEFE_DEPENDENCIA_ROLE');
    consultaInformacionUsuarios('CONTRACTUAL_ROLE');
    consultaDetalleSolicitud();
  }

  const consultaInformacionUsuarios = async (role) => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
      setCargando(true);
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "role": role,
      }
      await axios.post(`${urlEntorno}/service/uadmin/getUsuariosApp`, body)
        .then((response) => {
          setTimeout(() => {
            const arrayUsers = Array.from(response.data.objeto);
            const usersPorRole = arrayUsers.map((element) => {
              return {
                value: element.usuario,
                label: element.nombre + ' ' + element.apellidos
              }
            })
            if (response.data.estado) {
              switch (role) {
                case 'PRECONTRACTUAL_ROLE':
                  setUsuariosPrecontractual(usersPorRole);
                  break
                case 'PRESUPUETO_ROLE':
                  setUsuariosPresupuesto(usersPorRole);
                  break
                case 'JEFE_DEPENDENCIA_ROLE':
                  setUsuariosJefeDependencia(usersPorRole);
                  break
                case 'CONTRACTUAL_ROLE':
                  setUsuariosContractual(usersPorRole);
                  break
                default:
                  break
              }
            } else {
              toast(response.data.mensaje);
            }
          }, 50)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
          }, 50)
        })
    } else {
      toast('No es posible consultar la información, contacte al administrador');
    }
  }

  const asignaUsuarioPrecontractual = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
      setCargando(true);
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "usuarioPrecontractual": usuarioPrecontractual,
        "idProcesamiento": idDetalleSolicitud,
        "fechaEvento": new Date()
      }
      await axios.post(`${urlEntorno}/service/uadmin/asignaUsuarioPrecontractual`, body)
        .then((response) => {
          setTimeout(() => {
            toast(response.data.mensaje);
            setCargando(false);
            setRedirectSolicitudes('LISTA_SOLICITUDES');
          }, 250)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
          }, 250)
        })

    } else {
      toast('No es posible consultar la información, contacte al administrador');
    }
  }

  const resuelvePrecontractualAction = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
      setCargando(true);
      const f = new FormData();
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "idProcesamiento": idDetalleSolicitud,
        "resuelvePrecontractual": resuelvePrecontractual,
        "descripcionObservaciones": descripcionObservaciones,
        "usuarioPresupuesto": usuarioPresupuesto,
        "usuarioJefeDependencia": usuarioJefeDependencia,
        "fechaEvento": new Date()
      }
      f.append('body', JSON.stringify(body));
      for (let index = 0; index < archivos.length; index++) {
        f.append('files', archivos[index])
      }

      await axios.post(`${urlEntorno}/service/uadmin/resuelvePrecontractual`, f)
        .then((response) => {
          setTimeout(() => {
            toast(response.data.mensaje);
            setRedirectSolicitudes('LISTA_SOLICITUDES');
            setCargando(false);
          }, 50)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
          }, 250)
        })
    } else {
      toast('No es posible consultar la información, contacte al administrador');
    }
  }

  const resuelvePresupuestoAction = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
      setCargando(true);
      const f = new FormData();
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "idProcesamiento": idDetalleSolicitud,
        "resuelvePresupuesto": resuelvePresupuesto,
        "descripcionObservaciones": descripcionObservaciones,
        "usuarioContractual": usuarioContractual,
        "usuarioJefeDependencia": usuarioJefeDependencia,
        "usuarioPrecontractual": usuarioPrecontractual,
        "fechaEvento": new Date()
      }
      f.append('body', JSON.stringify(body))
      for (let index = 0; index < archivos.length; index++) {
        f.append('files', archivos[index])
      }
      await axios.post(`${urlEntorno}/service/uadmin/resuelvePresupuesto`, f)
        .then((response) => {
          setTimeout(() => {
            toast(response.data.mensaje);
            setRedirectSolicitudes('LISTA_SOLICITUDES');
            setCargando(false);
          }, 50)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
          }, 250)
        })
    } else {
      toast('No es posible consultar la información, contacte al administrador')
    }
  }

  const consultaDetalleSolicitud = async () => {
    if (!!sessionStorage.getItem('usuarioApp')) {
      const usuarioLocalStorage = JSON.parse(sessionStorage.getItem('usuarioApp'));
      setCargando(true);
      const body = {
        "usuarioApp": usuarioLocalStorage.usuario,
        "idProcesamiento": idDetalleSolicitud,
      }
      await axios.post(`${urlEntorno}/service/uadmin/getSolicitudApp`, body)
        .then((response) => {
          setTimeout(() => {
            if (response.data.estado) {
              setDetalleSolicitud(response.data.objeto);
              setShowDetalleSolicitud(true);
            } else {
              toast(response.data.mensaje);
            }
            setCargando(false);
          }, 50)
        }).catch(() => {
          setTimeout(() => {
            toast('No es posible consultar la información, contacte al administrador');
            setCargando(false);
          }, 250)
        })
    } else {
      toast('No es posible consultar la información, contacte al administrador');
    }
  }

  const selectActionUsuarioPrecontractual = (e) => {
    setUsuarioPrecontractual(e.value);
    setDisabledButtom(false);
  }

  const selectActionSolutionPrecontractual = (e) => {
    archivosRef.current.className = 'form-control';
    archivosRef.current.value = [];
    if (!!usuariosPresupuestoRef.current) {
      usuariosPresupuestoRef.current.setValue(
        {
          value: '', label: ''
        })
    }
    if (!!usuariosJefeDependenciaRef.current) {
      usuariosJefeDependenciaRef.current.setValue(
        {
          value: '', label: ''
        })
    }
    setDisabledButtom(true);
    setUsuarioPresupuesto('');
    setUsuarioJefeDependencia('');
    setDescripcionObservaciones('');
    setArchivos([]);
    setResuelvePrecontractual(e.value);
    if (e.value === 'AVANZA_A_PRESUPUESTO') {
      setDisabledButtom(false);
    }
  }

  const selectActionSolutionPresupuesto = (e) => {
    archivosRef.current.className = 'form-control';
    archivosRef.current.value = [];
    if (!!usuariosJefeDependenciaRef.current) {
      usuariosJefeDependenciaRef.current.setValue(
        {
          value: '', label: ''
        })
    }
    if (!!usuariosContractualRef.current) {
      usuariosContractualRef.current.setValue(
        {
          value: '', label: ''
        })
    }
    setDisabledButtom(true);
    setUsuarioContractual('');
    setUsuarioJefeDependencia('');
    setUsuarioPrecontractual('');
    setDescripcionObservaciones('');
    setArchivos([]);
    setResuelvePresupuesto(e.value);
    if (e.value === 'AVANZA_A_CONTRACTUAL') {
      setDisabledButtom(false);
    }
  }

  const selectActionSolutionContractual = (e) => {

  }

  const eventInputFiles = (e) => {
    const fileList = e.target.files;
    let valorFinalMB = 0;
    for (let step = 0; step < fileList.length; step++) {
      var fileSizeMB = fileList[step].size / 1024 / 1024;
      valorFinalMB = valorFinalMB + fileSizeMB;
    }
    if (valorFinalMB < 20) {
      setArchivos(e.target.files);
    } else {
      toast("*Los archivos cargados superan las 20 MB");
    }
  }

  const solucionaPrecontractual = () => {

    let formValidado = [];
    archivosRef.current.className = 'form-control';

    if (resuelvePrecontractual.length === 0) {
      formValidado.push('resuelvePrecontractual');
    } else {
      if (resuelvePrecontractual === 'INITIAL') {
        formValidado.push('resuelvePrecontractual');
      } else if (resuelvePrecontractual === 'AVANZA_A_PRESUPUESTO') {
        if (archivos.length === 0) {
          formValidado.push('Archivos');
          archivosRef.current.className = 'form-control form-control-error';
        }
        if (usuarioPresupuesto.length === 0) {
          formValidado.push('usuarioPresupuesto');
        }
      } else if (resuelvePrecontractual === 'DEVUELVE_JEFE_DEPENDENCIA') {
        if (usuarioJefeDependencia.length === 0) {
          formValidado.push('usuarioJefeDependencia');
        }
      }
    }

    descripcionObservacionesRef.current.className = 'form-control';
    if (descripcionObservaciones.length === 0) {
      formValidado.push('Descripcion');
      descripcionObservacionesRef.current.className = 'form-control form-control-error';
    }

    if (descripcionObservaciones.length > 250) {
      formValidado.push('Descripcion Longitud');
      descripcionObservacionesRef.current.className = 'form-control form-control-error';
    }

    if (formValidado.length === 0) {
      resuelvePrecontractualAction();
    } else {
      let validaErrorLongitud = false;
      if (formValidado.length === 1) {
        if (formValidado[0] === 'Descripcion Longitud') {
          validaErrorLongitud = true;
        }
      }
      if (validaErrorLongitud) {
        toast('La longitud del campo descripción excede el limite permitido, Max --> 250 Caracteres');
      } else {
        toast('Errores en el formulario de solución precontractual, valide la información');
      }
      formValidado.splice(0, formValidado.length);
    }
  }

  const solucionaPresupuesto = () => {

    let formValidado = [];
    archivosRef.current.className = 'form-control';

    if (resuelvePresupuesto.length === 0) {
      formValidado.push('resuelvePresupuesto');
    } else {
      if (resuelvePresupuesto === 'INITIAL') {
        formValidado.push('resuelvePresupuesto');
      } else if (resuelvePresupuesto === 'AVANZA_A_CONTRACTUAL') {
        if (archivos.length === 0) {
          formValidado.push('Archivos');
          archivosRef.current.className = 'form-control form-control-error';
        }
        if (usuarioContractual.length === 0) {
          formValidado.push('usuarioContractual');
        }
      } else if (resuelvePresupuesto === 'DEVUELVE_JEFE_DEPENDENCIA') {
        if (usuarioJefeDependencia.length === 0) {
          formValidado.push('usuarioJefeDependencia');
        }
      } else if (resuelvePresupuesto === 'DEVUELVE_A_PRECONTRACTUAL') {
        setUsuarioPrecontractual(detalleSolicitud.eventosSolicitud[detalleSolicitud.eventosSolicitud.length - 2].resultado_operacion);
      }
    }

    descripcionObservacionesRef.current.className = 'form-control';
    if (descripcionObservaciones.length === 0) {
      formValidado.push('Descripcion');
      descripcionObservacionesRef.current.className = 'form-control form-control-error';
    }

    if (descripcionObservaciones.length > 250) {
      formValidado.push('Descripcion Longitud');
      descripcionObservacionesRef.current.className = 'form-control form-control-error';
    }

    if (formValidado.length === 0) {
      resuelvePresupuestoAction();
    } else {
      let validaErrorLongitud = false;
      if (formValidado.length === 1) {
        if (formValidado[0] === 'Descripcion Longitud') {
          validaErrorLongitud = true;
        }
      }
      if (validaErrorLongitud) {
        toast('La longitud del campo descripción excede el limite permitido, Max --> 250 Caracteres')
      } else {
        toast('Errores en el formulario de solución presupuesto, valide la información')
      }
      formValidado.splice(0, formValidado.length)
    }

  }

  const solucionaContractual= () => {

  }

  const labelUsuarioControlPrecontractual = () => {
    switch (resuelvePrecontractual) {
      case 'AVANZA_A_PRESUPUESTO':
        return (
          <p className='mt-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne un analista del área Presupuesto:</p>
        )
      case 'DEVUELVE_JEFE_DEPENDENCIA':
        return (
          <p className='mt-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne el Jefe de dependencia:</p>
        )
      default:
        return (
          <></>
        )
    }
  }

  const selectUsuarioControlPrecontractual = () => {
    switch (resuelvePrecontractual) {
      case 'AVANZA_A_PRESUPUESTO':
        return (
          <Select ref={usuariosPresupuestoRef} options={usuariosPresupuesto} onChange={(e) => setUsuarioPresupuesto(e.value)} placeholder='Seleccione' />
        )
      case 'DEVUELVE_JEFE_DEPENDENCIA':
        return (
          <Select ref={usuariosJefeDependenciaRef} options={usuariosJefeDependencia} onChange={(e) => setUsuarioJefeDependencia(e.value)} placeholder='Seleccione' />
        )
      default:
        return (
          <Select isDisabled value='Seleccione' placeholder='' />
        )
    }
  }

  const labelUsuarioControlPresupuesto = () => {
    switch (resuelvePresupuesto) {
      case 'AVANZA_A_CONTRACTUAL':
        return (
          <p className='mt-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne un analista del área de contratación:</p>
        )
      case 'DEVUELVE_JEFE_DEPENDENCIA':
        return (
          <p className='mt-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne el Jefe de dependencia:</p>
        )
      case 'DEVUELVE_A_PRECONTRACTUAL':
        return (
          <p className='mt-3'>La solcitud sera reasignada al Analista Precontractual: {detalleSolicitud.eventosSolicitud[detalleSolicitud.eventosSolicitud.length - 2].resultado_operacion} </p>
        )
      default:
        return (
          <></>
        )
    }
  }

  const selectUsuarioControlPresupuesto = () => {
    switch (resuelvePresupuesto) {
      case 'AVANZA_A_CONTRACTUAL':
        return (
          <Select ref={usuariosContractualRef} options={usuariosContractual} onChange={(e) => setUsuarioContractual(e.value)} placeholder='Seleccione' />
        )
      case 'DEVUELVE_JEFE_DEPENDENCIA':
        return (
          <Select ref={usuariosJefeDependenciaRef} options={usuariosJefeDependencia} onChange={(e) => setUsuarioJefeDependencia(e.value)} placeholder='Seleccione' />
        )
      default:
        return (
          <Select isDisabled value='Seleccione' placeholder='' />
        )
    }
  }

  const validateIconDocumento = (urlDoc, i) => {
    switch (urlDoc.typeArchivo) {
      case 'PDF':
        return (
          <a className='a-bottom-custom-link' target='blank' href={urlDoc.nombreArchivo} >
            <FontAwesomeIcon className='icons-table' icon={faFilePdf} /> <p className='p-label-bottom-custom-link'>Documento {i + 1} </p>
          </a>
        )
      case 'XLS':
        return (
          <a className='a-bottom-custom-link' target='blank' href={urlDoc.nombreArchivo} >
            <FontAwesomeIcon className='icons-table' icon={faFileExcel} /> <p className='p-label-bottom-custom-link'>Documento {i + 1} </p>
          </a>
        )
      default:
        return (
          <a className='a-bottom-custom-link' target='blank' href={urlDoc.nombreArchivo} >
            <FontAwesomeIcon className='icons-table' icon={faFilePdf} /> <p className='p-label-bottom-custom-link'>Documento {i + 1} </p>
          </a>
        )
    }
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
            <p className='mb-1'>A continuación, encontrará el listado de documentos asociados a la solicitud {idDetalleSolicitud}. (Dar click en cada uno para visualizar el archivo): </p>
          </div>
          {
            showDetalleSolicitud ?
              detalleSolicitud.urlDocuments.map((urlDoc, i) => {
                return (
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 mt-3" >
                    {
                      validateIconDocumento(urlDoc, i)
                    }
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
                      <p className='mb-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne un analista del área Precontractual:</p>
                      <Select ref={usuarioPrecontractualRef} options={usuariosPrecontractual} onChange={(e) => selectActionUsuarioPrecontractual(e)} placeholder='Seleccione' />
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
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-9 col-lg-9" >
                    <h3 className='titulo-form mb-3'>Resolviendo la solicitud {idDetalleSolicitud}: </h3>
                  </div>
                  <div className="col-12 col-sm-12 col-md-3 col-lg-3" >
                    <div className='div-head-soluciona-precontractual'>
                      <a className='a-bottom-custom-link' target='blank' href='https://appuadminbucket.s3.amazonaws.com/FORMATOS/U.FT.12.011.008_Lista_chequeo_persona_natural_V_8.0...xls' >
                        <FontAwesomeIcon className='icons-table' icon={faFileExcel} /> <p className='p-label-bottom-custom-link'>Formato PN </p>
                      </a>
                      <a className='a-bottom-custom-link' target='blank' href='https://appuadminbucket.s3.amazonaws.com/FORMATOS/U.FT.12.011.009_Lista_de_chequeo_persona_juridica_V_5.0.xls' >
                        <FontAwesomeIcon className='icons-table' icon={faFileExcel} /> <p className='p-label-bottom-custom-link'>Formato PJ</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <p className='mb-3'>A continuación, selecciona la tipificación correcta de la solicitud y deja las observaciones correspondientes:</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <Select ref={opcionesGestionPrecontractualRef} options={opcionesGestionPrecontractual} onChange={(e) => selectActionSolutionPrecontractual(e)} placeholder='Seleccione' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-upload-file-precontractual'>
                      {
                        disabledButtom ?
                          <input ref={archivosRef} type="file" className='form-control' disabled multiple onChange={(e) => eventInputFiles(e)} />
                          :
                          <input ref={archivosRef} type="file" className='form-control' multiple onChange={(e) => eventInputFiles(e)} />
                      }
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    {
                      labelUsuarioControlPrecontractual()
                    }
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form mt-3'>
                      {
                        selectUsuarioControlPrecontractual()
                      }
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <p className='p-label-form'> Observaciones: </p>
                      <textarea ref={descripcionObservacionesRef} placeholder='' className='form-control' value={descripcionObservaciones} onChange={(e) => setDescripcionObservaciones(e.target.value)} autoComplete='off' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='h-100 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-primary bottom-custom' onClick={() => solucionaPrecontractual()}>Enviar</button>
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
          detalleSolicitud.detalleSolicitudVista.modulo4 ?
            <>
              <div className='div-style-form'>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <h3 className='titulo-form mb-3'>Resolviendo la solicitud {idDetalleSolicitud}: </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <p className='mb-3'>A continuación, selecciona la tipificación correcta de la solicitud y deja las observaciones correspondientes:</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <Select ref={opcionesGestionPresupuestoRef} options={opcionesGestionPresupuesto} onChange={(e) => selectActionSolutionPresupuesto(e)} placeholder='Seleccione' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-upload-file-precontractual'>
                      {
                        disabledButtom ?
                          <input ref={archivosRef} type="file" className='form-control' disabled multiple onChange={(e) => eventInputFiles(e)} />
                          :
                          <input ref={archivosRef} type="file" className='form-control' multiple onChange={(e) => eventInputFiles(e)} />
                      }
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    {
                      labelUsuarioControlPresupuesto()
                    }
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form mt-3'>
                      {
                        selectUsuarioControlPresupuesto()
                      }
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <p className='p-label-form'> Observaciones: </p>
                      <textarea ref={descripcionObservacionesRef} placeholder='' className='form-control' value={descripcionObservaciones} onChange={(e) => setDescripcionObservaciones(e.target.value)} autoComplete='off' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='h-100 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-primary bottom-custom' onClick={() => solucionaPresupuesto()} >Enviar</button>
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
          detalleSolicitud.detalleSolicitudVista.modulo5 ?
            <>
              <div className='div-style-form'>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <h3 className='titulo-form mb-3'>Resolviendo la solicitud {idDetalleSolicitud}: </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                    <p className='mb-3'>A continuación, selecciona la tipificación correcta de la solicitud y deja las observaciones correspondientes:</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <Select ref={opcionesGestionContractualRef} options={opcionesGestionContractual} onChange={(e) => selectActionSolutionContractual(e)} placeholder='Seleccione' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-upload-file-precontractual'>
                      {
                        disabledButtom ?
                          <input ref={archivosRef} type="file" className='form-control' disabled multiple onChange={(e) => eventInputFiles(e)} />
                          :
                          <input ref={archivosRef} type="file" className='form-control' multiple onChange={(e) => eventInputFiles(e)} />
                      }
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form mt-3'>
                      
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                      <p className='p-label-form'> Observaciones: </p>
                      <textarea ref={descripcionObservacionesRef} placeholder='' className='form-control' value={descripcionObservaciones} onChange={(e) => setDescripcionObservaciones(e.target.value)} autoComplete='off' />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='h-100 d-flex align-items-center justify-content-center'>
                      <button className='btn btn-primary bottom-custom' onClick={() => solucionaContractual()} >Enviar</button>
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
    </>
  )
}

export default DetalleSolicitud