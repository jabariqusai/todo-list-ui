import { useEffect, useState } from 'react';
import Item from '../components/list/item/item.component';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}



const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading:true });

  const retrieveList = () => {
    setState(oldState =>({...oldState,loading:true}))
    fetch('http://localhost:3007/', { method: 'GET' })
      .then(res => res.json() as Promise <Todo.IItem[]>)
      .then(items => setState(oldState=>({ ...oldState, items})))
      .catch(err => {alert("sth went wrong")})
      .finally(()=> setState(oldState => ({...oldState, loading:false})))
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

    fetch(`http://localhost:3007/item`, options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return retrieveList();
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

    fetch(`http://localhost:3007/item/${item.id}`, options)
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
    fetch(`http://localhost:3007/item/${id}`, { method: 'DELETE' })
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