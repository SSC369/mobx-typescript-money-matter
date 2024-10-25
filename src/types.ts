export enum SidebarOptionsEnum {
  DASHBOARD = "dashboard",
  TRANSACTION = "transactions",
}
//captials
export enum TabOptionsEnum {
  TRANSACTIONS = "transactions",
  CREDIT = "credit",
  DEBIT = "debit",
}

interface TransactionType {
  id: number;
  transaction_name: string;
  type: string;
  date: string;
  category: string;
  amount: number;
}

interface UserProfileDataType {
  id: number;
  name: string;
  email: string;
  country: null;
  date_of_birth: string;
  city: null;
  permanent_address: null;
  postal_code: null;
  present_address: null;
}

interface CreditDebitType {
  type: string;
  sum: number;
}

interface LocalStorageDataType {
  admin: boolean;
  userId: number;
}

type CreditAndDebitTotalType = CreditDebitType[];
interface UserContextDataType {
  userId: number;
  isAdmin: boolean;
  showMenu: boolean;
}

type VoidFunctionType = () => void;
type ReactElementFunctionType = () => React.ReactElement;
type ReactNodeFunctionType = () => React.ReactNode;

interface AddTransactionModalType {
  onClose: VoidFunctionType;
}

interface TransactionFormData {
  name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  id?: number;
}

interface ConfirmModalType {
  onClose: VoidFunctionType;
  isLoading: boolean;
  action: string;
  actionHandler: VoidFunctionType;
}

interface EditTransactionModalType {
  onClose: VoidFunctionType;
  data: TransactionType;
}

interface TransactionContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  isTransactionsLoading: boolean;
  isTotalDebitCreditTransactionsLoading: boolean;
  showEditTransactionModal: boolean;
  setShowEditTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTransactionId: number | null;
  setDeleteTransactionId: React.Dispatch<React.SetStateAction<number | null>>;
  transactionsError: unknown;
  totalDebitCreditTransactionsError: unknown;
  showAddTransactionModal: boolean;
  setShowAddTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TransactionItemPropsType {
  data: TransactionType;
  setShowEditTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTransactionId: React.Dispatch<React.SetStateAction<number | null>>;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTransactionId: React.Dispatch<React.SetStateAction<number | null>>;
}

interface TransactionContextProviderPropsType {
  children: React.ReactElement;
}

interface TransactionOptionPropsType {
  option: TabOptionsEnum;
}

interface SidebarOptionPropsType {
  option: SidebarOptionsEnum;
}

type VoidPromiseFunctionType = () => Promise<void>;

interface LoadingButtonPropsType {
  action: string;
  isLoading: boolean;
}

interface LoaderPropsType {
  width?: number | string;
  height?: number | string;
}

interface InputElementPropsType {
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
}

interface SelectInputPropsType {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  children: React.ReactElement[];
}

interface LoginFormDataType {
  email: string;
  password: string;
}

export type {
  TransactionType,
  CreditAndDebitTotalType,
  LocalStorageDataType,
  UserContextDataType,
  VoidFunctionType,
  AddTransactionModalType,
  TransactionFormData,
  ConfirmModalType,
  ReactElementFunctionType,
  ReactNodeFunctionType,
  EditTransactionModalType,
  TransactionContextType,
  TransactionContextProviderPropsType,
  TransactionItemPropsType,
  TransactionOptionPropsType,
  SidebarOptionPropsType,
  UserProfileDataType,
  VoidPromiseFunctionType,
  LoadingButtonPropsType,
  LoaderPropsType,
  InputElementPropsType,
  SelectInputPropsType,
  LoginFormDataType,
};
