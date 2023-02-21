import { Todo } from '../types/todo';

class TodoServise {
  private API: string = 'http://localhost:3002/todos';

  fetchData = () => {
    return fetch(`${this.API}`, { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>);
  };

  add = (item: Todo.IItem) => {
    const option = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    return fetch(`${this.API}`, option)
      .then(res => res.status === 200);
  };

  update = (item: Todo.IItem) => {
    const option = {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    return fetch(`${this.API}/${item.id}`, option)
    .then (res => res.status === 204)
  };

  remove = (id : string) => {
    return fetch(`${this.API}/${id}`, { method: 'DELETE' }) 
    .then (res => res.status === 204)
  }

}
export default TodoServise;