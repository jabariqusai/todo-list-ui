import { Todo } from '../../types/todo';

class TodoApi{
  private API: string;

  constructor(){
    this.API = 'http://localhost:3003/'
  }

getItems = ()=>{
  fetch(`${this.API}/`, { method: 'GET' })
      .then(res => res.json() as Promise <Todo.IItem[]>)
};

add = (item: Todo.IItem) => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  }

  return fetch('http://localhost:3003/', options)
  .then(res => res.status === 201);
  };

   update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    return fetch(`${this.API}/${item.id}`, options)
    .then(res => res.status === 200);
    };

    remove = (id: string) => {
    return fetch(`${this.API}/${id}`, {method: 'DELETE'})
    .then(res => res.status === 200);
   
    }
  }
export default TodoApi;