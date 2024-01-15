import React from 'react'
import './modal.css'

const Modal = ({ modalSi, modalNo, propsModal }) => {

    const titulo = propsModal.titulo
    const descripcion = propsModal.descripcion

    return (
        <div className='div-modal-active'>
            <div className='div-content-element'>
                <div className='div-size-content'>
                    <h3 className='titulo-form '>{titulo} </h3>
                    <p >{descripcion} </p>
                    <div className='d-flex justify-content-around'>
                        <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>
                        <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal