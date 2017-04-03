import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { AuthJWTService } from '../auth/auth-strats/auth-jwt.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
  	LoginComponent
  ],
  declarations: [
  	LoginComponent
  ]
})

export class LoginModule { }
