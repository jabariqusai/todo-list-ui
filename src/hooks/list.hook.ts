import { useEffect, useState } from 'react';
import TodoApi from '../services/todo.service';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  submitting: boolean;
}

const useList = () => {
  const api = new TodoApi();
  const [state, setState] = useState<IState>({ items: [], loading: true, submitting: false });

  useEffect(() => {
    setState(oldState => ({ ...oldState, loading: true }));
    api.getList()
      .then(items => setState(oldState => ({ ...oldState, loading: false, items })))
      .catch(err => {
        console.error(err);
        setState(oldState => ({ ...oldState, loading: false }));
      });
  }, []);

  const add = (item: Todo.IItem) => {
    setState({ ...state, loading: true });
    let items = state.items;
    api.add(item)
      .then(async success => {
        if (success) {
          console.log(`successfully added '${item.description}'`);
          items = await api.getList();
        } else {
          console.error(`Something went wrong\n`);
        }
      })
      .finally(() => setState((oldState) => ({ ...oldState, loading: false, items })));

  };

  const update = (updatedItem: Todo.IItem) => {
    setState({ ...state, loading: true });
    let items = state.items;

    api.update(updatedItem)
      .then(async success => {
        if (success) {
          console.log(`successfully updated`);
          items = await api.getList();
        } else {
          console.error(`Something went wrong\n`);
        }
      })
      .finally(() => setState((oldState) => ({ ...oldState, loading: false, items })));
  };

  const remove = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    setState((oldState) => ({ ...oldState, loading: true, items }));
    let items = state.items;
    api.remove(id)
      .then(async success => {
        if (success) {
          items = await api.getList();
          console.log(`successfully deleted`);
        }
        else {
          setState({ ...state, loading: false });
          console.error(`Something went wrong\n`);
        }
      })
      .finally(() => setState((oldState) => ({ ...oldState, loading: false, items })));
  };

  const clearList = () => {
    const confirmed = window.confirm('Are you sure you want to delete ALL ITEMS?');
    if (!confirmed) return;
    setState((oldState) => ({ ...oldState, loading: true, items }));
    let items = state.items;

    api.clearList()
      .then(async success => {
        if (success) {
          console.log(`successfully deleted`);
          items = await api.getList();
        }
        else
          console.error(`Something went wrong\n`);
      })
      .finally(() => setState((oldState) => ({ ...oldState, loading: false, items })));;
  };

  return { ...state, add, remove, update, clearList };
};

export default useList;