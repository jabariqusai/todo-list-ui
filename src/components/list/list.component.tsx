import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';
import { CircleNotch, Spinner } from 'phosphor-react';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  return (
    <div className={classes.wrapper}>
      <Form onSubmit={list.add} submitting={list.submitting} />
      <div className={classes.listWrapper}>
        {list.loading && <div className={classes.backdrop}><CircleNotch size={46} /></div>}
        <ul>
          {list.items.map(item => (
            <Item
              key={item.id}
              item={item}
              remove={list.remove}
              update={list.update}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;