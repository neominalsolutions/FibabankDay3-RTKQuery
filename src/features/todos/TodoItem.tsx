import React from "react";
import { useGetTodoByIdQuery } from "../../api/todo.api";

type Props = {};

export default function TodoItem({}: Props) {
  const { data } = useGetTodoByIdQuery(1, { pollingInterval: 3000 });

  console.log("data", data);

  return <div>Item Component Pooling :{data?.title}</div>;
}
