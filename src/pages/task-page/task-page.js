import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoState } from '../../hooks';
import { TodoEditForm } from './components';
import { BackButton, Button } from '../../components';
import styles from './task-page.module.css';

export const TaskPage = () => {
    const params = useParams();
    const id = params.id;

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
            <BackButton />
            <div className={styles.control}>
                <Button disabled={isEditMode} onClick={onEdit}>
                    ✏️ Редактировать
                </Button>
                <Button onClick={onDelete}>❌ Удалить</Button>
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
