import React, { useState } from "react";
import { useUser } from "hooks/useUser";
import {
  useGetTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useTodoAddedSubscription,
} from "libs/graphql/generated/graphql";

const TodoList: React.FC = () => {
  const { user } = useUser();

  const todoQuery = useGetTodoQuery();
  const [addTodoMutation] = useAddTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const { loading, data, error } = useTodoAddedSubscription();
  const [todoValue, setTodoValue] = useState("");

  if (!user || todoQuery.loading || !todoQuery.data || !todoQuery.data.todos) {
    return <div>loading</div>;
  }

  if (error) {
    console.log("Subscription Error", error);
  }
  if (data) {
    console.log("receive data", data);
    //TODO Bad implementation...
    if (data.todoAdded.email !== user.email) {
      todoQuery.refetch();
    }
  }

  const handleDeleteTodo = (id: number) => async () => {
    await deleteTodoMutation({
      variables: {
        id,
      },
    });
    await todoQuery.refetch();
  };

  const handleAddTodo = async (e: React.MouseEvent) => {
    await addTodoMutation({
      variables: {
        todo: {
          content: todoValue,
          email: user.email,
        },
      },
    });
    todoQuery.refetch();
  };

  return (
    <div>
      <h2>Task List</h2>
      {todoQuery.data.todos.length === 0 && <p>🙄Current todo is empty!</p>}
      <ul>
        {todoQuery.data.todos.map(({ id, content }) => (
          <li key={id}>
            <button onClick={handleDeleteTodo(id)}>👍</button>
            {content}
          </li>
        ))}
      </ul>
      <input value={todoValue} onChange={(e) => setTodoValue(e.target.value)} />
      <button onClick={handleAddTodo}>Add New Task</button>
    </div>
  );
};

export default TodoList;
