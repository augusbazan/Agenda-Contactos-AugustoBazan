export interface User{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}  

export type NewUser = Omit<User,"id">;
