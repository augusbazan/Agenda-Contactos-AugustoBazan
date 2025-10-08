import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from "../../components/contact-list-item/contact-list-item";
import { Contact, NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule],
  templateUrl: './home-contacts-page.html',
  styleUrl: './home-contacts-page.scss'
})
export class HomeContactsPage implements OnInit {
  ngOnInit(): void {
    this.contactservice.getContacts()
  }
   authservice = inject(AuthService)
   contactservice = inject(ContactsService)

   createContact(form: any){
    const nuevoContacto: Contact = {
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavorite: form.isFavorite,
      id: Math.random().toString()
    }

    this.contactservice.createContact(nuevoContacto)
   }
}
