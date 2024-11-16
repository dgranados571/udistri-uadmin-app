import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { FormDetalleInfoSolicitudHandle, FormDetalleInfoSolicitudProps, IGenericResponse, IListasSelect, IlPropsModal } from '../../../models/IProps';
import { AuthServices } from '../../services/authServices';
import Modal from '../../tvs/modal/modal';

const FormDetalleInfoSolicitud: React.ForwardRefRenderFunction<FormDetalleInfoSolicitudHandle, FormDetalleInfoSolicitudProps> = ({ toast, setCargando,
    zonaConsulta, setEditaDetalleSolicitud, solicitud, idDetalleSolicitud }, ref) => {

    useImperativeHandle(ref, () => ({
        funcionHandle1() {
            return validaFormularioSolicitud()
        },
        funcionHandle2() {
            resetForm()
        }
    }));

    useEffect(() => {
        obtieneMunicipioService()
        if (zonaConsulta !== 'ZONA_PUBLICA') {
            setValuesForm()
        }
    }, [])

    const [modalOpen, setModalOpen] = useState(false)
    const [tipoModal, setTipoModal] = useState('')
    const [propsModal, setPropsModal] = useState<IlPropsModal>({
        titulo: '',
        descripcion: '',
    })

    const [municipiosList, setMunicipiosList] = useState<IListasSelect[]>([]);

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
            return {
                prop0: `${nombres}`,
                prop1: `${apellidos}`,
                prop2: numeroIdentificacion,
                prop3: correo,
                prop4: telefono,
                prop9: matriculaInmobiliaria,
                prop10: municipio
            }
        } else {
            formValidado.splice(0, formValidado.length)
            return null
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

    const setValuesForm = () => {
        setNombres(solicitud.nombres)
        setApellidos(solicitud.apellidos)
        setNumeroIdentificacion(solicitud.numero_identificacion)
        setCorreo(solicitud.correo)
        setTelefono(solicitud.telefono)
        setMatriculaInmobiliaria(solicitud.matricula_inmobiliaria)
        setMunicipio(solicitud.departamento_municipio)
    }

    const obtieneMunicipioService = async () => {
        setCargando(true);
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost({}, 17);
            if (response.estado) {
                const arrayDepartamentos = Array.from(response.objeto);
                const municipiosList = arrayDepartamentos.map((element: any) => {
                    return {
                        value: `${element.departamentoMunObj.id_departamento}:${element.municipioObj.id_municipio}`,
                        label: `${element.municipioObj.municipio} -- ${element.departamentoMunObj.id_departamento}.${element.municipioObj.id_municipio}`
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

    const actualizaSolicitud = () => {
        setPropsModal({
            titulo: 'Resumen de la actualización:',
            descripcion: '',
            prop0: nombres,
            prop1: apellidos,
            prop2: numeroIdentificacion,
            prop3: correo,
            prop4: telefono,
            prop9: matriculaInmobiliaria,
            prop10: municipio
        })
        setModalOpen(true)
        setTipoModal('MODAL_RESUMEN_2')
    }

    const modalSi = () => {
        enviaActualizacionSolicitudService()
    }

    const modalNo = () => {
        setModalOpen(false)
        setTipoModal('')
    }

    const enviaActualizacionSolicitudService = async () => {
        setModalOpen(false)
        setTipoModal('')
        setCargando(true)
        const body = {
            "idProcesamiento": idDetalleSolicitud,
            "nombres": propsModal.prop0,
            "apellidos": propsModal.prop1,
            "numeroIdentificacion": propsModal.prop2,
            "correo": propsModal.prop3,
            "telefono": propsModal.prop4,
            "matriculaInmobiliaria": propsModal.prop9,
            "municipio": propsModal.prop10
        }
        const authServices = new AuthServices();
        try {
            const response: IGenericResponse = await authServices.requestPost(body, 22);
            if (response.estado) {
                toast(response.mensaje)
                resetForm()
                cancelaEdicion()
            } else {
                erroRadicacionSolicitud(response.mensaje)
            }
            setCargando(false)
        } catch (error) {
            toast('No es posible crear la solicitud, contacte al administrador')
            setCargando(false)
        }
    }

    const erroRadicacionSolicitud = (descripcionError: string) => {
        setPropsModal({
            titulo: 'Error en la solicitud:',
            descripcion: descripcionError,
        })
        setModalOpen(true)
        setTipoModal('MODAL_CONTROL_1')
    }

    const cancelaEdicion = () => {
        if (setEditaDetalleSolicitud) {
            setEditaDetalleSolicitud(false)
        }
    }

    return (
        <>
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
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-bottom-custom'>
                        {
                            zonaConsulta !== 'ZONA_PUBLICA' ?
                                <>
                                    <button className='btn btn-secondary bottom-custom-secondary' onClick={() => cancelaEdicion()} >Cancelar</button>
                                    <button className='btn btn-primary bottom-custom' onClick={() => { actualizaSolicitud() }} >Actualizar</button>
                                </>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            {
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }
        </>
    )
};


export default forwardRef(FormDetalleInfoSolicitud);