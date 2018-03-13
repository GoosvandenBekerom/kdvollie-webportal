import { Injectable } from '@angular/core'
import { Http, Headers} from '@angular/http'
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

import { User } from '../models/User'

@Injectable()
export class AuthService {
  authToken: any
  user: any

  private baseUrl = 'http://localhost:3000/api'

  constructor(private http: Http) { }

  registerUser(user: User) {
    return this.http.post(this.baseUrl+'/user/register', user, {headers: this.getHeaders()})
      .map(res => res.json())
  }

  authenticate(credentials: any) {
    return this.http.post(this.baseUrl+'/user/authenticate', credentials, {headers: this.getHeaders()})
      .map(res => res.json())
  }

  getProfile() {
    let headers = this.getHeaders()
    this.loadToken()
    headers.append('Authorization', this.authToken)
    return this.http.get(this.baseUrl+'/user/profile', {headers: headers})
      .map(res => res.json())
  }

  private getHeaders() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return headers
  }

  private loadToken() {
    if (this.authToken != null) return
    this.authToken = localStorage.getItem('token')
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  loggedIn() {
    return tokenNotExpired()
  }

  logout() {
    this.authToken = null
    this.user = null
    localStorage.clear()
  }
}
