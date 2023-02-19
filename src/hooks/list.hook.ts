import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: true });

  const retrieveItems = () => {
    fetch('http://localhost:8081/todo', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => {
        setState({ items, loading: false });
      });
  };

  useEffect(() => {
    retrieveItems();
  }, []);

  const add = (item: Todo.IItem) => {
    fetch('http://localhost:8081/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...item }),
    }).then(res => {
      if (res.status === 201) {
        retrieveItems();
      }
    }).catch(err => console.error(err));
    setState({ ...state, loading: true });

  };

  const remove = (id: string) => {
    fetch(`http://localhost:8081/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.status === 200) {
        retrieveItems();
      }
    });
  };

  const update = (updatedItem: Todo.IItem) => {

    fetch('http://localhost:8081/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...updatedItem }),
    }).then(res => {
      if (res.status === 200) {
        retrieveItems();
      }
    });
  };

  return { ...state, add, remove, update };
};

export default useList;