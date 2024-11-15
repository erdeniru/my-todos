import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_STATUS } from '../../../../../constants/fetch-status';
import { updateTodoCompleted } from '../../../../../store/actions';
import styles from './todo-list-tem.module.css';

export const TodoListItem = ({ todo }) => {
    const dispatch = useDispatch();
    const { status, currentTodoId } = useSelector((state) => state.mainReducer);

    const { id, title, completed } = todo;

    const onChangeTodoCompleted = (todoId, completed) => {
        dispatch(updateTodoCompleted(todoId, completed));
    };

    return (
        <>
            <input
                type="checkbox"
                checked={completed}
                disabled={status !== FETCH_STATUS.NONE && currentTodoId === id}
                onChange={(event) => onChangeTodoCompleted(id, event.target.checked)}
            />
            <Link className={styles.title__link + ' ' + styles.title} to={`task/${id}`}>
                {title}
            </Link>
        </>
    );
};
