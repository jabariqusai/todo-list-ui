import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
    items: Todo.IItem[];
    loading: boolean;
    submitting: boolean;
}

const useList = () => {
    const [state, setState] = useState<IState>({ items: [], loading: true, submitting: false });

    const retrieveList = () => {
        setState((oldState) => ({ ...oldState, loading: true }));
        fetch('http://localhost:3001/getTasks', { method: 'GET' })
            .then(response => response.json())
            .then((res: Todo.IItem[]) => {
                setState((oldState) => ({ ...oldState, items: res }));
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setState((oldState) => ({ ...oldState, loading: false, submitting: false })));
    };

    useEffect(() => {
        retrieveList();
    }, []);

    const add = (item: Todo.IItem) => {
        setState((oldState) => ({ ...oldState, submitting: true }));

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/addTask', options)
            .then(res => {
                if (res.status === 201) {
                    console.log('Item added successfully');
                    retrieveList();
                }
                else {
                    console.log('Error', res.status);
                    throw new Error("Field!");
                }
            })
            .catch((err) => {
                alert(err);
                setState((oldState) => ({ ...oldState, submitting: false }));
            });
    };

    const remove = (id: string) => {
        setState((oldState) => ({ ...oldState, loading: true }));
        fetch(`http://localhost:3001/deleteTask/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.status === 200) {
                    console.log('Item deleted successfully');
                    retrieveList();
                }
                else {
                    console.log('Error', res.status);
                    throw new Error("Field!");
                }
            })
            .catch((err) => {
                alert(err);
                setState((oldState) => ({ ...oldState, loading: false }));
            });
    };

    const update = (updatedItem: Todo.IItem) => {
        setState((oldState) => ({ ...oldState, submitting: true }));
        const options: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(updatedItem),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://localhost:3001/editTask/${updatedItem.id}`, options)
            .then(res => {
                if (res.status === 200) {
                    console.log('Item edited successfully');
                    retrieveList();
                }
                else {
                    console.log('Error', res.status);
                    throw new Error("Field!");
                }
            }).catch((err) => {
                alert(err);
                setState((oldState) => ({ ...oldState, submitting: false }));
            });
    };
    return { ...state, add, remove, update };
};

export default useList;