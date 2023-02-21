import { useEffect, useState } from 'react';
import ToDoService from '../services/todo.service';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

const api = new ToDoService();

const useList = () => {

  api.fetchItems();

  const [state, setState] = useState<IState>({ items: [], loading: false });

  useEffect(() => {

    setState((state) => ({ ...state, loading: true }));

    api.fetchItems()
      .then(items => setState(state => ({ ...state, items, loading: false })))
      .catch(err => {
        alert("something wrong");
        setState(oldState => ({ ...oldState, loading: false }));
      });

  }, []);

  // should integrate the post feature
  const add = (item: Todo.IItem) => {
    // options with RequestInit will show the request body which will be send in the fetch function 

    setState({ ...state, loading: true });
    
   api.add(item)
      .then(success => {
        if (success) {
          console.log("successfully added items ");
          return api.fetchItems();
        } else {
          console.log("failed added items");

        }
      });

  };


  const remove = (id: string) =>

    api.remove(id)
      .then(success => {
        if (success) {
          console.log("deleted successfully");
          return api.fetchItems();
        } else {
          console.log('failed to delete items ');
        }
      });


  const update = (updatedItem: Todo.IItem) => {

    api.update(updatedItem)
      .then(success => {
        if (success) {
          console.log("updated successfully");
          return api.fetchItems();
        } else {
          console.log('failed updated');
          return api.fetchItems();
        }
      });

  };

  return { ...state, add, remove, update };
};

export default useList;