import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserServices } from '../../services/user-services';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule,FormsModule,Spinner],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  userService = inject(UserServices)
  errorRegister= false;
  isLoading = false
  router = inject(Router)

  async register(form:NgForm){
    this.errorRegister = false;
    if(!form.value.email ||
      !form.value.password ||
      !form.value.password2 ||
      !form.value.firstName ||
      !form.value.lastName ||
      form.value.password !== form.value.password2){
      this.errorRegister = true;
      return
    }
    
    this.isLoading = true;
    const res = await this.userService.register(form.value)
    if(res.ok){
      this.router.navigate(["/login"])
    }
    this.isLoading = false;
    this.errorRegister = true
  }
}
