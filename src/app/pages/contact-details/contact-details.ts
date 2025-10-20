import { Component, inject, input, OnInit} from '@angular/core';
import {Router, RouterModule } from "@angular/router";
import { ContactsService } from '../../services/contacts-service';
import { Contact } from '../../interfaces/contact';
import { Spinner } from "../../components/spinner/spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-details',
  imports: [RouterModule, Spinner],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss'
})
export class ContactDetails implements OnInit {
  contactId = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  loadingContact = false;
  router = inject(Router);
  

  async ngOnInit() {
    if(this.contactId()){
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.contactId());
      if(!this.contacto) this.loadingContact = true;
      const res = await this.contactService.getContactById(this.contactId());
      if(res) this.contacto = res;
      this.loadingContact = false;
    }
  }



  openDeleteModal() {
      Swal.fire({
          title: 'Desea borrar el contacto?',
          showDenyButton: true,
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: 'Cancelar',
          denyButtonText: `Borrar contacto`,
        }).then((result) => {
        if (result.isDenied && this.contacto)
          this.contactService.deleteContact(this.contacto.id); 
          this.router.navigate(['/'])
        });
        }
  


  async toggleFavorite(){
    if (this.contacto){
      const res = await this.contactService.setFavorite(this.contacto.id);
      if(res) this.contacto.isFavorite = !this.contacto.isFavorite
    }
  }

  }
