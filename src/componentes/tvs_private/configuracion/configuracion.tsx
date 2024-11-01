import React, { useEffect, useState } from 'react'
import { IConfiguracionProps, IGenericResponse, IListasSelect } from '../../../models/IProps'
import { AuthServices } from '../../services/authServices'

const Configuracion: React.FC<IConfiguracionProps> = ({ toast, setCargando }) => {

    const [departamento, setDepartamento] = useState('')
    const [idDepartamento, setIdDepartamento] = useState('')

    const [municipio, setMunicipio] = useState('')
    const [idMunicipio, setIdMunicipio] = useState('')
    const [departamentoMun, setDepartamentoMun] = useState('INITIAL')

    const [departamentoRef, setDepartamentoRef] = useState(false)
    const [idDepartamentoRef, setIdDepartamentoRef] = useState(false)

    const [municipioRef, setMunicipioRef] = useState(false)
    const [idMunicipioRef, setIdMunicipioRef] = useState(false)
    const [departamentoMunRef, setDepartamentoMunRef] = useState(false)

    const [departamentosList, setDepartamentosList] = useState<IListasSelect[]>([]);
    const [municipiosList, setMunicipiosList] = useState<any[]>([])

    useEffect(() => {
        obtieneDepartamentoService()
        obtieneMunicipioService()
    }, [])

    const guardarDepartamentoAction = () => {
        let formValidado = [];

        setDepartamentoRef(false)
        if (departamento.length === 0) {
            formValidado.push('departamento');
            setDepartamentoRef(true)
        }

        setIdDepartamentoRef(false)
        if (idDepartamento.length === 0) {
            formValidado.push('idDepartamento');
            setIdDepartamentoRef(true)
        }

        if (formValidado.length === 0) {
            guardarDepartamentoService()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const guardarMunicipioAction = () => {
        let formValidado = [];

        setMunicipioRef(false)
        if (municipio.length === 0) {
            formValidado.push('municipio');
            setMunicipioRef(true)
        }

        setIdMunicipioRef(false)
        if (idMunicipio.length === 0) {
            formValidado.push('idMunicipio');
            setIdMunicipioRef(true)
        }

        setDepartamentoMunRef(false)
        if (departamentoMun === 'INITIAL') {
            formValidado.push('departamentoMun');
            setDepartamentoMunRef(true)
        }

        if (formValidado.length === 0) {
            guardarMunicipioService()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de registro, valide la información')
        }
    }

    const resetFormDepartamento = () => {
        setDepartamento('')
        setIdDepartamento('')
    }

    const resetFormMunicipio = () => {
        setMunicipio('')
        setIdMunicipio('')
        setDepartamentoMun('INITIAL')
    }

    const guardarDepartamentoService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        const body = {
            "departamento": departamento,
            "idDepartamento": idDepartamento,
        }
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 14);
            toast(response.mensaje)
            if (response.estado) {
                resetFormDepartamento()
                obtieneDepartamentoService()
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible registrar la información, contacte al administrador')
            setCargando(false)
        }
    }

    const obtieneDepartamentoService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost({}, 15);
            if (response.estado) {
                const arrayDepartamentos = Array.from(response.objeto);
                const departamentosList = arrayDepartamentos.map((element: any) => {
                    return {
                        value: element.id_departamento,
                        label: `${element.departamento} -- ${element.id_departamento}`
                    }
                })
                setDepartamentosList(departamentosList)
            } else {
                toast(response.mensaje)
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
        }
    }

    const guardarMunicipioService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        const body = {
            "municipio": municipio,
            "idMunicipio": idMunicipio,
            "departamentoMun": departamentoMun
        }
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 16);
            toast(response.mensaje)
            if (response.estado) {
                resetFormMunicipio()
                obtieneMunicipioService()
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible registrar la información, contacte al administrador')
            setCargando(false)
        }
    }

    const obtieneMunicipioService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost({}, 17);
            if (response.estado) {
                setMunicipiosList(response.objeto)
            } else {
                toast(response.mensaje)
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
        }
    }

    return (
        <div className='div-style-form'>
            <h4>Configuración de parámetros:</h4>
            <p className='mb-4'>Aqui podrá configurar los departamentos y municipios donde se lleven a cabo las solicitudes:</p>
            <hr />
            <h4>Registrar departamentos:</h4>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-5" >
                    <div className='div-form'>
                        <p className='p-label-form'> Departamento: </p>
                        <input value={departamento} onChange={(e) => setDepartamento(e.target.value)} type="text" className={departamentoRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4" >
                    <div className='div-form'>
                        <p className='p-label-form'> Id de Departamento: </p>
                        <input value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)} type="text" className={idDepartamentoRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-3" >
                    <div className='div-bottom-custom'>
                        <button className='btn btn-primary bottom-custom' onClick={() => guardarDepartamentoAction()} >Guardar</button>
                    </div>
                </div>
            </div>
            <hr />
            <h4>Registrar Municipios:</h4>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'> Municipio: </p>
                        <input value={municipio} onChange={(e) => setMunicipio(e.target.value)} type="text" className={municipioRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'> Id de Municipio: </p>
                        <input value={idMunicipio} onChange={(e) => setIdMunicipio(e.target.value)} type="text" className={idMunicipioRef ? 'form-control form-control-error' : 'form-control'} placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'> Departamento al que pertenece: </p>
                        <select value={departamentoMun} onChange={(e) => setDepartamentoMun(e.target.value)} className={departamentoMunRef ? 'form-control form-control-error' : 'form-control'} >
                            <option value="INITIAL">Selecione</option>
                            {
                                departamentosList.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-bottom-custom'>
                        <button className='btn btn-primary bottom-custom' onClick={() => guardarMunicipioAction()} >Guardar</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='div-style-form-whit-table'>
                <table className='table-info'>
                    <thead>
                        <tr>
                            <td className='td-info'>
                                <p className='p-label-form'>Departamento </p>
                            </td>
                            <td className='td-info'>
                                <p className='p-label-form'>Municipio </p>
                            </td>
                            <td className='td-info'>
                                <p className='p-label-form'>Id municipio</p>
                            </td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            municipiosList.map((municipioDto, key) => {
                                return (
                                    <tr key={key} className='tr-tablet'>
                                        <td className='td-info'>
                                            <p className=''>{municipioDto.departamentoMunObj.departamento}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''>{municipioDto.municipioObj.municipio}</p>
                                        </td>
                                        <td className='td-info'>
                                            <p className=''>SKU-{municipioDto.departamentoMunObj.id_departamento}.{municipioDto.municipioObj.id_municipio}</p>
                                        </td>                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Configuracion