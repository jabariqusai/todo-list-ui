import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
interface IState {
  items: Todo.IItem[];
  loading : boolean;
}
const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: true });
  const callList = () => {
    fetch('http://localhost:3001/', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState({ items, loading: false }));
  };
  useEffect(() => {
    callList();
  }, []);
  const add = (item: Todo.IItem) => {
    setState(oldState => ({...oldState, loading: true}))
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    fetch(`http://localhost:3001`, options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return callList();
        } else {
          console.debug('Failed', res.status);
          setState(oldState =>({...oldState, loading: false}));
        }
      }).catch((err) => {
        alert(err);
        setState(oldState =>({...oldState, loading: false}));
      });
  };
  const remove = (id: string) => {
    setState(oldState =>({...oldState, loading: true}));
    console.log({id});
    fetch(`http://localhost:3001/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return callList();
        } else {
          console.debug('Failed', res.status);
          setState(oldState =>({...oldState, loading: false}));
        }
      }).catch((err) => {
        alert(err);
        setState(oldState =>({...oldState, loading: false}));
      });
  };
  const update = (item: Todo.IItem) => {
    setState(oldState => ({...oldState, loading: true}))
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    fetch(`http://localhost:3001/${item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return callList();
        } else {
          console.debug('Failed', res.status);
          setState(oldState =>({...oldState, loading: false}));
        }
      }).catch((err) => {
        alert(err);
        setState(oldState =>({...oldState, loading: false}));
      });
  };
  return { ...state, add, remove, update };
};
export default useList;