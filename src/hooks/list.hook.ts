import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading  : boolean,
  submiiting : boolean
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] , loading : true , submiiting : false});

  const retrieveList = () => {
    fetch(`http://localhost:3001/`, { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState(oldState => ({...oldState , loading : false })))
      .finally(() => setState(oldState => ({...oldState , loading : false })))
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
    setState({...state , submiiting : true})
    fetch('http://localhost:3001/', options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return retrieveList();
        } else {
          console.debug('Failed', res.status);
        }
      })
    
  };
  const update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch(`http://localhost:3001/${item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrieveList();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };

  const remove = (id: string) => {
    fetch(`http://localhost:3001/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrieveList();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };

  return { ...state, add, remove, update };
};

export default useList;