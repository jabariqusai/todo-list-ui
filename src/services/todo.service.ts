import { Todo } from '../types/todo';

class ToDoService {
  private API: string;
  constructor() {
    this.API = 'http://localhost:8081/todo';
  }

  getItems = () => {
    return fetch(`${this.API}/`, { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>);
  };

  add = (item: Todo.IItem) => {
    return fetch(this.API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...item }),
    }).then(res => {
      return res.status === 201;
    }).catch(err => console.error(err));
  };

  remove = (id: string) => {
    return fetch(`${this.API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return (res.status === 200);
    }).catch(err => console.error(err));
  };

  update = (updatedItem: Todo.IItem) => {
    return fetch(this.API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...updatedItem }),
    }).then(res => {
      return (res.status === 200);
    }).catch(err => console.error(err));
  };
}
export default ToDoService;