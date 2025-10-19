export interface Contact{
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    image: string,
    number: string,
    company: string,
    isFavorite: boolean;
}

// interfaz igual q el contacto pero omite el ID
export type NewContact = Omit<Contact,"id">