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
    rating: number;
    cuisine: string[];
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
}


