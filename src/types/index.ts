export interface StateData {
  [stateCode: string]: string[];
}

export interface State {
  name: string;
  code: string;
  districts: string[];
}

export interface IndiaStateDistrictOptions {
  stateSelectId?: string;
  districtSelectId?: string;
  defaultState?: string;
  defaultDistrict?: string;
  onChange?: (state: string, district: string) => void;
  onStateChange?: (state: string, stateCode: string) => void;
  onDistrictChange?: (district: string, stateCode: string) => void;
  placeholder?: {
    state?: string;
    district?: string;
  };
  validation?: {
    required?: boolean;
    customValidation?: (state: string, district: string) => boolean;
  };
  displayStateCode?: boolean;
}

export interface StateDistrictSelection {
  state: string;
  stateCode: string;
  district: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export type FilterFunction = (state: State) => boolean;

//<----- Geolocation Types ----->
export interface GeolocationResult {
  state: string;
  stateCode: string;
  district?: string;
  latitude: number;
  longitude: number;
}

export interface GeolocationOptions {
  /** Enable high accuracy mode (uses more battery) */
  enableHighAccuracy?: boolean;
  /** Maximum time to wait for location (ms) */
  timeout?: number;
  /** Maximum age of cached position (ms) */
  maximumAge?: number;
}

export interface GeolocationError {
  code: "PERMISSION_DENIED" | "POSITION_UNAVAILABLE" | "TIMEOUT" | "NOT_SUPPORTED" | "REVERSE_GEOCODE_FAILED" | "STATE_NOT_FOUND";
  message: string;
}

// Map of state codes to their full names
export const STATE_NAMES: { [key: string]: string } = {
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chhattisgarh",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OD: "Odisha",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UK: "Uttarakhand",
  WB: "West Bengal",
  AN: "Andaman and Nicobar Islands",
  CH: "Chandigarh",
  DH: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi",
  JK: "Jammu and Kashmir",
  LA: "Ladakh",
  LD: "Lakshadweep",
  PY: "Puducherry"
}; 