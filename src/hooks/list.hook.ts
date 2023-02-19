import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading: boolean;
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [], loading: false });

  const retrieveList = () => {
    setState(oldState => ({ ...oldState, loading: true }));

    fetch("http://localhost:3033", { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState({ items, loading: false }))
      .catch(() => { alert("Error fetch"); })
      .finally(() => setState(oldState => ({ ...oldState, loading: false })));
  };

  useEffect(() => {
    retrieveList();
  }, []);

  const add = (item: Todo.IItem) => {

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch("http://localhost:3033", options).
      then(res => {
        if (res.status === 201) {
          console.debug("Success Created");
          return retrieveList();
        }
        else console.debug("Filled successfully");
      }
      );
  };

  const remove = (id: string) => {



    fetch(`http://localhost:3033/${id}`, { method: "DELETE" }).
      then(res => {
        if (res.status === 200) {
          console.debug("Success Deleted");
          return retrieveList();
        }
        else console.debug("Filled successfully");
      }
      );



  };

  const update = (updatedItem: Todo.IItem) => {

    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    };

    fetch(`http://localhost:3033/${updatedItem.id}`, options).
      then(res => {
        if (res.status === 200) {
          console.debug("Success UPDATED");
          return retrieveList();
        }
        else console.debug("Filled successfully");
      }
      );
  };





  return { ...state, add, remove, update };
};

export default useList;