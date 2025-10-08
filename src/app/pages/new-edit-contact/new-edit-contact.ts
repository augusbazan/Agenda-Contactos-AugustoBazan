import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { Router } from '@angular/router';
import { Spinner } from "../../components/spinner/spinner";

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContacto = input<number>();
  contactoOriginal:Contact|undefined = undefined;
  form = viewChild<ElementRef<Form>>('newContactForm');
isLoading: any;

  
  async ngOnInit() {
    
  }

  async createContact(form:NgForm){
    this.errorEnBack = false;
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite
    }

    const res = await this.contactsService.createContact(nuevoContacto);
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);
  }
}