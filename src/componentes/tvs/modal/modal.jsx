import React from 'react'
import './modal.css'

const Modal = ({ modalSi, modalNo }) => {
    return (
        <div className='div-modal-active'>
            <div className='div-content-element'>
                <div className='div-size-content'>
                    <h3 className='titulo-form '>Actualizar constraseña</h3>
                    <p >Esta seguro de actualizar la contraseña del usuario: ROOT</p>
                    <div>
                        <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                        <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal