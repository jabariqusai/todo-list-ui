import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] });

  const fetchList = () => {
    fetch('http://localhost:3001/todo', { method: 'GET', })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(list => setState({ items: list }));
  };

  useEffect(() => {
    fetchList();
  });

  const add = (item: Todo.IItem) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch('http://localhost:3001/todo', options)
      .then(res => {
        if (res.status === 201) {
          console.log(`successfully added '${item.description}'`);
          fetchList();
        } else {
          console.error(`Something went wrong\n${res.status}`);
        }
      });

  };

  const update = (updatedItem: Todo.IItem) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    };

    fetch(`http://localhost:3001/todo/${updatedItem.id}`, options)
      .then(res => {
        if (res.status === 204) {
          console.log(`successfully updated '${updatedItem.description}'`);
          fetchList();
        }
        else
          console.error(`Something went wrong\n${res.status}`);
      });
  };

  const remove = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;
    fetch(`http://localhost:3001/todo/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 204) {
          console.log(`successfully deleted`);
          fetchList();
        }
        else
          console.error(`Something went wrong\n${res.status}`);
      });
  };

  const clearList = () => {
    const confirmed = window.confirm('Are you sure you want to delete all items?');
    if (!confirmed) return;
    fetch(`http://localhost:3001/todo/`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 204) {
          console.log(`successfully deleted`);
          fetchList();
        }
        else
          console.error(`Something went wrong\n${res.status}`);
      });
  }

  return { ...state, add, remove, update, clearList };
};

export default useList;