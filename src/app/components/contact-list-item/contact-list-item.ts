import { Component, input, inject } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import Swal from 'sweetalert2'
import { skip } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterLink],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
    contacto = input.required<Contact>()
    contactservice = inject(ContactsService)
    ContactListItem: any;

    openDeleteModal() {
      Swal.fire({
        title: 'Desea borrar el contacto?',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cancelar',
        denyButtonText: `Borrar contacto`,
      }).then((result) => {
      if (result.isDenied)
        this.contactservice.deleteContact(this.contacto().id); 
      });
      }


}
