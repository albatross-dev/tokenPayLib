export interface BankAccount {
  uuid: string;
  name: string;
  holder_name: string;
  bank_name: string;
  iban: string;
  bank_code: string;
}

export interface CryptoAccount {
  uuid: string;
  name: string;
  address: string;
  network_type: string;
}

export interface PaymentInfo {
  bank_name: string;
  bank_country: string;
  bank_code: string;
  bank_account: string;
}

export interface NewBankAccount {
  name: string;
  iban: string;
  bank_code: string;
  bank_name: string;
  holder_name: string;
}

export interface StasisErrors {
  bankAccount: string | null;
  cryptoAccount: string | null;
  amount: string | null;
  send: string | null;
}

export type LoadingState = "normal" | "processing"; 