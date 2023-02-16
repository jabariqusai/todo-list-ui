import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] });

  const getList = () => {
    fetch('http://localhost:8081/todo', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState({ items }));
  };

  useEffect(() => {
    getList();
  }, []);

  const add = (item: Todo.IItem) => {
    fetch('http://localhost:8081/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...item }),
    }).then(res => {
      if (res.status == 201) {
        getList();
      }
    });
  };

  const remove = (id: string) => {
    fetch(`http://localhost:8081/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.status == 200) {
        getList();
      }
    });
  };

  const update = (updatedItem: Todo.IItem) => {
    const updated = [...state.items];

    for (let i = 0; i < updated.length; ++i) {
      if (updated[i].id === updatedItem.id) {
        updated[i] = updatedItem;
        break;
      }
    }

    setState({ items: updated });

    fetch('http://localhost:8081/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...updatedItem }),
    }).then(res => {
      if (res.status == 200) {
        getList();
      }
    });
  };

  return { ...state, add, remove, update };
};

export default useList;