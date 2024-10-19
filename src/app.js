import { Routes, Route, Navigate } from 'react-router-dom';
import {
    PageNotFound,
    TaskLoadError,
    TaskNotExist,
    TodoMain,
    TodoTask,
} from './components';
import styles from './app.module.css';

export const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h1>TODOS</h1>
                <Routes>
                    <Route path="/" element={<TodoMain />} />
                    <Route path="/task/:id" element={<TodoTask />} />
                    <Route path="/task-load-error" element={<TaskLoadError />} />
                    <Route path="/task-not-exist" element={<TaskNotExist />} />
                    <Route
                        path="/404"
                        element={<PageNotFound url={window.location.href} />}
                    />
                    <Route path="*" element={<Navigate to="/404" replace={true} />} />
                </Routes>
            </div>
        </div>
    );
};
