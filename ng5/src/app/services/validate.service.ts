import { Injectable } from '@angular/core'

import { User } from '../models/User'

@Injectable()
export class ValidateService {

  constructor() { }

  validateUser(user: User) : boolean {
    return user.isComplete()
  }

  validateEmail(email: string) : boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
  }
}
