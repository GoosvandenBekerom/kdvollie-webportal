import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string
  password: string

  constructor(
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() { }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    if (this.email == undefined || this.password == undefined) {
      this.flashDanger('Vul eerst uw emailadres en wachtwoord in')
      return false
    }

    this.authService.authenticate(user).subscribe(data => {
      console.log(data)
      if (data.success) {
        this.authService.storeUserData(data.token, data.user)
        this.flashSuccess('U bent succesvol ingelogd')
        this.router.navigate(['dashboard'])
      } else {
        this.flashDanger(data.msg)
      }
    });
  }

  private flashDanger(message: string) {
    this.flash.show(message, {cssClass: 'alert-danger', timeout: 5000})
  }

  private flashSuccess(message: string) {
    this.flash.show(message, {cssClass: 'alert-success', timeout: 5000})
  }
}
