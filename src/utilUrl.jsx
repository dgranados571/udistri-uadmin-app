
export const UtilUrl = () => {

  const urlEntornoLocal = 'http://localhost:8080';
  const urlEntornoLambda = 'https://rc5bq7717c.execute-api.us-east-1.amazonaws.com/Stage/unadmin';

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
    }

  }

  return {
    apiLambda: true,
    url,
    urlEntorno: 'http://localhost:8080'
  }

}

