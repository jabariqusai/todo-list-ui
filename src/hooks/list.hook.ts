import { useState, useEffect } from 'react';
import TodoServise from '../servises/todo.servise';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  submitting: boolean;
  updating: boolean;
}

const useList = () => {

  const [state, setState] = useState<IState>({ items: [], loading: true, submitting: false, updating: false });
  const api = new TodoServise() ;

  useEffect(() => {
    setState(oldState => ({ ...oldState, loading: true }));
    api.fetchData().then (items => {
      setState(oldState => ({...oldState , items , loading: false}))
    })
    .catch(error => {
      console.log(error.status);
      setState (oldState => ({...oldState , loading : false}))
    });
  }, []);


  const add = (item: Todo.IItem) => {
    setState(oldState => ({ ...oldState, submitting: true }));
    let items = state.items ;
    api.add(item)
      .then(async success => {
        if ( success) {
          items = await api.fetchData() ;
        } else {
          console.log('faild to add the sent item');
        }
        setState (oldState => ({...oldState  ,  items, submitting : false}))
      })
      .catch(error => {
        console.log(error.status);
        setState (oldState => ({...oldState , submitting : false}))
      });
  };

  const remove = (id: string) => {
    setState(oldState => ({ ...oldState, loading: true }));
    let items = state.items ;
    api.remove(id)
      .then(async success => {
        if (success) {
          console.log('item deleted');
          items = await api.fetchData();
        }
        else {
          console.log('deletign faild');
        }
        setState ( oldState => ({...oldState , items  , loading : false}))
      })
      .catch(error => {
        console.log(error.status);
        setState(oldState => ({ ...oldState, loading: false }));
      });
  };

  const update = (updatedItem: Todo.IItem) => {
    setState(oldState => ({ ...oldState, updating: true }));
    let items = state.items ;
    api.update(updatedItem)
      .then(async success => {
        if (success) {
          items = await api.fetchData() ;
        }
        else {
          console.log('faild to update this item');
        }
        setState (oldState => ({...oldState , items , updating : false}))
      })
      .catch(error => {
        console.log(error.status);
        setState (oldState => ({...oldState , updating: false}))
      })
  };

  return { ...state, add, remove, update };
};

export default useList;