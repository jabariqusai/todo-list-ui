import classes from './item.module.sass';

import { Todo } from '../../../types/todo';
import { Pencil, PhoneX, Trash } from 'phosphor-react';

interface IProps {
  item: Todo.IItem;
  remove: (id: string) => void;
  update: (item: Todo.IItem) => void;
}

const Item = (props: IProps) => {
  const status = props.item.status;

  const update = () => {
    const description = prompt('Enter updated description', props.item.description);

    if (description) {
      props.update({ ...props.item, description });
    }
  };

  return (
    <li className={classes.item}>
    
      <input
        type="checkbox"
        checked={status === Todo.Status.DONE}
        onChange={e => props.update({ ...props.item, status: e.target.checked ? Todo.Status.DONE : Todo.Status.PENDING })}
        />
      <span data-status={status}>{props.item.description}</span>
      <div className={classes.actions}>
        <button
          onClick={update}
          disabled={status === Todo.Status.DONE}
        >
          <Pencil weight="bold" />
        </button>
        <button
          className={classes.red}
          onClick={() => props.remove(props.item.id)}
          disabled={status === Todo.Status.DONE}
        >
          <Trash weight="bold" />
        </button>
      </div>
    </li>
  );
};

export default Item;