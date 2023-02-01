export interface IUser {
  address: IAddress;
  company: ICompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface IAddress {
  city: string;
  geo: ICoordinates;
  street: string;
  suite: string;
  zipcode: string;
}

export interface ICoordinates {
  lat: string;
  lng: string;
}

export interface ICompany {
  bs: string;
  catchPhrase: string;
  name: string;
}
