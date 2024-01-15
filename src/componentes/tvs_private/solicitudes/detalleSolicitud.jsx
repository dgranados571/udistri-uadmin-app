import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { UtilUrl } from '../../../utilUrl';

const DetalleSolicitud = ({ toast, setCargando, detalleSolicitud }) => {

  const { urlEntorno } = UtilUrl();
  const [usuariosPrecontractual, setUsuariosPrecontractual] = useState([])

  const [disabledButtom, setDisabledButtom] = useState(true)

  useEffect(() => {
    consultaInformacionUsuariosApp()
  }, [])

  const consultaInformacionUsuariosApp = async () => {
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
            setCargando(false)
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

  return (
    <>
      <div className='div-style-form'>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> ID Solictud: </p>
              {detalleSolicitud.id_procesamiento}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Fecha de radicación: </p>
              {detalleSolicitud.fecha_registro}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Nombres: </p>
              {detalleSolicitud.nombres} {detalleSolicitud.apellidos}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Dependencia: </p>
              {detalleSolicitud.dependencia}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Autorizado: </p>
              {detalleSolicitud.autorizado}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Fondo: </p>
              {detalleSolicitud.fondo}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Correo: </p>
              {detalleSolicitud.correo}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='p-label-form'> Descripción: </p>
              {detalleSolicitud.descripcion}
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-form'>
              <p className='mb-3'>Para continuar con la gestión de la presente solicitud, es requerido que le asigne un analista del area Precontractual:</p>
              <Select options={usuariosPrecontractual} placeholder='Seleccione' onChange={()=> setDisabledButtom(false)} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
            <div className='div-buttom-registra '>
              {
                disabledButtom ?
                  <button className='btn btn-primary bottom-custom' disabled >Asignar</button>
                  :
                  <button className='btn btn-primary bottom-custom'  >Asignar</button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetalleSolicitud