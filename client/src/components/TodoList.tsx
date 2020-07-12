import React, { useState } from "react";
import {
  useGetTodoQuery,
  useAddTodoMutation,
} from "libs/graphql/generated/graphql";

const TodoList: React.FC = () => {
  const todoQuery = useGetTodoQuery();
  const [addTodoMutation] = useAddTodoMutation();
  const [todoValue, setTodoValue] = useState("");

  if (todoQuery.loading || !todoQuery.data || !todoQuery.data.todos) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h2>Task List</h2>
      {todoQuery.data.todos.length === 0 && <p>🙄Current todo is empty!</p>}
      <ul>
        {todoQuery.data.todos.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
      <input value={todoValue} onChange={(e) => setTodoValue(e.target.value)} />
      <button
        onClick={async () => {
          await addTodoMutation({
            variables: {
              content: todoValue,
            },
          });
          todoQuery.refetch();
        }}
      >
        Add New Task
      </button>
    </div>
  );
};

export default TodoList;
