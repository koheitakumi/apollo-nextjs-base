import { DataSource, DataSourceConfig } from "apollo-datasource";

interface User {
  email: string;
  password: string;
}

// Just in memory
const userList = new Array<User>();

class UserDb extends DataSource {
  protected context: any;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }

  async findUser(email: string | undefined) {
    if (!email) return null;
    return userList.find((i) => i.email === email);
  }

  async addUser(email: string, hashedPassword: string) {
    const user: User = { email, password: hashedPassword };
    userList.push(user);
    return user;
  }
}

export default UserDb;
