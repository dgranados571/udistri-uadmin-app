
export const UtilUrl = () => {

  const urlEntornoLocal = 'http://localhost:8080';
  const urlEntornoLambda = 'https://cgmoazbtxd.execute-api.us-east-1.amazonaws.com/Stage/unadmin';

  const url = {
    1: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/registraSolicitud'
    },
    2: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/loginApp'
    },
    3: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/activacionUsuarioApp'
    },
    4: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getUsuariosApp'
    },
    5: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/actualizaUsuarioApp'
    },
    6: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/registroUsuarioApp'
    },
    7: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/actualizaContraseniaApp'
    },
    8: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getSolicitudesApp'
    },
    9: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getSolicitudesPorUsuarioApp'
    },
    10: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getUsuariosApp'
    },
    11: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getSolicitudApp'
    },
    12: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/asignaUsuarioPrecontractual'
    },
    13: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/resuelvePrecontractual'
    },
    14: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/resuelvePresupuesto'
    },
    15: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/resuelveContractual'
    },
    16: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/cargaDocumentos'
    }
  }

  return {
    apiLambda: true,
    url
  }

}

