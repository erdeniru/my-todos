import { useNavigate } from 'react-router-dom';
export const BackButton = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1, { replace: true })}>
                {children ? children : '⬅️ Назад'}
            </button>
        </div>
    );
};
