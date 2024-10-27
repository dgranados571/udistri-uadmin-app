
export const UtilUrl = () => {

  const urlEntornoLocal = 'http://localhost:8082';
  const urlEntornoLambda = 'https://cgmoazbtxd.execute-api.us-east-1.amazonaws.com/Stage/unadmin';
  const urlDominioServidor = 'http://34.207.82.37:8082';

  const url: { [key: number]: { urlEntornoLambda: string; urlEntornoLocal: string; urlDominioServidor: string; pathLambda: string; } } = {
    1: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/registraSolicitud',
      urlDominioServidor
    },
    2: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/loginApp',
      urlDominioServidor
    },
    3: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/activacionUsuarioApp',
      urlDominioServidor
    },
    4: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getUsuariosApp',
      urlDominioServidor
    },
    5: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/actualizaUsuarioApp',
      urlDominioServidor
    },
    6: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/registroUsuarioApp',
      urlDominioServidor
    },
    7: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/actualizaContraseniaApp',
      urlDominioServidor
    },
    8: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getSolicitudesApp',
      urlDominioServidor
    },
    9: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getSolicitudesPorUsuarioApp',
      urlDominioServidor
    },
    10: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/getSolicitudApp',
      urlDominioServidor
    },
    11: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/eliminarSolicitud',
      urlDominioServidor
    },
    12: {
      urlEntornoLocal,
      urlEntornoLambda,
      pathLambda: '/service/uadmin/obtenerDocumento',
      urlDominioServidor
    }
  }

  return {
    apiLambda: false,
    url
  }

}

