import { Todo } from '../types/todo';

class ToDoService {

  private API: string = 'http://localhost:3001';

  fetchItems = () => {
    return fetch(`${this.API}/`, { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>);//never forget the [] due to it is an array
  };

  remove = (id: string) => {
    return fetch(`${this.API}/${id}`, { method: 'DELETE' })
      .then((res) => res.status === 200);
  };

  add = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    };

    return fetch(`${this.API}/`, options)
      .then((res) => res.status === 201);
  };
  update = (updatedItem: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    };

   return fetch(`${this.API}/${updatedItem.id}`, options)
      .then((res) => res.status === 201)

  };
}

export default ToDoService;