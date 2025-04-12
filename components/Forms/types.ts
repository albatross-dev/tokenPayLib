import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import { SimpleToken } from "../../types/token.types";
import { Chain } from "thirdweb";
import { CheckoutSession } from "../../types/payload-types";
import { FiatInfo } from "../../utilities/stableCoinsMaps";

// Base field interface that all field types will extend
export interface BaseFieldProps {
  name?: string;
  type: string;
  content?: React.ReactNode | ((methods: UseFormReturn) => React.ReactNode);
  fields?: FormField[];
  label?: string;
  required?: boolean | ((methods: UseFormReturn) => boolean);
  disabled?: boolean | ((methods: UseFormReturn) => boolean);
  explanation?: string;
  visible?: boolean | ((methods: UseFormReturn) => boolean);
  validation?: Record<string, any>;
  defaultValue?: any;
  width?: string | number;
  placeholder?: string;
  control?: Control;
  newLabel?: string;
  removeLabel?: string;
}

// Class override types for styling
export interface ClassOverrides {
  container?: string;
  label?: string;
  input?: string;
  error?: string;
  explanation?: string;
}

// Input types supported by FormInput
export type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "checkbox"
  | "select"
  | "country"
  | "textarea"
  | "file"
  | "date"
  | "tel"
  | "currency"
  | "token"
  | "chain";

// FormInput specific props
export interface FormInputProps extends BaseFieldProps {
  type: InputType;
  className?: string;
  classOverrides?: ClassOverrides;
  error?: string;
}

// Field renderer types
export type FormField =
  | FormInputProps
  | DocumentUploadFieldProps
  | CountrySelectorProps
  | CurrencySelectorProps
  | DateInputProps
  | CustomDropdownProps
  | TokenSelectorProps
  | ChainSelectorProps
  | ArrayFieldProps;

export interface ArrayFieldProps {
  field: FormField;
  methods: UseFormReturn;
  parentName: string;
}

// Document uploader specific types
export interface PreloadedFile {
  id: string | number;
  url?: string;
  filename?: string;
}

export type FileType = File | PreloadedFile | null;

export interface DocumentUploadFieldProps extends BaseFieldProps {
  name: string;
  control: Control;
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload?: (files: File[]) => void;
}

// Country selector specific types
export interface Country {
  name: string;
  flag: string;
  iso: string;
  restrictions?: boolean;
}

export interface CountryDictionary {
  [key: string]: Country;
}

export interface CountrySelectorProps extends BaseFieldProps {
  countries?: CountryDictionary;
  selectedCountry?: Country | string;
  onSelect: (country: Country | string) => void;
  onlyIso?: boolean;
  validCountries?: string[];
}


export interface CurrencySelectorProps extends BaseFieldProps {
  currencies: FiatInfo[];
}

// Date input specific types
export interface DateInputProps extends BaseFieldProps {
  minDate?: Date;
  maxDate?: Date;
}

// Custom dropdown specific types
export interface CustomDropdownProps extends BaseFieldProps {
  options: { label: string; value: any }[];
  multiple?: boolean;
  onChange?: (value: any) => void;
}

// Token selector specific types
export interface TokenSelectorProps extends BaseFieldProps {
  tokens: Record<string, SimpleToken>;
  selectedToken: SimpleToken | null;
  onSelect: (token: SimpleToken) => void;
  selectText?: string;
  displayContent?: React.ReactNode;
}

export interface ChainDetails {
  chainId: number;
  name: string;
  chain: Chain;
  logo: string;
  main?: boolean;
}


// Chain selector specific types
export interface ChainSelectorProps extends BaseFieldProps {
  supportedChains?: number[];
  checkoutSession?: CheckoutSession | undefined;
  chain?: ChainDetails | undefined;
  chainList?: ChainDetails[] | undefined;
  returnOnly?: boolean | undefined;
  onChain?: (chain: ChainDetails) => void | undefined;
}

export interface FieldRendererProps {
  fields: FormField[];
  methods: UseFormReturn;
  alwaysEditable?: boolean;
  arrayItemIndex?: number;
  parentName?: string;
}
