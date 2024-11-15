import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TodoEditForm } from './components';
import { BackButton } from '../../components';
import { deleteTodo, readTodo, updateTodo } from '../../store/actions/task-action';
import { selectTaskState } from '../../store/selectors';
import styles from './task-page.module.css';

export const TaskPage = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const dispatch = useDispatch();
    const { todo } = useSelector(selectTaskState);

    useEffect(() => {
        dispatch(readTodo(id));
    }, [id, dispatch]);

    const onEdit = () => setIsEditMode(!isEditMode);

    const onDelete = () => {
        dispatch(deleteTodo(id));
        navigate('/', { replace: true });
    };

    const onSubmit = (todo) => {
        dispatch(updateTodo(todo));
        setIsEditMode(false);
    };

    const onCancel = () => {
        dispatch(readTodo(id));
        setIsEditMode(false);
    };

    return (
        <>
            <BackButton />
            <div className={styles.control}>
                <button disabled={isEditMode} onClick={onEdit}>
                    ✏️ Редактировать
                </button>
                <button onClick={onDelete}>❌ Удалить</button>
            </div>
            <TodoEditForm
                todo={todo}
                readonly={!isEditMode}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    );
};
