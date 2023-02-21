import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import TodoApi from '../components/services/todo.services';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

const api = new TodoApi();

const useList = () => {

  const [state, setState] = useState<IState>({ items: [], loading: false });

 
  //get part
  const retrieveItems = () => {

    setState(oldState => ({ ...oldState, loading: true }));

    api.getItems()
      .then(items => { setState(oldState => ({ ...oldState, items: items })); })
      .catch(err => {
        alert("something went wrong !");
        console.error(err);
      })
      .finally(() => setState(oldState => ({ ...oldState, loading: false })));
  };

  useEffect(() => {
    retrieveItems();
  }, []);


  //add part
  const add = (item: Todo.IItem) => {

    setState({ ...state, loading: true });

    api.add(item)
      .then(async success => {
        if (success) {
          console.debug('item added Successfully!');
          retrieveItems();
        } else {
          console.debug('Failed');
        }
      }).finally(() => setState(oldState => ({ ...oldState , })));
  };

  //delete part
  const remove = (id: string) => {

    setState({ ...state, loading: true });

    api.remove(id)
      .then(async deleted => {
        if (deleted) {
          console.debug('item deleted Successfully!');
          return retrieveItems();

        } else {
          console.debug('Delete Failed');
          throw new Error('Delete Failed');
        }
      })
      .catch(() => {
        setState(oldState => ({ ...oldState, loading: false }));
      });
  };

  //update part
  const update = (updatedItem: Todo.IItem) => {

    setState({ ...state ,loading:true });

    api.update(updatedItem)
      .then(async updated => {
        if (updated) {
          console.debug('item updated Successfully!');
          return retrieveItems();
        } else {
          console.debug('update Failed!');
          throw new Error('update Failed!');
        }
      })
      .catch(() => setState({ ...state }));
  };


  return { ...state, add, remove, update };
};

export default useList;