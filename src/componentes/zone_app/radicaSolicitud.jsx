import React, { useRef, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { UtilUrl } from '../../utilUrl';

const RadicaSolicitud = ({ toast, setCargando }) => {

    const { urlEntorno } = UtilUrl();

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [dependencia, setDependencia] = useState('');
    const [autorizado, setAutorizado] = useState('');
    const [fondo, setFondo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivos, setArchivos] = useState([]);

    const nombresRef = useRef('')
    const apellidosRef = useRef('')
    const correoRef = useRef('')
    const dependenciaRef = useRef('')
    const autorizadoRef = useRef('')
    const fondoRef = useRef('')
    const descripcionRef = useRef('')
    const archivosRef = useRef('')

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

    const eventInputFiles = (e) => {
        const fileList = e.target.files;
        let valorFinalMB = 0;
        for (let step = 0; step < fileList.length; step++) {
            var fileSizeMB = fileList[step].size / 1024 / 1024;
            valorFinalMB = valorFinalMB + fileSizeMB;
        }
        if (valorFinalMB < 20) {
            setArchivos(e.target.files)
        } else {
            toast("*Los archivos cargados superan las 20 MB")
        }
    }

    const registraSolcitud = () => {


        let formValidado = [];

        nombresRef.current.className = 'form-control'
        if (nombres.length === 0) {
            formValidado.push('Nombres');
            nombresRef.current.className = 'form-control form-control-error';
        }

        apellidosRef.current.className = 'form-control'
        if (apellidos.length === 0) {
            formValidado.push('Apellidos');
            apellidosRef.current.className = 'form-control form-control-error';
        }

        correoRef.current.className = 'form-control'
        if (correo.length === 0) {
            formValidado.push('correo');
            correoRef.current.className = 'form-control form-control-error';
        }

        autorizadoRef.current.className = 'form-control'
        if (autorizado.length === 0) {
            formValidado.push('Autorizado');
            autorizadoRef.current.className = 'form-control form-control-error';
        }

        descripcionRef.current.className = 'form-control'
        if (descripcion.length === 0) {
            formValidado.push('Descripcion');
            descripcionRef.current.className = 'form-control form-control-error';
        }
        if (descripcion.length > 250) {
            formValidado.push('Descripcion Longitud');
            descripcionRef.current.className = 'form-control form-control-error';
        }

        archivosRef.current.className = 'form-control'
        if (archivos.length === 0) {
            formValidado.push('Archivos');
            archivosRef.current.className = 'form-control form-control-error';
        }

        if (formValidado.length === 0) {
            enviaRegistroSolictud()
        } else {
            let validaErrorLongitud = false;
            if (formValidado.length === 1) {
                if (formValidado[0] === 'Descripcion Longitud') {
                    validaErrorLongitud = true;
                }
            }
            if (validaErrorLongitud) {
                toast('La longitud del campo descripción excede el limite permitido')
            } else {
                toast('Errores en el formulario de registro, valide la información')
            }
            formValidado.splice(0, formValidado.length)
        }
    }

    const resetForm = () => {
        setNombres('')
        setApellidos('')
        setCorreo('')
        dependenciaRef.current.setValue(dependiencias[0])
        setAutorizado('')
        fondoRef.current.setValue(tiposDeFondo[0])
        setDescripcion('')
        setArchivos([])
    }

    const enviaRegistroSolictud = async () => {
        setCargando(true)
        const f = new FormData();
        const body = {
            "nombres": nombres,
            "apellidos": apellidos,
            "correo": correo,
            "dependencia": dependencia,
            "autorizado": autorizado,
            "fondo": fondo,
            "descripcion": descripcion,
            "fechaRegistro": new Date()
        }
        f.append('body', JSON.stringify(body))
        for (let index = 0; index < archivos.length; index++) {
            f.append('files', archivos[index])
        }
        await axios.post(`${urlEntorno}/service/uadmin/registraSolicitud`, f)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    if (response.data.estado) {
                        resetForm()
                    }
                    toast(response.data.mensaje)
                }, 250)
            }).catch(() => {
                setTimeout((e) => {
                    setCargando(false)
                    toast('No es posible el registro, contacte al administrador')
                }, 250)
            })
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-style-form'>
                    <h3 className='titulo-form'>Registro de solicitud contractual</h3>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Nombres: </p>
                                <input ref={nombresRef} type="text" className='form-control' value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder='' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Apellidos: </p>
                                <input ref={apellidosRef} type="text" className='form-control' value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder='' autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Correo: </p>
                                <input ref={correoRef} placeholder='' className='form-control' value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Dependencia: </p>
                                <Select ref={dependenciaRef} options={dependiencias} onChange={(e) => setDependencia(e.value)} placeholder='Seleccione' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Autorizado por: </p>
                                <input ref={autorizadoRef} placeholder='' className='form-control' value={autorizado} onChange={(e) => setAutorizado(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'>Fondo: </p>
                                <Select ref={fondoRef} options={tiposDeFondo} onChange={(e) => setFondo(e.value)} placeholder='Seleccione' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-form'>
                                <p className='p-label-form'> Descripción de la solictud: </p>
                                <textarea ref={descripcionRef} placeholder='' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} autoComplete='off' />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-buttom-registra'>
                                <input ref={archivosRef} type="file" className='form-control' multiple onChange={(e) => eventInputFiles(e)} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                            <div className='div-buttom-registra'>
                                <button className='btn btn-primary bottom-custom' onClick={() => registraSolcitud()}  >Registrar solicitud</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadicaSolicitud