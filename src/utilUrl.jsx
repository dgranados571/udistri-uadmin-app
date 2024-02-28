
export const UtilUrl = () => {

  const url = {
    1: {
      urlEntornoLocal: 'http://localhost:8080',
      urlEntornoLambda: 'https://353imrvfuj.execute-api.us-east-1.amazonaws.com/Stage/prueba1',
      pathLambda: '/service/uadmin/registraSolicitudLambda',
      path: '/service/uadmin/registraSolicitud'
    }
  }


  return {
    apiLambda: true,
    url
  }

}

