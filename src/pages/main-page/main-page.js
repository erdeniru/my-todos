import { TodoAddForm, FilterInput, TodoList } from './components';

export const MainPage = () => {
    return (
        <>
            <TodoAddForm />
            <h2>Список дел</h2>
            <FilterInput />
            <TodoList />
        </>
    );
};
