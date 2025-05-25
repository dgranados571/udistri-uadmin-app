import React, { useState } from 'react'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './instruccionFase.css';
import F1GD from '../../../img/F1GD.jpeg'
import F2GD from '../../../img/F2GD.jpeg'
import F3GD from '../../../img/F3GD.jpeg'
import F4GD from '../../../img/F4GD.jpeg'
import F5GD from '../../../img/F5GD.jpeg'
import F6GD from '../../../img/F6GD.jpeg'

import F1RD from '../../../img/F1RD.jpeg'
import F2RD from '../../../img/F2RD.jpeg'
import F3RD from '../../../img/F3RD.jpeg'
import F4RD from '../../../img/F4RD.jpeg'
import F5RD from '../../../img/F5RD.jpeg'
import F6RD from '../../../img/F6RD.jpeg'
import { IInstruccionFaseProps } from '../../../models/IProps';

const InstruccionFase: React.FC<IInstruccionFaseProps> = ({ role }) => {

    const imagesGD = [F1GD, F2GD, F3GD, F4GD, F5GD, F6GD];
    const imagesRD = [F1RD, F2RD, F3RD, F4RD, F5RD, F6RD];

    const [currentIndex, setCurrentIndex] = useState(0);

    const selectImage = (index: number) => {
        setCurrentIndex(index);
    };

    const avanzaImage = () => {
        let indexMas = currentIndex + 1
        if (indexMas === imagesGD.length) {
            indexMas = 0
        }
        setCurrentIndex(indexMas);
    };

    const regresaImage = () => {
        let indexMas = currentIndex - 1
        if (indexMas < 0) {
            indexMas = imagesGD.length - 1
        }
        setCurrentIndex(indexMas);
    };

    const validateRedirect = () => {
        switch (role) {
            case 'USUARIO_ROOT':
                return (
                    <>
                        <div className='mt-3'>
                            <div className="control-padre">
                                <div className="control-hijo">
                                    <div className="comando-slide">
                                        <FontAwesomeIcon icon={faAngleLeft} onClick={() => regresaImage()} />
                                    </div>
                                    <div className="dot-padre">
                                        {
                                            imagesGD.map((_, index) => (
                                                <>
                                                    <div key={index} className={currentIndex === index ? "dot-active" : "dot"} onClick={() => selectImage(index)}></div>

                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="comando-slide" onClick={() => avanzaImage()}>
                                        <FontAwesomeIcon icon={faAngleRight} className='' />
                                    </div>
                                </div>
                            </div>
                            <img src={imagesGD[currentIndex]} alt='FXGD' className='imgSlide'></img>
                            <br /> <br />
                            <img src={imagesRD[currentIndex]} alt='FXGD' className='imgSlide'></img>
                        </div>
                    </>
                )
            case 'ROLE_ADMIN':
                return (
                    <>
                        <div className='mt-3'>
                            <div className="control-padre">
                                <div className="control-hijo">
                                    <div className="comando-slide">
                                        <FontAwesomeIcon icon={faAngleLeft} onClick={() => regresaImage()} />
                                    </div>
                                    <div className="dot-padre">
                                        {
                                            imagesGD.map((_, index) => (
                                                <>
                                                    <div key={index} className={currentIndex === index ? "dot-active" : "dot"} onClick={() => selectImage(index)}></div>

                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="comando-slide" onClick={() => avanzaImage()}>
                                        <FontAwesomeIcon icon={faAngleRight} className='' />
                                    </div>
                                </div>
                            </div>
                            <img src={imagesGD[currentIndex]} alt='FXGD' className='imgSlide'></img>
                            <br /> <br />
                            <img src={imagesRD[currentIndex]} alt='FXGD' className='imgSlide'></img>
                        </div>
                    </>
                )
            case 'ROLE_1':
                return (
                    <>
                        <div className='mt-3'>
                            <div className="control-padre">
                                <div className="control-hijo">
                                    <div className="comando-slide">
                                        <FontAwesomeIcon icon={faAngleLeft} onClick={() => regresaImage()} />
                                    </div>
                                    <div className="dot-padre">
                                        {
                                            imagesGD.map((_, index) => (
                                                <>
                                                    <div key={index} className={currentIndex === index ? "dot-active" : "dot"} onClick={() => selectImage(index)}></div>

                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="comando-slide" onClick={() => avanzaImage()}>
                                        <FontAwesomeIcon icon={faAngleRight} className='' />
                                    </div>
                                </div>
                            </div>
                            <img src={imagesGD[currentIndex]} alt='FXGD' className='imgSlide'></img>
                        </div>
                    </>
                )
            case 'ROLE_2':
                return (
                    <>
                        <div className='mt-3'>
                            <div className="control-padre">
                                <div className="control-hijo">
                                    <div className="comando-slide">
                                        <FontAwesomeIcon icon={faAngleLeft} onClick={() => regresaImage()} />
                                    </div>
                                    <div className="dot-padre">
                                        {
                                            imagesGD.map((_, index) => (
                                                <>
                                                    <div key={index} className={currentIndex === index ? "dot-active" : "dot"} onClick={() => selectImage(index)}></div>

                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="comando-slide" onClick={() => avanzaImage()}>
                                        <FontAwesomeIcon icon={faAngleRight} className='' />
                                    </div>
                                </div>
                            </div>
                            <img src={imagesRD[currentIndex]} alt='FXGD' className='imgSlide'></img>
                        </div>
                    </>
                )
            case 'ROLE_3':
                return (
                    <></>
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
                validateRedirect()
            }
        </>
    )
}

export default InstruccionFase