import { useEffect, useState } from 'react';
import ToDoServices from '../components/service/todo.service';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}
const api = new ToDoServices();

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false });

  useEffect(() => {
    setState(state => ({ ...state, loading: true }));

    api.callList()
      .then((items) => setState(state => ({ ...state, items, loading: false })))
      .catch(error => {
        console.error(error);
        setState(state => ({ ...state, loading: false }));
      });
  }, []);

  const add = (item: Todo.IItem) => {
    setState({ ...state, loading: true });

    api.add(item)
      .then(async success => {
        let items: Todo.IItem[] = state.items;

        if (success) {
          console.debug('Successfully added item');

          items = await api.callList();
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
          items = await api.callList();
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

  const remove = (id: string) => {
    setState({ ...state, loading: true });

    api.remove(id)
      .then(async success => {
        let items = state.items;

        if (success) {
          console.debug('Successfully updated item');
          items = await api.callList();
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