import { useTodosState } from '../../hooks';
import { TodoAddForm, FilterInput, TodoList } from './components';

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
        currentTodoId, // id текущего элемента в обработке (удаление, изменение)
    } = useTodosState(); // хук для управления состоянием Todos

    return (
        <>
            <TodoAddForm addTodo={addTodo} isCreating={isCreating} />
            <h2>Список дел</h2>
            <FilterInput filter={filter} setFilter={setFilter} />
            <TodoList
                todos={todos}
                updateCompletedTodo={updateCompletedTodo}
                isLoading={isLoading}
                isUpdating={isUpdating}
                currentTodoId={currentTodoId}
            />
        </>
    );
};
