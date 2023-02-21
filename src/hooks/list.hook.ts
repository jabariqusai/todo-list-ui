import { useEffect, useState } from 'react';
import ToDoApi from '../services/todo.service';
import { Todo } from '../types/todo';

const api = new ToDoApi('http://localhost:3001');
interface IState {
    items: Todo.IItem[];
    loading: boolean;
}

const useList = () => {
    const [state, setState] = useState<IState>({ items: [], loading: false });

    const retrieveList = () => {
        api.getItems()
            .then((newItems: Todo.IItem[]) => {
                setState((oldState) => ({ ...oldState, items: newItems, loading: false }));
            })
            .catch(error => {
                console.log(error);
                setState((oldState) => ({ ...oldState, loading: false }));
            });
    };

    useEffect(() => {
        setState((oldState) => ({ ...oldState, loading: true }));
        retrieveList();
    }, []);

    const add = (item: Todo.IItem) => {
        setState((oldState) => ({ ...oldState, loading: true }));

        api.add(item)
            .then(success => {
                if (success) {
                    console.log('Item added successfully');
                    return retrieveList();
                }
            })
            .catch(error => {
                console.log(error);
                setState((oldState) => ({ ...oldState, loading: false }));
            });
    };

    const remove = (id: string) => {
        setState((oldState) => ({ ...oldState, loading: true }));

        api.remove(id)
            .then(success => {
                if (success) {
                    console.log('Item deleted successfully');
                    retrieveList();
                }
                else {
                    console.log('Error');
                    throw new Error("Field!");
                }
            })
            .catch(error => {
                console.log(error);
                setState((oldState) => ({ ...oldState, loading: false }));
            });
    };

    const update = (updatedItem: Todo.IItem) => {
        setState((oldState) => ({ ...oldState, loading: true }));

        api.update(updatedItem)
            .then(success => {
                if (success) {
                    console.log('Item edited successfully');
                    return retrieveList();
                }
                else {
                    console.log('Error');
                    throw new Error("Field!");
                }
            })
            .catch(error => {
                console.log(error);
                setState((oldState) => ({ ...oldState, loading: false }));
            });
    };
    return { ...state, add, remove, update };
};

export default useList;