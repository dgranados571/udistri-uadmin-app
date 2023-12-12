import React from 'react'
import Select from 'react-select'

const RadicaSolicitud = () => {

    const tiposDeFondo = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'FONDO_GENERICO', label: 'Fondo genérico - 2017' },
        { value: 'FONDO_PROYECTO_EXTENCION', label: 'Proyecto de extención - 2067' }
    ]

    const dependiencias = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'DECANATURA', label: 'Decanatura' },
        { value: 'VICEDECANATURA_ACADEMICA', label: 'Vicedecanatura académica' },
        { value: 'VICEDECANATURA', label: 'Vicedecanatura' },
        { value: 'PROGRAMA_ACOMPANAMIENTO_ACADEMICO', label: 'Programa de acompañamiento académico' },
        { value: 'OFICINA_CALIDAD', label: 'Oficina de calidad' },
        { value: 'VICEDECANATURA_INVESTIGACION_EXTENSION', label: 'Vicedecanatura de investigación y extensión' },
        { value: 'VICEDECANATURA_ACADEMICA_UNIJUS', label: 'Vicedecanatura académica UNIJUS' },
        { value: 'CONSULTORIO_JURIDICO', label: 'Consultorio juridico' },
        { value: 'CENTRO_CONCILIACION', label: 'Centro de conciliación' },
        { value: 'CENTRO_EXTENSION_EDUCACION_CONTINUA', label: 'Centro de extensión y educación continua' },
        { value: 'SECRETARIA_ACADEMICA', label: 'Secretaría académica' },
        { value: 'AREA_CURRICULAR_DEPARTAMENTO_DERECHO', label: 'Area curricular y departamento de derecho' },
        { value: 'AREA_CURRICULAR_DEPARTAMENTO_CIENCIA_POLITICA', label: 'Area curricular y departamento de ciencia política' },
        { value: 'UNIDAD_ADMINISTRATIVA_TESORERIA', label: 'Unidad administrativa y tesoreria' },
        { value: 'DIRECCION_BIENESTAR', label: 'Dirección de bienestar' }
    ]

    return (
        <>
            <div className='div-container'>
                <div className='div-style-form'>
                    <h3 className='titulo-form'>Registro de solicitud contractual</h3>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Dependencia: </p>
                                <Select placeholder='Seleccione' options={dependiencias} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Nombre completo: </p>
                                <input type="text" className='form-control' placeholder='' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Autorizado por: </p>
                                <input placeholder='' className='form-control' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Fondo: </p>
                                <Select placeholder='Seleccione' options={tiposDeFondo} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Descripción de la solictud: </p>
                                <textarea placeholder='' className='form-control' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-buttom-registra'>
                                <button className='btn btn-primary bottom-custom' >Registrar solicitud</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadicaSolicitud