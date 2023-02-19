import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';
import Spinner from '../common/spinner/spinner.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  return (
    <div className={classes.wrapper}>
      <Form onSubmit={list.add} />
      {list.waiting ?
        // <p>Waiting for items</p>
        <div className='spinner-container'>
          <Spinner></Spinner>
        </div>
        : (
          list.items.length != 0 ?
            <ul>
              {list.items.map(item => (
                <Item
                  key={item.id}
                  item={item}
                  remove={list.remove}
                  update={list.update}
                />
              ))}
            </ul> :
            <p>There's no items to show!</p>
        )
      }
    </div>
  );
};

export default List;