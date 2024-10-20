import React from 'react'
import './modal.css'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IModalProps } from '../../../models/IProps'

const Modal: React.FC<IModalProps> = ({ tipoModal, modalSi, modalNo, propsModal }) => {

    const labelArchivosCargados = (prop: boolean) => {
        if (prop) {
            return (
                <div className='div-info-item'>
                    <p className='p-label-form-text'>Si registra</p>
                    <FontAwesomeIcon icon={faCheckCircle} className='icon-modal-info-true' />
                </div>
            )
        } else {
            return (
                <div className='div-info-item'>
                    <p className='p-label-form-text'>No registra</p>
                    <FontAwesomeIcon icon={faXmarkCircle} className='icon-modal-info-false' />                    
                </div>
            )
        }
    }

    const validateTipoModal = () => {
        switch (tipoModal) {
            case 'MODAL_RESUMEN_1':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element'>
                                <div className='div-size-content'>
                                    <h4>{propsModal.titulo}</h4>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>Nombre: </p>
                                        <p className='p-label-form m-1'>{propsModal.prop1} </p>
                                    </div>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>No documento: </p>
                                        <p className='p-label-form m-1'>{propsModal.prop2} </p>
                                    </div>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>Correo: </p>
                                        <p className='p-label-form m-1'>{propsModal.prop3} </p>
                                    </div>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>Teléfono: </p>
                                        <p className='p-label-form m-1'>{propsModal.prop4} </p>
                                    </div>
                                    <hr />
                                    <h4 >Archivos:</h4>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>Documento aspirante: </p>
                                        {
                                            labelArchivosCargados(propsModal.prop5)
                                        }
                                    </div>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>Certificado libertad: </p>
                                        {
                                            labelArchivosCargados(propsModal.prop6)
                                        }
                                    </div>
                                    <div className='div-info-item'>
                                        <p className='p-label-form-text m-1'>Impuesto predial: </p>
                                        {
                                            labelArchivosCargados(propsModal.prop7)
                                        }
                                    </div>
                                    <hr />
                                    <p className='p-label-form'>Es correcta la información?:</p>
                                    <div className='d-flex justify-content-around mt-3'>
                                        <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                                        <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODAL_CONTROL_1':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element'>
                                <div className='div-size-content'>
                                    <h4>{propsModal.titulo} </h4>
                                    <p className='mt-2'>{propsModal.descripcion} </p>
                                    <div className='d-flex justify-content-around mt-3'>                                        
                                        <button className='btn btn-primary bottom-custom' onClick={() => modalNo()} >Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
                case 'MODAL_CONTROL_2':
                    return (
                        <>
                            <div className='div-modal-active'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <h4>{propsModal.titulo} </h4>
                                        <p >{propsModal.descripcion} </p>
                                        <div className='d-flex justify-content-around'>
                                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                                            <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            default:
                break;
        }
    }

    return (
        <>
            {
                validateTipoModal()
            }
        </>
    )
}

export default Modal