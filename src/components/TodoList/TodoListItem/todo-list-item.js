import stylesApp from '../../../app.module.css';

export const TodoListItem = ({
    todo,
    updateCompletedTodo,
    deleteTodo,
    isUpdating,
    isDeleting,
    currentId,
}) => {
    const { id, title, completed } = todo;
    return (
        <>
            <input
                type="checkbox"
                checked={completed}
                disabled={isUpdating && currentId === id}
                onChange={(event) => updateCompletedTodo(id, event.target.checked)}
            />
            {title}
            <button
                className={stylesApp.btn}
                disabled={isDeleting && currentId === id}
                onClick={() => deleteTodo(id)}
            >
                ❌
            </button>
        </>
    );
};
