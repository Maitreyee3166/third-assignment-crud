
export interface StudentPayload {
  name: string;
  email: string;
  phone: string;
  department: string;
  image?: File;
}

export interface Students {
  name: string;
  email: string;
  phone: string;
  department: string;
  image?: string;
  _id: string;
}

export interface StudentParams {
  page: number;
  limit: number;
  
}

export interface DynamicInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  error?: boolean;
  helperText?: string;
}
