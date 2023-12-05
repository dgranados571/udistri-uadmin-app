import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './componentes/login/login';
import { Cargando } from './componentes/loader/cargando';
import ZoneRoot from './componentes/zone_root/zoneRoot';
import ZoneJefeDependencia from './componentes/zone_jefe_dependencia/zoneJefeDependencia';
import ZonePrecontractual from './componentes/zone_precontractual/zonePrecontractual';
import ZonePresupuesto from './componentes/zone_presupuesto/zonePresupuesto';
import ZoneAfiliaciones from './componentes/zone_afiliaciones/zoneAfiliaciones';
import ZoneContractual from './componentes/zone_contractual/zoneContractual';

function App() {

  const [cargando, setCargando] = useState(false)

  const [redirect, setRedirect] = useState({
    usuario: '',
    rol: 'USUARIO_LOGIN'
  })

  const validateRedirect = () => {
    switch (redirect.rol) {
      case 'USUARIO_LOGIN':
        return (
          <Login setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
      case 'USUARIO_ROOT':
        return (
          <ZoneRoot setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
      case 'JEFE_DEPENDENCIA_ROLE':
        return (
          <ZoneJefeDependencia setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
      case 'PRECONTRATUAL_ROLE':
        return (
          <ZonePrecontractual setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
      case 'PRESUPUETO_ROLE':
        return (
          <ZonePresupuesto setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
      case 'AFILIACIONES_ROLE':
        return (
          <ZoneAfiliaciones setRedirect={setRedirect} toast={toast} setCargando={setCargando}/>
        )
      case 'CONTRATUAL_ROLE':
        return (
          <ZoneContractual setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
      default:
        return (
          <Login setRedirect={setRedirect} toast={toast} setCargando={setCargando} />
        )
    }
  }

  return (
    <>
      <ToastContainer autoClose={4000} hideProgressBar={true} />
      {
        validateRedirect()
      }
      {
        cargando ?
          <Cargando />
          :
          <></>
      }
    </>
  );
}

export default App;
