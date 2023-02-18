import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] });

  const callList = () => {
    fetch('http://localhost:3003/', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState({ items }));
  };

  useEffect(() => {
    callList();
  }, []);

  const add = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch(`http://localhost:3003/list`, options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return callList();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };


  const remove = (id: string) => {  
    console.log({id});
    fetch(`http://localhost:3003/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return callList();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };



  const update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch(`http://localhost:3003/list/${item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return callList();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };


  return { ...state, add, remove, update };
};

export default useList;