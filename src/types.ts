import { ColumnDef } from "@tanstack/react-table";
import { ReactElement, ReactNode } from "react";
import { InputHTMLAttributes } from "react";
// DOMAIN TYPES
export interface Apontamento {
  id: string;
  horas: number;
  data: string;
  periodo: Periodo;
  projeto: Projeto;
  atividade: AtividadeApontamento;
  secao: Secao;
  observacao: string;
  colaborador: Colaborador;
  documento: Documento;
}

export interface Documento {
  codigo: string;
  a1: number;
}

export interface CentroCusto {
  codigo: string;
  descricao: string;
  ativo: string;
}

export interface Periodo {
  id: number;
  inicio: string;
  fim: string;
}

export interface Medicao {
  id: number;
  horas: number;
  valor: number;
  periodo: Periodo;
  nome: string;
  status: string;
  desconto?: number;
  apontamento: boolean;
  aprovada: boolean;
  reprovada: boolean;
  aprovacao: {
    id: string;
  };
  pendente: boolean;
  cancelada: boolean;
  markedToIntegrate: boolean;
}

export interface UserDataInTime {
  horas: number;
  valor: number;
  periodo: Periodo;
}

export interface Projeto {
  id: number;
  nome: string;
  titulo: string;
  codigo: string;
  contrato: Contrato;
}

export interface AtividadeApontamento {
  codigo: string;
  id: string;
  nome: string;
  obrigatorioApontarDocumento: boolean;
}

export interface Secao {
  id: string;
  nome: string;
  disciplina: Disciplina;
  codigo: string;
  descricao: string;
  filialAuxiliar: FilialAuxiliar;
  centroCustoGerencia: CentroCustoGerencia;
  dadosComplementares: DadosComplementaresSecao;
}

export interface DadosComplementaresSecao {
  jornadaEspecifica: boolean;
}

/* 
    Types do Painel Gestor
*/
export interface SecaoReport {
  horas: number;
  colaboradores: number;
  horasPJ: number;
  valorMedio: number;
  valorCLT: number;
  valorPJ: number;
  colaboradoresCLT: number;
  colaboradoresPJ: number;
  valor: number;
  valorMedioPJ: number;
  horasCLT: number;
  valorMedioCLT: number;
  valorMes: ValorMes[];
  atividades: Atividade[];
  projetos: Projeto[];
  colaboradoresPeriodo: ColaboradorPeriodo[];
}

export interface Atividade {
  valor_hora: number;
  valor: number;
  horas: number;
  atividade_nome: string;
  colaboradores: number;
}

export interface Projeto {
  projeto_codigo: string;
  valor: number;
  valor_hora: number;
  horas: number;
  colaboradores: number;
}

export interface ValorMes {
  mes: string;
  valor: number;
  horas: number;
}

export interface ColaboradorPeriodo {
  atrasado: boolean;
  codigo: string;
  equipe: string;
  horas: number;
  nome: string;
  periodoFim: string;
  periodoInicio: string;
  secao: string;
  solicitado: boolean;
  valorTotal: number;
  valorHora: number;
  status: string;
}

export interface ApontamentoColaborador {
  atividadeCodigo: string;
  atividadeId: string;
  atividadeNome: string;
  centroCusto: string;
  data: string;
  horas: number;
  horasExtras: number;
  id: string;
  nomeColaborador: string;
  observacao: string;
  periodo: Periodo[];
  projetoCodigo: string;
  projetoId: string;
  projetoTitulo: string;
  registro: string;
  secao: Secao[];
  valorHora: number;
  valorTotal: number;
}

export interface ColaboradorData {
  apontamentos: ApontamentoColaborador[];
  atividades: Atividade[];
  projetos: Projeto[];
  valorMes: ValorMes[];
  horas: number;
  horasCLT: number;
  horasPJ: number;
  valor: number;
  valorCLT: number;
  valorPJ: number;
  valorMedio: number;
  valorMedioCLT: number;
  valorMedioPJ: number;
}

export interface DashboardCard<T> {
  data: T[];
  customToolTip: JSX.Element;
  title: string;
  isLoadingSkeleton: boolean;
}

export interface GraphicAtividadeBarCard {
  datakey: string;
  fill: string;
  activeFill: any;
  value: number;
  setAtividadeIndexSelect: Function;
  atividadesReportKeys: any;
}

export interface ListOfCollaboratorsCard {
  colaboradorFilter: string;
  setColaboradorFilter: Function;
  showValue: boolean;
  setShowValue: Function;
  filtredColaboradores: ColaboradorPeriodo[];
  isLoadingFuncionarios: boolean;
  title: string;
  openModal?: ArrowFunction;
}
/*
 */

