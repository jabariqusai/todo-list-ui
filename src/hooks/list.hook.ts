import { useEffect, useState } from 'react';
import todoService from '../services/services.todo';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}
const api = new todoService();

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false });


  useEffect(() => {
    setState(state => ({ ...state, loading: true }));
    api.GetItems()
      .then((items) => setState(state => ({ ...state, items, loading: false })))
      .catch(err => {
        setState(state => ({ ...state, loading: false }));
        console.log(err);
      });

  }, []);

  const add = (item: Todo.IItem) => {
    setState({ ...state, loading: true });

    api.add(item)
      .then(async success => {
        let items: Todo.IItem[] = state.items;

        if (success) {
          console.debug('Successfully added item');
          items = await api.GetItems();
        } else {
          console.debug('Failed');
        }

        setState(state => ({ ...state, items, loading: false }));
      })
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });
  };
  const remove = (id: string) => {

    let items: Todo.IItem[] = state.items;
    setState(state => ({ ...state, loading: true }));
    api.remove(id).then(async success => {
      console.log(success)
      if (success) {
        console.debug("Success Deleted");
        items = await api.GetItems();
      }
      else console.debug("Filled successfully");
    }
    );
    setState(state => ({ ...state, items, loading: false }));



  };

  const update = (updatedItem: Todo.IItem) => {
    setState(state => ({ ...state, loading: true }));
    api.update(updatedItem).then(async success => {
      let items: Todo.IItem[] = state.items;

      if (success) {
        console.debug("Success UPDATED");
        items = await api.GetItems();
      }
      else console.debug("Filled successfully");

      setState(state => ({ ...state, items, loading: false }));
    }
    );
  };





  return { ...state, add, remove, update };
};

export default useList;