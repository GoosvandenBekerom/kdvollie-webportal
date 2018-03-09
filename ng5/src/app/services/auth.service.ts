import { Injectable } from '@angular/core'
import { Http, Headers} from '@angular/http'
import 'rxjs/add/operator/map'

import { User } from '../models/User'

@Injectable()
export class AuthService {
  authToken: any
  user: User

  constructor(private http: Http) { }

  registerUser(user: User) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/user/register', user, {headers: headers})
      .map(res => res.json())
  }
}
