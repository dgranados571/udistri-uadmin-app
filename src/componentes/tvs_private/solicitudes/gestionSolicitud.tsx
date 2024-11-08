import React, { useState } from 'react'
import { IGestionSolicitudProps } from '../../../models/IProps';

const GestionSolicitud: React.FC<IGestionSolicitudProps> = ({ useSelect }) => {

    const [valueSelected, setValueSelected] = useState('');
    const [valueSelectedRef, setValueSelectedRef] = useState(false);

    const [observacion, setObservacion] = useState('');

    const list1 = [
        { value: 'ROLE_ADMIN', label: 'Preaprobado' },
        { value: 'ROLE_1', label: 'No Preaprobado' },
        { value: 'ROLE_2', label: 'Devolución' }
    ]

    const validateSelected = () => {
        switch (useSelect) {
            case 'MODULO_1':
                return (
                    <>
                        <hr />
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-form'>
                                    <p className='mb-3'>Seleccione la tipificación de solución para la solicitud:</p>
                                    <select value={valueSelected} onChange={(e) => setValueSelected(e.target.value)} className={valueSelectedRef ? 'form-control form-control-error' : 'form-control'} >
                                        <option value="INITIAL">Seleccione</option>
                                        {
                                            list1.map((key, i) => {
                                                return (
                                                    <option key={i} value={key.value}>{key.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" ></div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <p className='p-label-form'>Observaciones</p>
                                <textarea className='form-control' value={observacion} onChange={(e) => setObservacion(e.target.value)} autoComplete='off' />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                                <div className='div-bottom-custom '>
                                    <button className='btn btn-primary bottom-custom' >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODULO_2':
                return (
                    <>
                        <hr />
                        MODULO 2
                    </>
                )
            default:
                return (
                    <></>
                )
        }
    }

    return (
        <>
            {
                validateSelected()
            }
        </>
    )
}

export default GestionSolicitud