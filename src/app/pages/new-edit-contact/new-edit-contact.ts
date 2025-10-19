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
  contactId = input<number>();
  contactoOriginal:Contact|undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false


  
async ngOnInit() {
    if (this.contactId()) {
      this.contactoOriginal = await this.contactsService.getContactById(this.contactId()!);
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        isFavorite: this.contactoOriginal!.isFavorite || false
      })
    }
  }

  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
    const isFavoriteValue = form.value.isFavorite;
    const contactData: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: !!isFavoriteValue
    }
    let res;
    // const res = await this.contactsService.createContact(nuevoContacto);
    this.isLoading = true;
    if(this.contactId()){
      res = await this.contactsService.editContact({...contactData,id:this.contactId()!})
    } else {
      res = await this.contactsService.createContact(contactData);
    }
    this.isLoading = false;
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);
  }
}
