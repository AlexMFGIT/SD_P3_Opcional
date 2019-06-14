import { Component, OnInit } from '@angular/core';
import { User } from '../../User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  pwdNotEqual: boolean = false;
  somethingWentWrongOnServer: boolean = false;

  username: string = '';
  password: string = '';
  passwordRepeat: string = '';
  email: string = '';

  constructor(private userService: UserService, private router: Router) { this.isLoggedIn = UserService.isLoggedIn(); }

  ngOnInit() {
  }

  register(event) {
    event.preventDefault();

    // Si la contraseña repetida está mal lo decimos
    if(this.password != this.passwordRepeat) {
      console.log("Las contraseñas deben ser iguales!");
      this.pwdNotEqual = true;
      return false;
    }
    this.pwdNotEqual = false;

    // Creamos los datos del usuario a enviar
    const userData:User = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.userService.userRegister(userData).subscribe(result => {
      if(result) {
        console.log(result);
        this.username = '';
        this.email = '';
        this.password = '';
        this.passwordRepeat = '';

        this.somethingWentWrongOnServer = false;
        this.router.navigate(['/login']);
      }
      else {
        console.log("Algo ha ocurrido al intentar registrarte");
        this.somethingWentWrongOnServer = true;
      }
    });
  }
}
