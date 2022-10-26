import { gql } from "@apollo/client";

const GET_TODO = gql`
  query {
    allTodo {
      id
      title
      isComplete
      datetime
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo(
    $title: String!
    $isComplete: Boolean!
    $datetime: DateTime
  ) {
    addTodo(title: $title, isComplete: $isComplete, datetime: $datetime) {
      code
      msg
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      code
      msg
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: Int!
    $title: String!
    $isComplete: Boolean
    $datetime: DateTime
  ) {
    updateTodo(
      id: $id
      title: $title
      isComplete: $isComplete
      datetime: $datetime
    ) {
      code
      msg
    }
  }
`;

export { ADD_TODO, GET_TODO, DELETE_TODO, UPDATE_TODO };
