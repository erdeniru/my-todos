import { useNavigate, useParams } from 'react-router-dom';
import { useTodoState } from '../../hooks';
import { BackButton } from '../BackButton/back-button';
import { useState } from 'react';
import styles from './todo-task.module.css';

export const TodoTask = () => {
    const params = useParams();
    const id = params.id;

    /** FIXME:
     * 1. Реализовать редактирование задание через форму со сбросом значений
     * 2. Найти способ объеденить use-todos-state и use-todo-state
     *      useTodosState - хук для управления состоянием списка задач
     *      useTodoState - хук для управления состоянием одной задачи
     */
    const { todo, setTodo, resetTodo, deleteTodo, updateTodo } = useTodoState(id);

    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();

    const onEdit = () => setIsEditMode(!isEditMode);
    const onCancel = () => {
        resetTodo();
        setIsEditMode(false);
    };
    const onDelete = () => {
        deleteTodo();
        navigate('/', { replace: true });
    };
    const onSave = () => {
        updateTodo();
        setIsEditMode(false);
    };

    const onChangeTitle = (event) =>
        setTodo((prev) => ({ ...prev, title: event.target.value }));

    const onChangeCompeleted = (event) =>
        setTodo((prev) => ({ ...prev, completed: event.target.checked }));

    return (
        <>
            <BackButton>⬅️ Назад</BackButton>
            <div className={styles.control}>
                <button disabled={isEditMode} onClick={onEdit}>
                    ✏️ Редактировать
                </button>
                <button onClick={onDelete}>❌ Удалить</button>
            </div>
            <div className={styles.data}>
                <div className={styles.title}>
                    <label className={styles.title_label}>Задание</label>
                    <br />
                    <textarea
                        className={styles.title_textarea}
                        value={todo.title}
                        onChange={onChangeTitle}
                        disabled={!isEditMode}
                    />
                </div>
                <div className={styles.completed}>
                    <input
                        type="checkbox"
                        checked={todo.completed || false}
                        onChange={onChangeCompeleted}
                        disabled={!isEditMode}
                    />{' '}
                    Выполнено
                </div>
                {isEditMode ? (
                    <div className={styles.action}>
                        <button onClick={onCancel}>🚫 Отмена</button>
                        <button onClick={onSave}>✅ Сохранить</button>
                    </div>
                ) : null}
            </div>
        </>
    );
};
