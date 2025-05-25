import React, { useState } from 'react'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './instruccionFase.css';
import { IInstruccionFaseProps } from '../../../models/IProps';

const InstruccionFase: React.FC<IInstruccionFaseProps> = ({ role }) => {

    const imagesGD = [
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F1GD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F2GD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F3GD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F4GD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F5GD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F6GD.jpeg",
    ];

    const imagesRD = [
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F1RD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F2RD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F3RD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F4RD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F5RD.jpeg",
        "https://appuadminbucket.s3.us-east-1.amazonaws.com/SOURCES_APP/IMAGE_FASES_APP/F6RD.jpeg",
    ];
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