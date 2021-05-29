export class Admin {
  id: string;
  username: string;
  password: string;
  role = 1;
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
