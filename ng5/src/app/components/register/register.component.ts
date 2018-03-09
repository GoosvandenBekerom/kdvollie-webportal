import { Component, OnInit } from '@angular/core'
import { User } from '../../models/User'
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string
  email: string
  password: string

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() { }

  onRegisterSubmit() {
    const user = new User(this.name, this.email, this.password)

    // Required fields
    if (!this.validateService.validateUser(user)) {
      this.flashDanger('Please fill in all fields')
      return false
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashDanger('Please enter a valid email')
      return false
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashSuccess('Succesfully registered! You can now log in.')
        this.router.navigate(['/login'])
      } else {
        this.flashDanger('Something went wrong')
      }
    })
  }

  private flashDanger(message: string) {
    this.flash.show(message, {cssClass: 'alert-danger', timeout: 5000})
  }

  private flashSuccess(message: string) {
    this.flash.show(message, {cssClass: 'alert-success', timeout: 5000})
  }
}
