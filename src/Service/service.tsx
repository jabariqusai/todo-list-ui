import { Todo } from '../types/todo';

class Todoservices {
  private api : String ;

  constructor() {
    this.api = 'http://localhost:3001'
  }

  getItem = () => {
    return fetch(`${this.api}/`, { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
  }

  add =(item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    return  fetch(`${this.api}/`, options)
    .then(res => res.status === 201);
  }

  update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

   return fetch(`${this.api}/${item.id}`, options)
    .then(res => res.status === 200);
  }

  remove = (id: string) => {
   return fetch(`${this.api}/${id}`, { method: 'DELETE' })
   .then(res => res.status === 200)
  }

}

export default Todoservices;