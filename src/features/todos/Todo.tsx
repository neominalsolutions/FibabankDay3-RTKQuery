import React, { useState } from "react";
import {
  ITodo,
  useAddTodoMutation,
  useGetTodosQuery,
} from "../../api/todo.api";

type Props = {};

function Todo({}: Props) {
  const { data, error, isLoading, isSuccess, isFetching } = useGetTodosQuery();

  if (error) {
    return <>Hata oluştu</>;
  }

  if (isLoading) {
    return <>Veri yükleniyor ... </>;
  }

  if (isSuccess) {
    return (
      <>
        <TodoCreateForm />
        <hr></hr>

        <ul>
          {data.map((item: ITodo) => {
            return <li key={item.title}>{item.title}</li>;
          })}
        </ul>
      </>
    );
  }

  return <div></div>;
}

export default Todo;

export function TodoCreateForm() {
  const [formState, setFormState] = useState<ITodo>({
    title: "",
    completed: false,
  });

  // mutation değerinde direk ilgili method ismlerini [] arasına geçeriz
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("form-state", formState);
    addTodo(formState); // POST olucak 201 dönmesini bekliyor.
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={formState.title}
          onChange={(event) => {
            setFormState({ ...formState, title: event.target.value });
          }}
        />
        <br></br>
        <input
          onChange={(event) => {
            setFormState({ ...formState, completed: event.target.checked });
          }}
          type="checkbox"
          defaultChecked={formState.completed}
        />
        <span>Completed ?</span>
        <br></br>
        <input type="submit" value="addTodo" />
      </form>
    </>
  );
}
