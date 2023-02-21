import { Todo } from '../types/todo';

class TodoApi {
  private API: string = 'http://localhost:3001/todo';
  getList = () => {
    return fetch(this.API, { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>);
  };

  add = (item: Todo.IItem) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    return fetch(this.API, options)
      .then(res => res.status === 201);
  };

  remove = (id: string) => {
    return fetch(`${this.API}/${id}`, { method: 'DELETE' })
      .then(res => res.status === 204);
  };

  update = (updatedItem: Todo.IItem) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    };

    return fetch(`http://localhost:3001/todo/${updatedItem.id}`, options)
    .then(res => res.status === 204);
  };

  clearList = () => {
    return fetch(this.API, { method: 'DELETE' })
    .then(res => res.status === 204);
  }

}
export default TodoApi;