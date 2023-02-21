import { useEffect, useState } from 'react';
import ToDoService from '../services/todo.service';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
  loading: boolean;
}

const api = new ToDoService();

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: true });
  const [state, setState] = useState<IState>({ items: [], loading: true });

  const retrieveItems = () => {
    api.getItems()
      .then(items => setState({ items, loading: false }));

  };

  useEffect(() => {
    retrieveItems();
  }, []);

  const add = async (item: Todo.IItem) => {
    const success = await api.add(item);
    if (success) {
      retrieveItems();
    }
  };

  const remove = async (id: string) => {
    const success = await api.remove(id);
    if (success) {
      retrieveItems();
    }
  };

  const update = async (updatedItem: Todo.IItem) => {
    const success = await api.update(updatedItem);
    if (success) {
      retrieveItems();
    }
  };

  return { ...state, add, remove, update };
  return { ...state, add, remove, update };
};

export default useList;