import React, { useEffect, useState } from 'react'
import './paginador.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { IPaginacion, IPaginadorProps } from '../../../models/IProps'

export const Paginador: React.FC<IPaginadorProps> = ({ elementsPaginacion, setElementsPaginacion }) => {

    const paginasBaseInfo = 10;
    const { totalElementos, elementosPorPagina, paginaActual } = elementsPaginacion

    const [paginacion, setPaginacion] = useState<IPaginacion>({
        paginas: [],
        totalPaginas: 0,
        paginaActual: 0
    });

    useEffect(() => {
        let totalPagBase = Math.trunc(totalElementos / elementosPorPagina);
        const totalPagResiduo = totalElementos % elementosPorPagina;
        if (totalPagResiduo > 0) {
            totalPagBase = totalPagBase + 1;
        }
        let paginaList = []
        if (totalPagBase > paginasBaseInfo) {
            let rangoInicial = (paginaActual - (paginaActual % 10));
            let rangoFinal = rangoInicial + 10;

            if (paginaActual == rangoInicial) {
                rangoInicial = rangoInicial - 10;
                rangoFinal = rangoFinal - 10;
            }
            if (rangoFinal > totalPagBase) {
                rangoFinal = totalPagBase
            }
            for (var i = rangoInicial; i < rangoFinal; i++) {
                let n = i + 1;
                paginaList.push({
                    pageNum: n, classDiv: (n == paginaActual) ?
                        'btn btn-link div-pagina-link-selected' : 'btn btn-link div-pagina-link',
                    classPage: (n == paginaActual) ? 'btn btn-link pagina-link-selected' : 'btn btn-link pagina-link'
                });
            }
        } else {
            for (var i = 0; i < totalPagBase; i++) {
                let n = i + 1;
                paginaList.push({
                    pageNum: n, classDiv: (n == paginaActual) ?
                        'btn btn-link div-pagina-link-selected' : 'btn btn-link div-pagina-link',
                    classPage: (n == paginaActual) ? 'btn btn-link pagina-link-selected' : 'btn btn-link pagina-link'
                });
            }
        }
        setPaginacion({
            paginas: paginaList,
            totalPaginas: totalPagBase,
            paginaActual: paginaActual
        });
    }, [totalElementos, elementosPorPagina, paginaActual])

    const cambiaPagina = (e: React.MouseEvent<HTMLButtonElement>) => {
        setElementsPaginacion({
            ...elementsPaginacion,
            paginaActual: e.currentTarget.id
        })
    }

    const avanzaPage = () => {
        setElementsPaginacion({
            ...elementsPaginacion,
            paginaActual: (paginaActual < paginacion.totalPaginas) ? parseInt(paginaActual, 10) + 1 : paginaActual
        })
    }

    const regresaPage = () => {
        setElementsPaginacion({
            ...elementsPaginacion,
            paginaActual: (paginaActual > 1) ? parseInt(paginaActual, 10) - 1 : paginaActual
        })
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 " >
                <div className='div-pagination'>
                    {
                        paginacion.paginas.length > 0 ?
                            <button onClick={regresaPage} className='btn btn-link pagina-link'><FontAwesomeIcon icon={faAngleLeft} /></button>
                            :
                            <></>
                    }
                    {
                        paginacion.paginas.map((page) => {
                            return (
                                <div className={page.classDiv} >
                                    <button id={page.pageNum} onClick={(e) => cambiaPagina(e)} className={page.classPage}>{page.pageNum}</button>
                                </div>
                            )
                        })
                    }
                    {
                        paginacion.paginas.length > 0 ?
                            <button onClick={avanzaPage} className='btn btn-link pagina-link'><FontAwesomeIcon icon={faAngleRight} /></button>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}