export interface Disciplina {
  nome: string;
  codigo: string;
}

export interface CentroCustoGerencia {
  nome: string;
  codigo: string;
}

export interface FilialAuxiliar {
  nome: string;
  codigo: string;
}

export interface Colaborador {
  nome: string;
  matricula: string;
  secao: string;
  valorHora: number;
  valorTotal: number;
  codigo: string;
}

export interface DadosColaborador {
  id: string;
  nome: string;
  valorHoraCLT: number;
  valorHoraPJ: number;
  valorBonus: number;
  valorTotal: number;
  codigoChefeInterno: string;
  nomeChefeInterno: string;
  codigoChefeExterno: string;
  nomeChefeExterno: string;
  codigoSupervisorInterno: string;
  nomeSupervisorInterno: string;
  codigoSupervisorExterno: string;
  nomeSupervisorExterno: string;
}

export interface Empresa {
  id: number | string;
  nome: string;
  cnpj: string;
  codigo: string;
}

export interface Contrato {
  id: number;
  titulo: string;
  codigo: string;
  localExecucao: string;
}

export interface RegistroExtraordininario {
  id: string;
  user: string;
  inicio: Date;
  fim: Date;
  tipo: number;
  horas: number;
  saldo: number;
  cancelado: boolean;
}

export interface RegrasAprovacao {
  codigo: string;
  tipo: string;
}

// APPLICATIONS TYPES

export interface RequestProps {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Object | null;
  actionName:
    | "Cadastrar"
    | "Atualizar"
    | "Deletar"
    | "Operar"
    | "Exportar"
    | "Importar"
    | "Listar"
    | "Solicitar"
    | "Aprovar"
    | "Reprovar"
    | "Obter";
  onSuccess?: (response: any) => void;
  onError?: () => void;
  params?: Object | null;
  showToastOnError?: boolean;
  name?: string;
  downloadResponse?: boolean;
  sortBy?: string | null;
  disableSuccessToast?: boolean;
}

export interface TableOption {
  /**
   * Nome da ação
   */
  name: string;
  /**
   * Função que é executada. Passa o(s) elemento(s) selecionado(s).
   */
  action: (item?: Object) => void;
  /**
   * @params Elemento(s) selecionado(s)
   * @returns Se a opção pode ser executada
   */
  condition?: (item: Object) => boolean;
  conditionIvalidMessage?: string;

  type:
    | "create"
    | "update"
    | "delete"
    | "view"
    | "export"
    | "approve"
    | "approveDiscount"
    | "terminate"
    | "show"
    | "hide"
    | "upload"
    | "observation";
  optionDatacy: string;

  /**
   * Se ação será chamada no double click da linha, se pode ter uma
   */
  doubleClickAction?: boolean;
}

export interface TableModel<T> {
  /**
   * Url base para requisições
   * @type {string}
   */
  baseUrl: string;

  itemsPerPage?: number;

  /**
   * Corpo que será enviado para a api filtrar
   * @type {boolean}
   */
  apiFilter?: Object;
  /**
   * Colunas da tabela
   *  @type {ColumnDef[]}
   */
  columns: ColumnDef<any>[];

  /**
   * Array de opções do navbar fa tabela
   * @type {TableOption}
   */
  options: TableOption[];
  reloadFilter?: boolean;

  setReloadFilter?: (value: boolean) => void;

  /**
   * Define se a tabela deve ser carregada ao abrir
   * @type {boolean}
   */

  loadOnOpen?: boolean;

  /**
   * Define se a tabela seleciona múltiplas lines
   * @type {boolean}
   */
  multipleSelect?: boolean;
  // setLoad?: boolean;

  /**
   * Define qual api a tabela deve chamar
   * @type {function}
   */
  apiCall: any;

  /**
   * Define qual propriedade do objeto será usada como key
   * @type {string}
   */
  identifier?: string;

  /**
   * Props customizadas quando a tabela precisa renderizar uma propriedade de um objeto
   * @type {any}
   */
  customSortOption?: any;

  loadSortOptions?: (setResult) => void;

  /**
   * Campos que serão somados e exibidos no rodapé da tabela
   */
  acculumativeFields?: TableAccumulativeField[];

  /**
   * Nome dos tablesAcessors que serão consideradores para serem ocultados com skeleton
   */

  hiddenCells?: string[];

  getCustomClass?: (item: T) => string;
}

export interface TableAccumulativeField {
  name: string;
  getter: (option: Object) => string;
  formatter: (value: number) => string;
}

export interface PageProps<T> {
  data: T[];
  actualPage: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  loading: boolean;
  sortedBy?: string;
}

export interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "email";
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  type?: "number";
}

export interface NumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  sortBy: string;
  numberOfElements: number;
}

export interface TableResultOrderController {
  options: string[];
  setOrderOption: ArrowFunction;
  orderedBy: String | null;
}

export interface MedicaoServicoTerceiros {
  id: string;
}

export interface ModalAction {
  closeModal: VoidArrowFunction;
  item?: Object | null;
  submit: ArrowFunction;
}

export interface ButtonActionProps {
  submit?: Function;
  message?: string;
  type?: "button" | "submit" | "reset" | undefined;
  datacy: string;
  buttonType:
    | "button-search"
    | "button-clear"
    | "button-add"
    | "button-reject"
    | "button-confirm"
    | "button-dashboard"
    | "button-report"
    | "button-clear-dashboard";
}

export interface ButtonModalProps {
  submit?: ArrowFunction;
  message?: string;
  id: string;
  type?: "button" | "submit" | "reset" | undefined;
  datacy: string;
  gridStart?: string;
  gridEnd?: string;
}

export interface Bancos {
  ispb: string;
  name?: string;
  code?: number;
  fullName?: string;
}

export interface ModalController {
  open: ArrowFunction;
  close: VoidArrowFunction;
  submit: ArrowFunction;
  markedElement: any;
  isOpened: boolean;
  getOverlayClass: () => string;
  handlePress: (event: any, modalRef: any) => void;
  key: number;
}

export interface ModalProps {
  title?: string;
  buttonConfirmMessage?: string;
  controller: ModalController;
  body?: ReactElement | null;
  showButtonCancel?: boolean;
  showButtonConfirm?: boolean;
  showHeaderCloseSvg?: boolean;
  customButtons?: ButtonActionProps[];
  customModalTemplate?: string;
  overrideSubmit?: () => void;
}

export interface VoidArrowFunction {
  (): void;
}

export interface ArrowFunction {
  (...params: any): void;
}

export interface ArrowFunctionReturnStringOrNumber {
  (a: any, b: any): string | number;
}

export interface CompareArrowFunction {
  (a: any, b: any): number;
}

export interface LoginInputProps {
  name: string;
  datacy: string;
  placeholder: string;
  stateValue: string;
  setStateValue: Function;
  handleSvgClick?: VoidArrowFunction;
  type: string;
  icon: ReactNode;
  maxLength?: number;
}

export interface DefaultButtonProps {
  icons?: ReactNode;
  className: string;
  type: "button";
  onClick: Function;
  message: string;
  buttonType?:
    | "button-search"
    | "button-clear"
    | "button-add"
    | "button-reject"
    | "button-confirm"
    | "button-dashboard"
    | "button-report"
    | "button-clear-dashboard";
}

export interface InputFieldProps {
  label?: string | null;
  name: string;
  id: string;
  datacy: string;
  placeholder?: string;
  readOnly?: boolean;
  stateInput?: any;
  stateSelect?: any;
  gridStart?: string;
  gridEnd?: string;
  isLoading?: boolean;
  customClass?: string;
}

export interface SelectInputProps extends InputFieldProps {
  hiddenOption?: boolean;
  defaultOptionText?: string | null;
  selectIdentifier?: string;
  selectContent?: string;
  stateSelect?: UseFetchOptionsResult<any>;
  getContent?: ArrowFunction | null;
  readOnlyText?: string;
  emptyOptionsMessage?: string;
}

export interface HeaderDropdownProps {
  name: string;
  roles: string[];
  itens: any[];
  addTab: ArrowFunction;
}

export interface UseFetchOptionsResult<T> {
  selected: string | number;
  setSelected: Function;
  options: T[];
  isLoading: boolean;
  reload: Function;
  filter: Function;
}

export interface InputTextProps extends InputFieldProps {
  minLength?: number | null;
  maxLength?: number | null;
}

export interface InputSearchProps extends InputFieldProps {
  stateKey?: string;
  openModal: VoidArrowFunction;
  formatValue?: any;
}

export interface InputGenericProps extends InputFieldProps {
  defaultValue: string | number;
  minLength?: number | null;
  maxLength?: number | null;
  handleChange: Function;
}

export interface InputTextareaProps extends InputFieldProps {
  rows?: number;
}

export interface InputDateProps extends InputFieldProps {
  handleChange?: Function | null;
  readOnly?: boolean;
}

export interface InputNumberProps extends InputFieldProps {
  minNumber?: number | null;
  maxNumber?: number | null;
}

export interface InputDatalistProps extends InputFieldProps {
  dataListArray: any[];
  dataListValue: string;
  dataListContent: string;
  list: string;
  formatDataListValue?: Function | null;
  formatDataListContent?: Function | null;
}

