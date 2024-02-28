
export const UtilUrl = () => {

  const url = {
    1: {
      urlEntornoLocal: 'http://localhost:8080',
      urlEntornoLambda: 'https://rc5bq7717c.execute-api.us-east-1.amazonaws.com/Stage/unadmin',
      pathLambda: '/service/uadmin/registraSolicitudLambda',
      path: '/service/uadmin/registraSolicitud'
    }
  }
  
  return {
    apiLambda: true,
    url
  }

}

