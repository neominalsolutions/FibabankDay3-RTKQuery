import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ITodo {
  title: string;
  completed: boolean;
}

// reducerPath sliceName aynısı

export const TodoApi = createApi({
  reducerPath: "TODOAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["TODOS"], // cacheKey
  endpoints: (builder) => ({
    // api end pointler (GET,POST,PUT,DELETE)
    getTodos: builder.query<ITodo[], void>({
      // HTTPGET, fetch
      query: () => {
        return `todos`;
      },
      providesTags: ["TODOS"], // auto re-fetch
    }),
    getTodoById: builder.query<ITodo, number>({
      query: (id: number) => {
        return `todos?id=${id}`;
      },
      transformResponse: (response: ITodo[]) => {
        // response ile ilgili filtreleme manuplation işlemi yapabiliriz.
        return response[0];
      },
      transformErrorResponse: (error: any) => {
        return error;
      },
    }),
    addTodo: builder.mutation({
      // HTTPOST,PUT,DELETE
      query: (todo: ITodo) => ({
        method: "POST",
        body: todo,
        url: "todos",
      }),
      invalidatesTags: ["TODOS"], // bu işlem ile tanımlanmış cache değerini bozarım (201 sonrasında yeniden apidan otomatik veri çekme işlemi yapacağız)
    }),
  }),
});

// son olarak endpoint kısmındaki functionsları hook olarak dışarıya export ediyoruz.

export const { useGetTodosQuery, useGetTodoByIdQuery, useAddTodoMutation } =
  TodoApi;
