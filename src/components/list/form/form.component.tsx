import classes from './form.module.sass';

import { CaretRight } from 'phosphor-react';
import { Todo } from '../../../types/todo';

interface IProps {
  onSubmit: (item: Todo.IItem) => void;
  loading: boolean;
}

const Form = (props: IProps) => {
  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (props.loading) {
      return;
    }

    const form = event.target as HTMLFormElement;
    const description = form.description as HTMLInputElement;

    props.onSubmit({
      id: String(new Date().getTime()),
      description: description.value,
      status: Todo.Status.PENDING
    });
    form.reset();
  };
  return (
    <form className={classes.form} onSubmit={submit}>
      <input
        placeholder="Add a new item to the list"
        name="description"
        autoComplete="off"
        required
      />
      <button type="submit" disabled={props.loading}>
        <CaretRight weight="bold" />
      </button>
    </form>
  );
};
export default Form;