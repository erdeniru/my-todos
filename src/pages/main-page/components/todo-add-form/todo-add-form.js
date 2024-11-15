import { useDispatch, useSelector } from 'react-redux';
import { useInputState } from '../../../../hooks';
import { FETCH_STATUS } from '../../../../constants/fetch-status';
import { createTodo } from '../../../../store/actions';
import stylesApp from '../../../../app.module.css';
import styles from './todo-add-form.module.css';
import { selectMainState } from '../../../../store/selectors';

export const TodoAddForm = () => {
    const { value, onChange, reset } = useInputState('');

    const dispatch = useDispatch();
    const { status } = useSelector(selectMainState);

    const handleSubmit = (event) => {
        if (event && event.preventDefault) event.preventDefault();

        const newTodo = {
            title: value,
            completed: false,
        };
        dispatch(createTodo(newTodo));

        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.form__input}
                id="title"
                type="text"
                placeholder="Новое задание"
                onChange={onChange}
                value={value}
            />
            <button
                className={stylesApp.btn + ' ' + styles.form__button}
                type="submit"
                disabled={value === '' || status !== FETCH_STATUS.NONE}
            >
                ➕
            </button>
        </form>
    );
};
