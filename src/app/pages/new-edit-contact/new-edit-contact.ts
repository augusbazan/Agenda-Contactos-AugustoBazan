import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { Router } from '@angular/router';
import { Spinner } from "../../components/spinner/spinner";
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner, RouterModule],
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

confirmExit(): void {
    
    let route: (string | number)[];
 
    const currentContactId = this.contactId();

    if (currentContactId !== undefined) {
      route = ['/contacts', currentContactId];

    } else {

      route = ['/']; 
    }


    if (this.form()?.dirty !== true) {
      this.router.navigate(route);
      return; 
    }

    this.changesModal(route);
  }

changesModal(route:(string | number)[]) {
    Swal.fire({
        title: "Desea guardar los cambios antes de salir?",
        icon: "warning",
        iconColor: "red",
        position: 'center',
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: 'No guardar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
    
        if (result.isConfirmed) {
            this.handleFormSubmission(this.form()!);
            Swal.fire('¡Guardado!', 'Tus cambios han sido guardados.', 'success');

        } else if (result.isDenied) {
            this.router.navigate(route);
            Swal.fire('Sin cambios', 'No se guardaron los cambios.', 'info');

        } else if (result.isDismissed) {
        }
    });
}}
