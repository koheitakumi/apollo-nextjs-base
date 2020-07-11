let id = 0;
const todoList = [];

function getAllTodo() {
  return todoList;
}

function addTodo(content) {
  todoList.push({
    id: id++,
    content,
  });
  return todoList[todoList.length - 1];
}

function deleteTodo(id) {
  return todoList.splice(
    todoList.findIndex((todo) => todo.id === id),
    1
  )[0];
}

export default {
  getAllTodo,
  addTodo,
  deleteTodo,
};
