import { useTodosState } from '../../hooks';
import { TodoForm, FilterInput, TodoList } from '../../components';

export const TodoMain = () => {
    const {
        todos,
        filter,
        setFilter,
        addTodo,
        updateCompletedTodo, // функция для обновления поля completed
        isLoading,
        isCreating,
        isUpdating,
        currentId, // id текущего элемента в обработке (удаление, изменение)
    } = useTodosState(); // хук для управления состоянием Todos

    return (
        <>
            <TodoForm addTodo={addTodo} isCreating={isCreating} />
            <h2>Список дел</h2>
            <FilterInput filter={filter} setFilter={setFilter} />
            <TodoList
                todos={todos}
                updateCompletedTodo={updateCompletedTodo}
                isLoading={isLoading}
                isUpdating={isUpdating}
                currentId={currentId}
            />
        </>
    );
};
