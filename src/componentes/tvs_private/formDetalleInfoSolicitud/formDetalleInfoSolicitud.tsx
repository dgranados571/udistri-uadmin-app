import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FormDetalleInfoSolicitudHandle, FormDetalleInfoSolicitudProps } from '../../../models/IProps';

const FormDetalleInfoSolicitud: React.ForwardRefRenderFunction<FormDetalleInfoSolicitudHandle, FormDetalleInfoSolicitudProps> = ({
    toast, setCargando, municipiosList, setPropsModal }, ref) => {

    useImperativeHandle(ref, () => ({
        funcionHandle1() {
            return validaFormularioSolicitud()
        },
        funcionHandle2() {
            resetForm()
        },
        funcionHandle3() {            
        }

    }));

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [matriculaInmobiliaria, setMatriculaInmobiliaria] = useState('');
    const [municipio, setMunicipio] = useState('INITIAL');

    const [nombresRef, setNombresRef] = useState(false);
    const [apellidosRef, setApellidosRef] = useState(false);
    const [numeroIdentificacionRef, setNumeroIdentificacionRef] = useState(false);
    const [correoRef, setCorreoRef] = useState(false);
    const [telefonoRef, setTelefonoRef] = useState(false);
    const [matriculaInmobiliariaRef, setMatriculaInmobiliariaRef] = useState(false);
    const [municipioRef, setMunicipioRef] = useState(false);

    const validaFormularioSolicitud = () => {
        let formValidado = [];
        setNombresRef(false)
        if (nombres.length === 0) {
            formValidado.push('Nombres');
            setNombresRef(true)
        }
        setApellidosRef(false)
        if (apellidos.length === 0) {
            formValidado.push('Apellidos');
            setApellidosRef(true)
        }
        setNumeroIdentificacionRef(false)
        if (numeroIdentificacion.length === 0) {
            formValidado.push('Numero identificacion');
            setNumeroIdentificacionRef(true)
        }
        setCorreoRef(false)
        if (correo.length === 0) {
            formValidado.push('correo');
            setCorreoRef(true)
        }
        setTelefonoRef(false)
        if (telefono.length === 0) {
            formValidado.push('telefono');
            setTelefonoRef(true)
        }
        setMatriculaInmobiliariaRef(false)
        if (matriculaInmobiliaria.length === 0) {
            formValidado.push('matriculaInmobiliaria');
            setMatriculaInmobiliariaRef(true)
        }
        setMunicipioRef(false)
        if (municipio === 'INITIAL') {
            formValidado.push('municipio');
            setMunicipioRef(true)
        }
        if (formValidado.length === 0) {
            setPropsModal({
                titulo: 'Resumen de la radicación:',
                descripcion: '',
                prop1: `${nombres} ${apellidos}`,
                prop2: numeroIdentificacion,
                prop3: correo,
                prop4: telefono,
                prop9: matriculaInmobiliaria,
                prop10: municipio
            })
            return true
        } else {
            formValidado.splice(0, formValidado.length)
            return false
        }
    }

    const resetForm = () => {
        setNombres('')
        setApellidos('')
        setNumeroIdentificacion('')
        setCorreo('')
        setTelefono('')
        setMatriculaInmobiliaria('')
        setMunicipio('INITIAL')
        setNombresRef(false)
        setApellidosRef(false)
        setNumeroIdentificacionRef(false)
        setCorreoRef(false)
        setTelefonoRef(false)
        setMatriculaInmobiliariaRef(false)
        setMunicipioRef(false)
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'>Apellidos: </p>
                    <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={apellidosRef ? 'form-control form-control-error' : 'form-control'} />
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'>Nombres: </p>
                    <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} className={nombresRef ? 'form-control form-control-error' : 'form-control'} />
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'>Cédula: </p>
                    <input type="text" value={numeroIdentificacion} onChange={(e) => setNumeroIdentificacion(e.target.value)} className={numeroIdentificacionRef ? 'form-control form-control-error' : 'form-control'} />
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'>Correo: </p>
                    <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} className={correoRef ? 'form-control form-control-error' : 'form-control'} />
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'> Teléfono: </p>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={telefonoRef ? 'form-control form-control-error' : 'form-control'} />
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'> Matricula inmobiliaria: </p>
                    <input type="text" value={matriculaInmobiliaria} onChange={(e) => setMatriculaInmobiliaria(e.target.value)} className={matriculaInmobiliariaRef ? 'form-control form-control-error' : 'form-control'} />
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                <div className='div-form'>
                    <p className='p-label-form'> Municipio: </p>
                    <select value={municipio} onChange={(e) => setMunicipio(e.target.value)} className={municipioRef ? 'form-control form-control-error' : 'form-control'} >
                        <option value='INITIAL'>Seleccione</option>
                        {
                            municipiosList.map((key, i) => {
                                return (
                                    <option key={i} value={key.value}>{key.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    )
};


export default forwardRef(FormDetalleInfoSolicitud);