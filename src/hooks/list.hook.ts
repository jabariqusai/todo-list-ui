import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
    items: Todo.IItem[];
}

const useList = () => {
    const [state, setState] = useState<IState>({ items: [] });

    const retrieveList = () => fetch('http://localhost:3001/getTasks', { method: 'GET' })
        .then(response => response.json() as Promise<Todo.IItem[]>);
    // .then(res => setState( res ));

    // i have to add useEffect 
    useEffect(() => {
        retrieveList();
    }, []);
    const add = (item: Todo.IItem) => {
        setState(state => ({ ...state, items: state.items.concat(item) }));

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
            });
    };

    const remove = (id: string) => {
        setState(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));
    };

    const update = (updatedItem: Todo.IItem) => {
        const updated = [...state.items];

        for (let i = 0; i < updated.length; ++i) {
            if (updated[i].id === updatedItem.id) {
                updated[i] = updatedItem;
                break;
            }
        }

        setState({ items: updated });
    };

    return { ...state, add, remove, update };
};

export default useList;