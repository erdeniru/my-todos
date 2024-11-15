import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce, useInputState } from '../../../../hooks';
import { changeFilter, fetchTodos } from '../../../../store/actions/main-actions';
import styles from './filter-input.module.css';

export const FilterInput = ({ filter, setFilter }) => {
    const { value, onChange } = useInputState('');
    const debounceFilter = useDebounce(value, 500);

    const dispatch = useDispatch();

    useEffect(() => {
        if (debounceFilter !== '') {
            dispatch(changeFilter(debounceFilter));
            dispatch(fetchTodos());
        }
    }, [debounceFilter, dispatch]);

    return (
        <div className={styles.filter}>
            🔍
            <input
                className={styles.filter__input}
                type="search"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
