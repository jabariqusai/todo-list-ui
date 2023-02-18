import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';
import Spinner from './../common/spinner/spinner';

interface IProps { }

const List = (props: IProps) => {
    const list = useList();
    const loading = list.loading;
    console.log('loading', loading);

    return (
        <div className={classes.wrapper}>
            <Form onSubmit={list.add} />
            <ul className={loading ? classes.loading : ""}>
                {
                    loading
                        ? <Spinner />
                        : list.items.map(item => (
                            <Item
                                key={item.id}
                                item={item}
                                remove={list.remove}
                                update={list.update}
                            />
                        ))
                }
            </ul>
        </div>
    );
};

export default List;