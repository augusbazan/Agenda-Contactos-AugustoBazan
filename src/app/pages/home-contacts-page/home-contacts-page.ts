import { Component, computed, inject, OnInit } from '@angular/core';
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
    this.contactsService.getContacts()
  }
   authservice = inject(AuthService)
   contactsService = inject(ContactsService)

}



