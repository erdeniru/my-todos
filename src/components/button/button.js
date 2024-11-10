export const Button = ({ children, ...attributes }) => {
    return (
        <button type="button" {...attributes}>
            {children}
        </button>
    );
};
