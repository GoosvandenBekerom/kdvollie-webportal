export class User {
  constructor(public name: string, public email: string, public password?: string) {}

  static from(object: any) : User {
    if (object.name == undefined || object.email == undefined) return null

    return new User(object.name, object.email)
  }

  isCompleteForRegister() {
    return this.name != undefined && this.email != undefined && this.password != undefined
  }
}
