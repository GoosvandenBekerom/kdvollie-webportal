export class User {
  constructor(public name: string, public email: string, public password: string) {}
  
  isComplete() {
    return this.name != undefined && this.email != undefined && this.password != undefined
  }
}
