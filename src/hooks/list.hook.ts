import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false });

  const getItems = () => {
    return fetch('http://localhost:3001/', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>);
  };

  useEffect(() => {
    setState(state => ({ ...state, loading: true }));

    getItems()
      .then((items) => setState(state => ({ ...state, items, loading: false })))
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });;
  }, []);

  const add = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    setState({ ...state, loading: true });

    fetch(`http://localhost:3001/`, options)
      .then(async res => {
        let items: Todo.IItem[] = state.items;

        if (res.status === 201) {
          console.debug('Successfully added item');

          items = await getItems();
        } else {
          console.debug('Failed', res.status);
        }

        setState(state => ({ ...state, items, loading: false }));
      })
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });
  };

  const update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    setState({ ...state, loading: true });

    fetch(`http://localhost:3001/${item.id}`, options)
      .then(async res => {
        let items = state.items;

        if (res.status === 200) {
          console.debug('Successfully updated item');
          items = await getItems();
        } else {
          console.debug('Failed', res.status);
        }

        setState(state => ({ ...state, items, loading: false }));
      })
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });;
  };

  const remove = (id: string) => {
    setState({ ...state, loading: true });

    fetch(`http://localhost:3001/${id}`, { method: 'DELETE' })
      .then(async res => {
        let items = state.items;

        if (res.status === 200) {
          console.debug('Successfully updated item');
          items = await getItems();
        } else {
          console.debug('Failed', res.status);
        }

        setState(state => ({ ...state, items, loading: false }));
      })
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });;
  };

  return { ...state, add, remove, update };
};

export default useList;