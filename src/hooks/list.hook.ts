import { useEffect, useState } from 'react';
import { RequestMethod, sendRequest } from '../services/general.utils';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] });
  const [waiting, setWaiting] = useState<boolean>(true);

  const fetchItems = async () => {
    setWaiting(true);
    (new Promise((resolve, reject) => {
      setTimeout(async () => {
        setState({ items: await sendRequest(`todo`) });
        resolve(null);
      }, 300);
    })).then(
      (res) => {
        setWaiting(false);
      }
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const add = async (item: Todo.IItem) => {
    // setState(state => ({ ...state, items: state.items.concat(item) }));
    await sendRequest(`todo`, { id: item.id, description: item.description, status: item.status }, RequestMethod.POST);
    await fetchItems();
  };

  const remove = async (id: string) => {
    // setState(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));
    await sendRequest(`todo/${id}`, {}, RequestMethod.DELETE);
    await fetchItems();
  };

  const update = async (updatedItem: Todo.IItem) => {
    await sendRequest(`todo/${updatedItem.id}`, updatedItem, RequestMethod.PUT);
    await fetchItems();
  };

  return { ...state, add, remove, update, waiting };
};

export default useList;;