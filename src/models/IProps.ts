import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IGenericResponse {
    estado: boolean,
    mensaje: string,
    objeto: any
}

export interface IZoneProps { }

export interface IBeneficiariosProps {
    idProcesamiento: string
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    setBeneficiariosList: React.Dispatch<React.SetStateAction<IBeneficiarios[]>>;
    beneficiariosList: IBeneficiarios[]
    setActivaBeneficiarios: React.Dispatch<React.SetStateAction<boolean>>;
    activaBeneficiarios: boolean
    zonaConsulta: string
}

export interface IRadicaSolicitudProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormDetalleInfoSolicitudHandle {
    funcionHandle1: () => any;
    funcionHandle2: () => void;
}

export interface FormDetalleInfoSolicitudProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    zonaConsulta: string;
    setEditaDetalleSolicitud?: React.Dispatch<React.SetStateAction<boolean>>;
    solicitud?: any;
    idDetalleSolicitud?: string,
}

export interface ILoginProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IZoneRootProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    infoMenuUsuario: IUsuarioSession,
    zonaConsulta: string
}

export interface IZoneAdminProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    infoMenuUsuario: IUsuarioSession
}

export interface IZoneRoleProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    infoMenuUsuario: IUsuarioSession
    zonaConsulta: string
}

export interface IUsuariosAppProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    zonaConsulta: string
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
    zonaConsulta: string;
    solicitudesList: any[]

    setExecuteConsultaSolicitudes: React.Dispatch<React.SetStateAction<boolean>>;
    executeConsultaSolicitudes: boolean
}

export interface IDetalleSolicitudProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    setRedirectSolicitudes: React.Dispatch<React.SetStateAction<string>>;
    idDetalleSolicitud: string,
    zonaConsulta: string

    setExecuteConsultaSolicitudes: React.Dispatch<React.SetStateAction<boolean>>;
    executeConsultaSolicitudes: boolean
}

export interface IDetalleInfoSolicitudProps {
    idDetalleSolicitud: string;
    solicitud: any;
    setEditaDetalleSolicitud: React.Dispatch<React.SetStateAction<boolean>>;
    zonaConsulta: string;
    departamentoMunicipioLabel: string
}

export interface IConfiguracionProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    zonaConsulta: string
}

export interface IFitrosSolicitudesProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;

    setFaseFiltro: React.Dispatch<React.SetStateAction<string>>;
    setEventoFiltro: React.Dispatch<React.SetStateAction<string>>;
    setNombreFiltro: React.Dispatch<React.SetStateAction<string>>;
    setDepartamentoFiltro: React.Dispatch<React.SetStateAction<string>>;
    setMunicipioFiltro: React.Dispatch<React.SetStateAction<string>>;
    setDiasUltimaActualizacionFiltro: React.Dispatch<React.SetStateAction<string>>;

    faseFiltro: string;
    eventoFiltro: string;
    nombreFiltro: string;
    departamentoFiltro: string;
    municipioFiltro: string;
    diasUltimaActualizacionFiltro: string;

    setExecuteConsultaSolicitudes: React.Dispatch<React.SetStateAction<boolean>>;
    executeConsultaSolicitudes: boolean
}

export interface IPaginadorProps {
    elementsPaginacion: any
    setElementsPaginacion: React.Dispatch<React.SetStateAction<any>>;

    setExecuteConsultaSolicitudes: React.Dispatch<React.SetStateAction<boolean>>;
    executeConsultaSolicitudes: boolean
}

export interface IMenuLateralProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selecionaMenu: Function,
    menuLateral: IMenuLateral[],
    openMenu: boolean,
    infoMenuUsuario: IUsuarioSession
}

export interface IInstruccionFaseProps {
    role: string,
}

export interface IModalProps {
    modalSi: Function,
    modalNo: Function,
    tipoModal: string;
    propsModal: IlPropsModal
}

export interface IlPropsModal {
    titulo: string,
    descripcion: string,
    prop0?: string;
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
    role: string
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
    apellidosBen: string,
    identificacionBen: string,
    documentoPdfBen: string
    registraDocPdf: boolean,
    documentosDto?: {
        urlTxt: string
    }
}

export interface IListasImages {
    imgBase64: string,
    urlTxt: string
}

export interface IGestionSolicitudProps {
    toast: Function,
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    useSelect: string,
    idDetalleSolicitud: string
    setRedirectSolicitudes: React.Dispatch<React.SetStateAction<string>>;

    setExecuteConsultaSolicitudes: React.Dispatch<React.SetStateAction<boolean>>;
    executeConsultaSolicitudes: boolean
}

export interface IListNotificacionEmail {
    nombreEvento: string,
    labelEvento: string,
    notificaUsuario: boolean,
    correosNotifica: string
}

