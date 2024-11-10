import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, TaskPage, LoadErrorPage, NotFoundPage } from './pages';
import styles from './app.module.css';

export const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h1>TODOS</h1>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/task/:id" element={<TaskPage />} />
                    <Route path="/task-load-error" element={<LoadErrorPage />} />
                    <Route
                        path="/404"
                        element={<NotFoundPage url={window.location.href} />}
                    />
                    <Route path="*" element={<Navigate to="/404" replace={true} />} />
                </Routes>
            </div>
        </div>
    );
};
