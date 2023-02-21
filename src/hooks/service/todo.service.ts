import { Todo } from "../../types/todo";

class TodoApi {
    private API: string = `http://localhost:3005`;

    getItems = () => {
        return fetch(`${this.API}/list`, { method: 'GET' })
            .then(res => res.json() as Promise<Todo.IItem[]>)
    }

    add = (item: Todo.IItem) => {

        const options: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        }
         return fetch(`${this.API}/list`, options)
            .then(res => res.status === 201);
    }

    update = (item: Todo.IItem) => {
        const options: RequestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };

       return fetch(`${this.API}/list/${item.id}`, options)
            .then(res => res.status === 200)
    }

    remove = (id: string) => {
      return  fetch(`${this.API}/list/${id}`, { method: 'DELETE' })
            .then(res => res.status === 204)
    }
}
export default TodoApi;