import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import TodoApi from '../services/todo.service';
interface IState {
  items: Todo.IItem[];
  loading: boolean;
}
const api = new TodoApi();
const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: true });
  useEffect(() => {
    setState(state => ({ ...state, loading: true }));
    api.getItems().then(items => setState(state => ({ ...state, items, loading: false })))
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });
  }, []);
  const add = (item: Todo.IItem) => {
    setState(oldState => ({ ...oldState, loading: true }));
    api.add(item)
      .then(async success => {
        let items: Todo.IItem[] = state.items;

        if (success) {
          console.debug('Successfully added item');

          items = await api.getItems();
        } else {
          console.debug('Failed');
        }

        setState(state => ({ ...state, items, loading: false }));
      }).catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });

  };
  const remove = (id: string) => {
    setState(state => ({...state, loading: true }));

    api.remove(id)
      .then(async success => {
        let items = state.items;

        if (success) {
          console.debug('Successfully updated item');
          items = await api.getItems();
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
  const update = (item: Todo.IItem) => {
    setState({ ...state, loading: true });

    api.update(item)
      .then(async success => {
        let items = state.items;

        if (success) {
          console.debug('Successfully updated item');
          items = await api.getItems();
        } else {
          console.debug('Failed');
        }

        setState(state => ({ ...state, items, loading: false }));
      })
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });;
  };
  return { ...state, add, remove, update };
};
export default useList;