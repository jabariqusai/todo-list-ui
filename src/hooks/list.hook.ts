import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  submitting: boolean;
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false, submitting: false });

  const retrieveList = () => {
    setState(oldState => ({ ...oldState, loading: true }));
    fetch('http://localhost:3001/', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState(oldState => ({ ...oldState, items })))
      .catch(err => { alert("Something went wrong!"); })
      .finally(() => setState(oldState => ({ ...oldState, loading: false })));
  };

  useEffect(() => {
    retrieveList();
  }, []);

  const add = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    setState({ ...state, submitting: true });

    fetch(`http://localhost:3001/`, options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return retrieveList();
        } else {
          console.debug('Failed', res.status);
        }
      }).finally(() => setState(oldState => ({ ...oldState, submitting: false })));
  };

  const update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    setState({ ...state, submitting: true });

    fetch(`http://localhost:3001/${item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrieveList();
        } else {
          console.debug('Failed', res.status);
          throw new Error('Failed');
        }
      })
      .catch(() => setState({ ...state, submitting: true }));
  };

  const remove = (id: string) => {
    setState({ ...state, loading: true });

    fetch(`http://localhost:3001/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrieveList();
        } else {
          console.debug('Failed', res.status);
          throw new Error('Failed');

        }
      })
      .catch(() => {
        setState(oldState => ({ ...oldState, loading: false }));
      });
  };

  return { ...state, add, remove, update };
};

export default useList;