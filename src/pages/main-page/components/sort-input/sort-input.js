import { useDispatch } from 'react-redux';
import styles from './sort-input.module.css';
import { fetchTodos, sortTodosAsc, sortTodosDesc } from '../../../../store/actions';

export const SortInput = () => {
    const dispatch = useDispatch();

    const onSort = (order) => {
        if (order === 'asc') {
            dispatch(sortTodosAsc());
        } else if (order === 'desc') {
            dispatch(sortTodosDesc());
        } else {
            dispatch(fetchTodos());
        }
    };
    return (
        <div className={styles.sort}>
            ⇅
            <select
                className={styles.sort__select}
                onChange={(event) => {
                    onSort(event.target.value);
                }}
            >
                <option value="">По умолчанию</option>
                <option value="asc">Название по возрастанию</option>
                <option value="desc">Название по убыванию</option>
            </select>
        </div>
    );
};
