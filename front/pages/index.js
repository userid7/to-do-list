import Head from "next/head";
import { useEffect, useState } from "react";
import client from "../libs/apollo-client";
import { useTheme } from "next-themes";

import ToDoBase from "../components/todoList/todoList";

import { ADD_TODO, GET_TODO, DELETE_TODO, UPDATE_TODO } from "./graphql-method";

export default function Home() {
  const [items, setItems] = useState([]);
  const { theme, setTheme } = useTheme();

  async function getTodo() {
    const todo = await client.query({
      query: GET_TODO,
    });
    setItems(todo.data.allTodo);
  }
  async function addTodo(e, title, datetime) {
    e.preventDefault();
    var res = await client.mutate({
      mutation: ADD_TODO,
      variables: {
        title: title,
        isComplete: false,
        datetime: datetime,
      },
    });
    getTodo();
  }
  async function updateTodo(id, title, datetime, isComplete) {
    var res = await client.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id: id,
        title: title,
        isComplete: isComplete,
        datetime: datetime,
      },
    });
    getTodo();
  }
  async function deleteTodo(id) {
    var res = await client.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
    });
    getTodo();
  }

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="h-full">
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="Simple to do list" />
      </Head>

      <div className="flex-col h-full max-w-[650px] min-w-[380px] mx-auto py-8 px-4">
        <div className="w-full mi mt-20 text-left ">
          <div className="flex justify-between align-middle">
            <h1 className="text-5xl font-bold text-white font-sans">
              TO DO LIST
            </h1>
            {/* <button
              aria-label="Toggle Dark Mode"
              type="button"
              className="p-3 h-12 w-12 order-2 md:order-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            ></button> */}
          </div>
        </div>

        <div className="flex-row">
          <ToDoBase
            items={items}
            addCallback={addTodo}
            updateCallback={updateTodo}
            removeCallback={deleteTodo}
          />
        </div>
      </div>
      <div>{/* Calendar */}</div>
    </div>
  );
}
