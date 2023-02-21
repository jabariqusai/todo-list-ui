import { useEffect, useState } from 'react';
import Todoservices from '../Service/service';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading  : boolean,
  submiiting : boolean
}

const api = new Todoservices();

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] , loading : true , submiiting : false});

  const retrieveList = () => {
    api.getItem()
      .then(items => setState(oldState => ({...oldState ,items})))
      .finally(() => setState(oldState => ({...oldState , loading : false })))
  };

  useEffect(() => {
    retrieveList();
  }, []);

  const add = (item: Todo.IItem) => {
   
    setState({...state , loading : true})
     api.add(item)
      .then(success => {
        if (success) {
          console.debug('Successfully added item');
          return retrieveList();
        } else {
          console.debug('Failed');
        }
      })
      .finally(() => setState({...state , loading : false}) )
    
  };
  const update = (item: Todo.IItem) => {
     api.update(item)
      .then(success => {
        if (success) {
          console.debug('Successfully updated item');
          return retrieveList();
        } else {
          console.debug('Failed');
        }
      });
  };

  const remove = (id: string) => {
    api.remove(id)
      .then(success => {
        if (success) {
          console.debug('Successfully updated item');
          return retrieveList();
        } else {
          console.debug('Failed');
        }
      });
  };

  return { ...state, add, remove, update };
};

export default useList;