import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { HomeContactsPage } from './pages/home-contacts-page/home-contacts-page';
import { ContactDetails } from './pages/contact-details/contact-details';
import { RegisterPage } from './pages/register-page/register-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';

export const routes: Routes = [
    {
        path:"login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },

    {
        path:"register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard],
    },

    {
        path:"",
        component: LoggedLayout,
        canActivateChild:[onlyLoggedUserGuard],
        children:[
            {
                path:"",
                component: HomeContactsPage
            },

            {
                path: "contacts/new",
                component: NewEditContact
            },

            {
                path:"contacts/:contactId",
                component: ContactDetails
            },

            {
                path: "contacts/:contactId/edit",
                component: NewEditContact
            }

        ]
    }

];
