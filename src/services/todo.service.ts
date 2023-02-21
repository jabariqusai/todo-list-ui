import { Todo } from '../types/todo';

class ToDoApi {
    private API: string;

    constructor(API: string) {
        this.API = API;
    }

    getItems = () => {
        return fetch(`${this.API}/getTasks`, { method: 'GET' })
            .then(response => response.json() as Promise<Todo.IItem[]>);
    };

    add = (item: Todo.IItem) => {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(`${this.API}/addTask`, options)
            .then(res => res.status === 201);
    };

    remove = (id: string) => {
        return fetch(`${this.API}/deleteTask/${id}`, { method: 'DELETE' })
            .then(res => res.status === 200);
    };

    update = (updatedItem: Todo.IItem) => {
        const options: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(updatedItem),
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(`${this.API}/editTask/${updatedItem.id}`, options)
            .then(res => res.status === 200);
    };
}
export default ToDoApi;