type AddressProps = {
  street: string
  number: number
  complement: string
  city: string
  state: string
  zipCode: string
}
export default class Address {
  _street: string;
  _number: number;
  _complement: string;
  _city: string;
  _state: string;
  _zipCode: string;

  constructor(props: AddressProps) {
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required.");
    }
    if (this._number === 0) {
      throw new Error("Number is required.");
    }
    if (this._zipCode.length === 0) {
      throw new Error("Zip is required.");
    }
    if (this._city.length === 0) {
      throw new Error("City is required.");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zipCode}, ${this._city}`;
  }
  get street(): string {
    return this._street;
  }

  set street(street: string) {
    this._street = street;
  }

  get number(): number {
    return this._number;
  }

  set number(number: number) {
    this._number = number;
  }

  get complement(): string {
    return this._complement;
  }

  set complement(complement: string) {
    this._complement = complement;
  }  

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get state(): string {
    return this._state;
  }

  set state(state: string) {
    this._state = state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  set zipCode(zip: string) {
    this._zipCode = zip;
  }


}
