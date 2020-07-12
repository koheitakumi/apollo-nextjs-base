import { DataSource, DataSourceConfig } from "apollo-datasource";

interface Todo {
  id: number;
  content: string;
}

// Just in memory
const todoList = new Array<Todo>();
let id = 0;

class TodoDb extends DataSource {
  protected context: any;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }

  async getAllTodo() {
    return todoList;
  }

  async addTodo(content) {
    todoList.push({
      id: id++,
      content,
    });
    return todoList[todoList.length - 1];
  }

  async deleteTodo(id) {
    return todoList.splice(
      todoList.findIndex((todo) => todo.id === id),
      1
    )[0];
  }
}

export default TodoDb;
