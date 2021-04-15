import { publicFetch } from "./fetch";

export async function login(user) {
  let data = await publicFetch
    .post("users/login", user)
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function signup(user) {
  console.log("Calling signup api", user);
  let data = await publicFetch
    .post("users/signup", user)
    .then((response) => response.data)
    .catch((err) => err)

  return data;
}

export async function getUserTodos(token) {
  let data = await publicFetch
    .get(`todos`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function updateUser( id, user, token ) {
  let data = await publicFetch
    .put(`users/${id}`, user, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function updateToDo( id, todo, token ) {
  let data = await publicFetch
    .put(`todos/${id}`, todo, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function deleteToDo( id, token ) {
  let data = await publicFetch
    .delete(`todos/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

// 
export async function addTodos(todo, token) {
  // console.log("Ad ODO api called", todo, token)
  let data = await publicFetch
    .post("todos", todo, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function updateTodoStatus(id, todo, token) {
  let data = await publicFetch
    .put(`todos/${id}`, todo, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function toggleFavorite(id, token) {
  console.log("Calling toggle favorite api", id, token)
  let data = await publicFetch
    .put(`todos/favorite/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}

export async function toggleComplete(id, token) {
  let data = await publicFetch
    .put(`todos/completed/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.data);

  return data;
}