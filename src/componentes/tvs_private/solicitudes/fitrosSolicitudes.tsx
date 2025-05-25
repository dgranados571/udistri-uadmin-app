import React, { useEffect, useState } from 'react'
import { AuthServices } from '../../services/authServices';
import { IFitrosSolicitudesProps, IGenericResponse, IListasSelect } from '../../../models/IProps';

const FitrosSolicitudes: React.FC<IFitrosSolicitudesProps> = ({ setCargando, toast, setFaseFiltro, setEventoFiltro, setNombreFiltro, 
    setDepartamentoFiltro, setMunicipioFiltro, setDiasUltimaActualizacionFiltro, faseFiltro, eventoFiltro, nombreFiltro, departamentoFiltro, municipioFiltro, diasUltimaActualizacionFiltro,
    setExecuteConsultaSolicitudes, executeConsultaSolicitudes }) => {

    useEffect(() => {
        obtieneDepartamentoService()
    }, [])

    const fasesList = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'STEP_1', label: 'Fase 1' },
        { value: 'STEP_2', label: 'Fase 2' },
        { value: 'STEP_3', label: 'Fase 3' },
        { value: 'STEP_4', label: 'Fase 4' },
        { value: 'STEP_5', label: 'Fase 5' },
        { value: 'STEP_6', label: 'Fase 6' },
        { value: 'STEP_7', label: 'Finalizadas' },
    ]

    const eventosList = [
        { value: 'INITIAL', label: 'Seleccione' },
        
        { value: 'EVENTO_ASIGNA_A_REVISION', label: 'Asignado a revisor' },
        
        { value: 'CREA_SOLICITUD', label: 'Solicitud creada' },

        { value: 'EVENTO_PREAPROBADO', label: 'Preaprobado' },
        { value: 'EVENTO_NO_PREAPROBADO', label: 'No Preaprobado' },
        { value: 'EVENTO_DEVUELTO_GESTION_CREADOR_SOLICITUD', label: 'Devolución a gestor - creador solicitud' },
        
        { value: 'EVENTO_ESTUDIO_VIABILIDAD', label: 'Viable técnicamente' },
        { value: 'EVENTO_FACTIBLE_ACTUALIZACION', label: 'Factible para actualización' },
        
        { value: 'EVENTO_LICENCIAR', label: 'Licenciar' },
        { value: 'EVENTO_LICENCIA_SUBSIDIO', label: 'Licencia y subsidio' },

        { value: 'EVENTO_DEVUELTO_GESTION', label: 'Devuelto a gestión' },
        { value: 'EVENTO_NO_APROBADO', label: 'No aprobado' },

    ]

    const opcionDiasUltimaActualizacion = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'OPTION_1', label: 'Menor a 5 dias' },
        { value: 'OPTION_2', label: 'Entre 5 y 15 dias' },
        { value: 'OPTION_3', label: 'Mayor a 15 dias' },
    ]

    const [departamentosList, setDepartamentosList] = useState<IListasSelect[]>([]);
    const [municipiosList, setMunicipiosList] = useState<IListasSelect[]>([]);

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
                        label: element.departamento
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

    const limpiarFiltros = () => {
        setFaseFiltro('INITIAL')
        setEventoFiltro('INITIAL')
        setNombreFiltro('')
        setDepartamentoFiltro('INITIAL')
        setMunicipioFiltro('INITIAL')
        setDiasUltimaActualizacionFiltro('INITIAL')
        setExecuteConsultaSolicitudes(!executeConsultaSolicitudes)
        setMunicipiosList([])
    }

    const obtieneMunicipioAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMunicipioFiltro('INITIAL')
        const idDepartamento = e.target.value
        setDepartamentoFiltro(idDepartamento)
        obtieneMunicipioService(idDepartamento)
    }

    const obtieneMunicipioService = async (idDepartamento: string) => {
        setCargando(true);
        const body = {
            "idDepartamento": idDepartamento,
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 25);
            if (response.estado) {
                const arrayMunicipios = Array.from(response.objeto);
                const municipiosList = arrayMunicipios.map((element: any) => {
                    return {
                        value: element.id_municipio,
                        label: element.municipio
                    }
                })
                setMunicipiosList(municipiosList)
            } else {
                toast(response.mensaje)
            }
            setCargando(false);
        } catch (error) {
            toast('No es posible consultar la información, contacte al administrador')
            setCargando(false)
        }
    }

    const ejecutaFiltros = () => {
       setExecuteConsultaSolicitudes(!executeConsultaSolicitudes)
    }

    return (
        <>
            <h4>Filtrar elementos:</h4>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Por fase: </p>
                        <select value={faseFiltro} onChange={(e) => setFaseFiltro(e.target.value)} className='form-control' >
                            {
                                fasesList.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Por evento: </p>
                        <select value={eventoFiltro} onChange={(e) => setEventoFiltro(e.target.value)} className='form-control' >
                            {
                                eventosList.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>                
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Por Departamento: </p>
                        <select value={departamentoFiltro} onChange={(e) => obtieneMunicipioAction(e)} className='form-control' >
                            <option value='INITIAL'>Seleccione</option>
                            {
                                departamentosList.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label.toUpperCase()}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Por Municipio: </p>
                        <select value={municipioFiltro} onChange={(e) => setMunicipioFiltro(e.target.value)} className='form-control' >
                            <option value='INITIAL'>Seleccione</option>
                            {
                                municipiosList.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label.toUpperCase()}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Por No. identificación </p>
                        <input value={nombreFiltro} onChange={(e) => setNombreFiltro(e.target.value)} type="text" className='form-control' placeholder='' autoComplete='off' />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-form'>
                        <p className='p-label-form'>Por dias de última actualización: </p>
                        <select value={diasUltimaActualizacionFiltro} onChange={(e) => setDiasUltimaActualizacionFiltro(e.target.value)} className='form-control' >
                            {
                                opcionDiasUltimaActualizacion.map((key, i) => {
                                    return (
                                        <option key={i} value={key.value}>{key.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>                
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <p className='p-info-filtros'>Para reiniciar la búsqueda, bastará con limpiar los filtros*</p>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-bottom-custom'>
                        <button className='btn btn-secondary bottom-custom-secondary' onClick={() => limpiarFiltros()} >Limpiar filtros</button>
                        <button className='btn btn-primary bottom-custom' onClick={() => ejecutaFiltros()} >Buscar</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FitrosSolicitudes