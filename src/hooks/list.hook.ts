import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  submited:boolean;
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false ,submited:false});

  useEffect(() => {
    retrievelist();
  }, []);

  const retrievelist = () => {
    setState(oldState => ({ ...oldState, loading: true }));
    fetch('http://localhost:3005/list', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState(oldState => ({ ...oldState, items })))
      .catch(err => { alert('sothing wrong') })
      .finally(() => setState(oldState => ({ ...oldState, loading: false })));
  };
  
  const add = (item: Todo.IItem) => {

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }
    setState({...state,submited:true})
    fetch(`http://localhost:3005/list`, options)
      .then(res => {
        if (res.status === 201) {
          console.debug('Successfully added item');
          return retrievelist();
        } else {
          console.debug('Failed', res.status);
        }
      })
      .finally(()=>setState(oldState=>({...oldState,submited:false})))
  };

  //const remove = (id: string) => setState(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));

  const remove = (id: string) => { 
    setState({...state,loading:true})   
    fetch(`http://localhost:3005/list/${id}`, { method: 'DELETE' })
      .then(res => {
        console.log(res);
        
        if (res.status === 204) {
          console.debug('Successfully updated item');
          return retrievelist();
        } else {
          console.debug('Failed', res.status);
          throw new Error('Failed');
        }
      })
      .catch(() => {
        setState(oldState => ({ ...oldState, loading: false }));
      });
  };



  const update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch(`http://localhost:3005/list/${item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrievelist();
        } else {
          console.debug('Failed', res.status);
          throw new Error('Failed');
        }
      }) .catch(() => setState({ ...state, submited: true }));
  };

  return { ...state, add, remove, update };
};

export default useList;