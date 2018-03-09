import { Component, OnInit } from '@angular/core'
import { User } from '../../models/User'
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string
  email: string
  password: string

  constructor(private validateService: ValidateService, private flash: FlashMessagesService) { }

  ngOnInit() { }

  onRegisterSubmit() {
    const user = new User(this.name, this.email, this.password)

    if (!this.validateService.validateUser(user)) {
      this.flash.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flash.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    this.flash.show('ok', {cssClass: 'alert-success', timeout: 3000})
  }
}
