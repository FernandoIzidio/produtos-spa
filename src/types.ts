export interface Address {
    id: number | null;
    street: string;
    neighborhood: string;
    number: string;
    city: string;
    state: string;
    zip: string;
}

export interface Hospital {
    id: number | null;
    name: string;
    cnpj: string;
    subdomain: string;
    address: Address;
    primaryPhone: string;
    secondaryPhone: string;
    email: string;
}

export interface User {
    id: number | null;
    firstName: string;
    lastName: string;
    gender: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    cpf: string;
    userRole: string;
    birthdate: string;
    addresses: Address[];
    hospitals: Hospital[];
    age: number;
}

export interface State{
    token: string;
    user: User | null
}
