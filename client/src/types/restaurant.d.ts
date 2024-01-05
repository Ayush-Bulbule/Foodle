interface IRestaurant {
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




export { IRestaurant }