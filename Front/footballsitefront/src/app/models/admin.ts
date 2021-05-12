export class Admin {
  id: string;
  username: string;
  password: string;
  role = 2;
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
