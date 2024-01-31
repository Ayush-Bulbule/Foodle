export interface IRestaurant {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    veg: boolean;
    description: string;
    opens: string;
    closes: string;
    address: IAddress;
    rating: number;
    cuisine: string[];
}


export interface IMenu {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    restaurant: string;
    description: string;
    veg: boolean;
    serving: number;
}


export interface IAddress {
    building: string,
    street: string,
    locality: string,
    city: string,
    state: string,
    zip: string
}
export interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
}


export interface ILocation {
    lat: number,
    lng: number
}



// Owner