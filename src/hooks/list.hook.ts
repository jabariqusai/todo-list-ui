import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import TodoApi from './service/todo.service';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  submited:boolean;
}
const api = new TodoApi();
const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false ,submited:false});

  useEffect(() => {
    retrievelist();
  }, []);

  const retrievelist = () => {
    setState(oldState => ({ ...oldState, loading: true }));
    api.getItems()
      .then(items => setState(oldState => ({ ...oldState, items })))
      .catch(err => { 
        alert('sothing wrong') ;
        console.error(err);
        
      })
      .finally(() => setState(oldState => ({ ...oldState, loading: false })));
  };
  
  const add = (item: Todo.IItem) => {

    setState({...state,submited:true});
    api.add(item)
      .then(success=> {
        if (success) {
          console.debug('Successfully added item');
          return retrievelist();
        } else {
          console.debug('Failed');
        }
      })
      .finally(()=>setState(oldState=>({...oldState,submited:false})))
  };

  //const remove = (id: string) => setState(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));

  const remove = (id: string) => { 
    setState({...state,loading:true})   
   api.remove(id)
      .then(success => {
        if (success) {
          console.debug('Successfully updated item');
          return retrievelist();
        } else {
          console.debug('Failed');
          throw new Error('Failed');
        }
      })
      .catch(() => {
        setState(oldState => ({ ...oldState, loading: false }));
      });
  };



  const update = (item: Todo.IItem) => {
   api.update(item)
      .then(success=> {
        if (success) {
          console.debug('Successfully updated item');
          return retrievelist();
        } else {
          console.debug('Failed', );
          throw new Error('Failed');
        }
      }) .catch(() => setState({ ...state, submited: true }));
  };

  return { ...state, add, remove, update };
};

export default useList;