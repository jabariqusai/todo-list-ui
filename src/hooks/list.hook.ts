import { useEffect, useState } from 'react';
import ToDoService from '../services/todo.service';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

const api = new ToDoService();

const useList = () => {

  const [state, setState] = useState<IState>({ items: [], loading: false });

  const getItems = () => {
    api.fetchItems()
    .then(items => setState(state => ({ ...state, items, loading: false })))
    .catch(err => {
      console.error(err);

      alert("something wrong");
      setState(state => ({ ...state, loading: false }));
    });
  };
  useEffect(() => {

    setState((state) => ({ ...state, loading: true }));

    api.fetchItems()
      .then(items => setState(state => ({ ...state, items, loading: false })))
      .catch(err => {
        console.error(err);

        alert("something wrong");
        setState(state => ({ ...state, loading: false }));
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
          return getItems();
        } else {
          console.log("failed added items");

        }
      });
    setState({ ...state, loading: false });

  };


  const remove = (id: string) => {
    setState({ ...state, loading: true });
    api.remove(id)
      .then(success => {
        if (success) {
          console.log("deleted successfully");
          return getItems();
        } else {
          console.log('failed to delete items ');
        }
      });
    setState({ ...state, loading: false });

  };


  const update = (updatedItem: Todo.IItem) => {
    setState({ ...state, loading: true });
    api.update(updatedItem)
      .then(success => {
        if (success) {
          console.log("updated successfully");
          return getItems();
        } else {
          console.log('failed updated');
          return getItems();
        }
      });
    setState({ ...state, loading: false });

  };

  return { ...state, add, remove, update };
};

export default useList;