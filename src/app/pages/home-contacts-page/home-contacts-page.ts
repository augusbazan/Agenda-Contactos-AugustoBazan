import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from "../../components/contact-list-item/contact-list-item";
import { Contact, NewContact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule, Spinner, CommonModule],
  templateUrl: './home-contacts-page.html',
  styleUrl: './home-contacts-page.scss'
})
export class HomeContactsPage implements OnInit {
  isLoading = true
  contacts: Contact[] = [];
  authservice = inject(AuthService)
  contactsService = inject(ContactsService)

async ngOnInit(): Promise<void> {
    try {
      this.contacts = await this.contactsService.getContacts();

    } catch (error) {

    } finally {
      this.isLoading = false;
    }
  }
}



