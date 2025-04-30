export interface Booking {
    id?: number;
    customer_name: string;
    address: string;
    date_time: string;
    service_id: number;
    user_id?: number;
  }
  
  export interface Service {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    username: string;
    password_hash: string;
  }