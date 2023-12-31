import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private dataService: DataService) {}

  navegar() {
    const nombre = (document.getElementById("nombre") as HTMLInputElement)?.value || '';
    const password = (document.getElementById("password") as HTMLInputElement)?.value || '';
  
    // Validaciones adicionales
    if (nombre === 'admin' && password === 'admin123') {
      this.mostrarMensajeExito('¡Inicio de sesión exitoso como administrador!');
      this.router.navigateByUrl('/admin');
      return;
    }
  
    if (nombre.length < 2 || password.length < 8 || !/\d/.test(password)) {
      this.mostrarMensajeError('Credenciales incorrectas, vuelve a intentarlo');
      return;
    }
  
    // Intenta autenticar al usuario utilizando el DataService
    if (this.dataService.autenticarUsuario(nombre, password)) {
      this.mostrarMensajeExito('¡Inicio de sesión exitoso!');
      this.router.navigateByUrl('/dashboard');
    } else {
      this.mostrarMensajeError('Credenciales incorrectas, vuelve a intentarlo');
      this.navegarRegister();
    }
  }
  navegarRegister() {
    this.router.navigateByUrl('/register');
  }

  mostrarMensajeExito(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mostrarMensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      showConfirmButton: true
    });
  }
}
