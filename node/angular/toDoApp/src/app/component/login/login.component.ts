import { Component, OnInit } from '@angular/core';
import { User } from '../../User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  lastTimeFailed: boolean = false;
  
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.isLoggedIn = UserService.isLoggedIn();
  }

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();

    // Creamos los datos del usuario a enviar
    const userData:User = {
      username: this.username,
      password: this.password
    };

    this.userService.userLogin(userData).subscribe(result => {
      if(result) {
        console.log(result);

        // Reiniciamos el formulario
        this.username = '';
        this.password = '';

        // Guarda el usuario
        UserService.setCurrentUserID(result._id);
        UserService.setCurrentUserName(result.username);

        // Actualizamos los datos que hagan falta
        this.lastTimeFailed = false;
        this.isLoggedIn = UserService.isLoggedIn();

        // Redirigimos a tareas
        this.router.navigate(['']);
      }
      else {
        console.log("El usuario o la contraseña están mal");
        this.lastTimeFailed = true;
      }
    });
  }
}
