import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
    items: Todo.IItem[];
}

const useList = () => {
    const [state, setState] = useState<IState>({ items: [] });

    const retrieveList = () => {
        fetch('http://localhost:3001/getTasks', { method: 'GET' })
            .then(response => response.json()
                .then((res: Todo.IItem[]) => {
                    setState({ items: res });
                }).catch(err => {
                    console.log(err);
                })
            ).catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        retrieveList();
    }, []);

    const add = (item: Todo.IItem) => {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/addTask', options)
            .then(res => {
                if (res.status === 201)
                    console.log('Item added successfully');
                else
                    console.log('Error', res.status);
                retrieveList();
            });
    };

    const remove = (id: string) => {
        console.log(id);
        fetch(`http://localhost:3001/deleteTask/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.status === 200)
                    console.log('Item deleted successfully');
                else
                    console.log('Error', res.status);
                retrieveList();
            });

    };

    const update = (updatedItem: Todo.IItem) => {

        const options: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(updatedItem),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://localhost:3001/editTask/${updatedItem.id}`, options)
            .then(res => {
                if (res.status === 200)
                    console.log('Item edited successfully');
                else
                    console.log('Error', res.status);
                retrieveList();
            });
    };
    return { ...state, add, remove, update };
};

export default useList;