export interface InputHoursProps extends InputFieldProps {
  stateValue: any;
  handleChange: Function;
}

export interface InputHoursMinutesProps {
  nameInputHoras: string;
  idInputHoras: string;
  datacyInputHoras: string;
  stateInputHoras: any;
  minNumberInputHoras?: number | null;
  maxNumberInputHoras?: number | null;
  placeholderInputHoras?: string;
  nameInputMinutos: string;
  idInputMinutos: string;
  datacyInputMinutos: string;
  stateInputMinutos: any;
  minNumberInputMinutos?: number | null;
  maxNumberInputMinutos?: number | null;
  placeholderInputMinutos?: string;
  containerGridStart?: string;
  containerGridEnd?: string;
  readOnly?: boolean;
}

export interface CarouselProps {
  year: number;
  month: number;
  day?: number;
  setDay?: Function;
  isAnimatingLeft: boolean;
  isAnimatingRight: boolean;
  isNew?: boolean;
  apontamentos: Object[];
}

/**
 * Modal de Pesquisa
 *
 */
export interface ModalSearchProps<T> {
  /** controller  do modal
   * @type {ModalController}
   * */
  controller: ModalController;
  /**
   * Nome que será exibido no título
   */
  title: string;
  /** Path a ser passado no Request Props da aplicação */
  url: string;

  /** Campos a serem exibidos na tabela de listagem
   * @type {Field[]}
   */
  fields: ModalSearchField[];
  filterKey: string;
  filterPlaceHolder: string;
  apiFilter: boolean;
  getData: (props: RequestProps) => Promise<any>;
  multipleSelection: any;
  allowEmptySearch?: boolean;
  selectedOptions: T[] | undefined;
  inputType?: string;
  shouldValidateElement?: boolean;
  validateElement?: (
    element: T
  ) => OptionValidation<true> | OptionValidation<false>;
  customFilterOptions?: FilterOption[];
}

/**
 * Valores passados para implementações dos modais search
 *
 * @example ModalSearchFuncionarios, ModalSearchPeriodo
 */
export interface ModalSearchImplProps<T> {
  controller: ModalController;
  multipleSelection?: boolean;
  selectedOptions?: T[];
  shouldValidateElement?: boolean;
}

/** Modais de entidade de criação ou atualização*/
export interface ModalEntity {
  bodyText?: string | null;
  controller: ModalController;
  viewOnly?: boolean;
  setReloadFilter?: any;
}

export interface ModalSearchField {
  key: string;
  label: string;
  getter?: ArrowFunction;
}

interface FilterOption {
  component: ReactElement;
  getValue: () => Object;
}

export interface OptionValidation<T> {
  valid: T;
  message: T extends false ? string : never;
}

export interface ModalConfirmProps {
  controller: ModalController;
  bodyText?: string | null;
  title?: string;
  buttonConfirmMessage?: string;
  getTitle?: (markedElement: any) => string;
  overrideSubmit?: ArrowFunction;
}

export interface TableColumn {
  name: string;
  getter: (option: Object) => string;
}

export interface FilterTab {
  componentDatacy: string;
  columns: TableColumn[];
  cleanOptions: boolean;
  activeTab: boolean;
  searchInput: any;
  modalPressed: any;
  modal: ReactNode;
  options: any[];
}

export interface FilterTabsMultipleOptions extends FilterTab {
  loadOptions: Function;
}

/** FILTER  recebe objetos de multiplos types*/

export interface SidebarProps {
  name?: string;
  fields?: SidebarField[];
  reloadFilter?: VoidArrowFunction;
  footerButtons?: React.ReactElement | null | undefined;
}

export type SidebarField =
  | SidebarInputSearchProps
  | SidebarSelectProps
  | SidebarTextInputProps
  | SidebarHoursMinutesInputProps
  | SidebarCustomCompont;

export interface SidebarInputSearchProps {
  type: "input-search";
  label: string;
  state: any;
  stateKey?: string;
  formatValue?: Function;
  openModal: VoidArrowFunction;
}

export interface SidebarSelectProps {
  type: "select";
  label: string;
  stateSelect: UseFetchOptionsResult<any>;
}

export interface SidebarTextInputProps {
  type: "input";
  label: string;
  state: any;
  inputType: "date" | "text" | "number" | "hours-minutes" | "money" | "switch";
}

export interface SidebarHoursMinutesInputProps {
  type: "hours-minutes";
  name: string;
  stateHour: any;
  stateMinute: any;
}

export interface SidebarCustomCompont {
  type: "custom-component";
  component: JSX.Element;
  dependencies?: any[];
}
