import { useNavigate, useParams } from 'react-router-dom';
import { useTodoState } from '../../hooks';
import { BackButton } from '../BackButton/back-button';
import { useState } from 'react';
import styles from './todo-task.module.css';
import { TodoEditForm } from '../TodoEditForm/todo-edit-form';

export const TodoTask = () => {
    const params = useParams();
    const id = params.id;

    /** FIXME:
     * 1. Найти способ объеденить use-todos-state и use-todo-state
     *      useTodosState - хук для управления состоянием списка задач
     *      useTodoState - хук для управления состоянием одной задачи
     */
    const { todo, setTodo, resetTodo, deleteTodo, updateTodo } = useTodoState(id);

    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();

    const onEdit = () => setIsEditMode(!isEditMode);

    const onDelete = () => {
        deleteTodo();
        navigate('/', { replace: true });
    };

    const onSave = () => {
        updateTodo();
        setIsEditMode(false);
    };

    const onCancel = () => {
        resetTodo();
        setIsEditMode(false);
    };

    return (
        <>
            <BackButton>⬅️ Назад</BackButton>
            <div className={styles.control}>
                <button disabled={isEditMode} onClick={onEdit}>
                    ✏️ Редактировать
                </button>
                <button onClick={onDelete}>❌ Удалить</button>
            </div>
            <TodoEditForm
                todo={todo}
                setTodo={setTodo}
                readonly={!isEditMode}
                onSubmit={onSave}
                onCancel={onCancel}
            />
        </>
    );
};
