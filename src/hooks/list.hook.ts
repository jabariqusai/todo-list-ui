import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  submitting:boolean
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [],loading:false,submitting:false });
  const callList = () => {
    setState(oldState => ({...oldState , loading:true}))
    fetch('http://localhost:3003/', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState(oldState=>({...oldState, items} )))
      .catch(err =>{alert("Wrong")})
      .finally(()=> setState(oldState => ({...oldState , loading:false})))
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

    setState(oldState => ({...oldState , submitting:true}));

    fetch(`http://localhost:3003/list`, options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return callList();
        } else {
          console.debug('Failed', res.status);
          setState(oldState => ({...oldState , submitting:false}));
        }      
      }).finally(() => setState(oldState => ({ ...oldState, submitting: false })));
  };


  const remove = (id: string) => {  
    setState({...state,loading:true});
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
    setState({...state,loading:true});
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

  const clearList = () => {
    const confirmed = window.confirm('Are you sure you want to delete ALL ITEMS?');
    if (!confirmed) return;
    fetch(`http://localhost:3003/list`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.log(`successfully deleted`);
          callList();
        }
        else
          console.error(`Something went wrong\n${res.status}`);
      });
  }


  return { ...state, add, remove, update,clearList };
};

export default useList;