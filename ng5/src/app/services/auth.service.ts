import { Injectable } from '@angular/core'
import { Http, Headers} from '@angular/http'
import 'rxjs/add/operator/map'

import { User } from '../models/User'

@Injectable()
export class AuthService {
  authToken: any
  user: any

  constructor(private http: Http) { }

  registerUser(user: User) {
    return this.http.post('http://localhost:3000/user/register', user, {headers: this.getHeaders()})
      .map(res => res.json())
  }

  authenticate(credentials: any) {
    return this.http.post('http://localhost:3000/user/authenticate', credentials, {headers: this.getHeaders()})
      .map(res => res.json())
  }

  private getHeaders() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return headers
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  logout() {
    this.authToken = null
    this.user = null
    localStorage.clear()
  }
}
