import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IGenericResponse {
    estado: boolean,
    mensaje: string,
    objeto: any
}

export interface IZoneProps { }

export interface IRadicaSolicitudProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILoginProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IZoneRootProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    infoMenuUsuario: IUsuarioSession
}

export interface IZoneAdminProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    infoMenuUsuario: IUsuarioSession
}

export interface IUsuariosAppProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISolicitudesProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    zonaConsulta: string
}

export interface IListaSolicitudesProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    setRedirectSolicitudes: React.Dispatch<React.SetStateAction<string>>;
    setIdDetalleSolicitud: React.Dispatch<React.SetStateAction<string>>;
    zonaConsulta: string
}

export interface IDetalleSolicitudProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    setRedirectSolicitudes: React.Dispatch<React.SetStateAction<string>>;
    idDetalleSolicitud: string
}

export interface IConfiguracionProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPaginadorProps {
    elementsPaginacion: any
    setElementsPaginacion: React.Dispatch<React.SetStateAction<any>>;
}

export interface IMenuLateralProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selecionaMenu: Function,
    menuLateral: IMenuLateral[],
    openMenu: boolean,
    infoMenuUsuario: IUsuarioSession
}

export interface IModalProps {
    modalSi: Function,
    modalNo: Function,
    tipoModal: string;
    propsModal: IlPropsModal
}

export interface IlPropsModal{
    titulo: string,
    descripcion: string,
    prop1?: string;
    prop2?: string;
    prop3?: string;
    prop4?: string;
    prop5?: boolean;
    prop6?: boolean;
    prop7?: boolean;
    prop8?: IBeneficiarios[];
    prop9?: string;
    prop10?: string;
}

export interface IMenuLateral {
    nombreItem: string;
    className: string;
    iconMenu: IconDefinition
    controlVista: string
}

export interface IUsuarioSession {
    usuario: string;
    nombre_completo: string;
    id_procesamiento: string
}

export interface IListasSelect {
    value: any,
    label: string
}

export interface IPaginacion {
    paginas: any[],
    totalPaginas: number,
    paginaActual: number
}

export interface IBeneficiarios {
    nombresBen: string,
    identificacionBen: string,
    documentoPdfBen: string
    registraDocPdf: boolean
}
