import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';
import Spinner from '../spinner/spinner.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  return (
    <div className={classes.wrapper}>

      <Form onSubmit={list.add} />
      <ul>
        {
          list.loading
            ? <div className={classes.spinner}>
              <Spinner />
            </div>
            : list.items.map(item => (
              <Item
                key={item.id}
                item={item}
                remove={list.remove}
                update={list.update}
              />
            ))
          }
          {list.items.length === 0 && <span style={{ color: 'white' }}>list empty</span>}
      </ul>

    </div>
  );
};

export default List;