import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

interface IResponse {
  results: Todo.IItem[];
  total: number;
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false });

  const retrieveItems = () => {

    setState(oldState => ({ ...oldState, loading: true }));

    fetch('http://localhost:3001/', { method: 'GET' })
      .then(res => res.json() as Promise<IResponse>)
      .then(jsonRes => { setState(oldState => ({ ...oldState, items: jsonRes.results })); })
      .catch(err => { alert("something went wrong !"); })
      .finally(() => setState(oldState => ({ ...oldState, loading: false })));

  };

  useEffect(() => {
    retrieveItems();
  }, []);

  const add = (item: Todo.IItem) => {

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch(`http://localhost:3001/`, options)

      .then(res => {
        if (res.status === 201) {
          console.debug('item added Successfully!');
          retrieveItems();
        } else {
          console.debug('Failed', res.status);
        }
      });

  };
  const remove = (id: string) => {

    fetch(`http://localhost:3001/${id}`, { method: 'DELETE' })

      .then(res => {
        if (res.status === 204) {
          console.debug('item deleted Successfully!');
          return retrieveItems();

        } else {
          console.debug('delete Failed', res.status);
        }
      });
    // setState(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));

  };

  const update = (updatedItem: Todo.IItem) => {

    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    };

    fetch(`http://localhost:3001/${updatedItem.id}`, options)

      .then(res => {
        if (res.status === 205) {
          console.debug('item updated Successfully!');
          return retrieveItems();
        } else {
          console.debug('update Failed!', res.status);
        }
      });
  };

  return { ...state, add, remove, update };
};

export default useList;