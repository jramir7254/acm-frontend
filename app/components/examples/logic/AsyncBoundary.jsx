export default function AsyncBoundary({ isLoading, error, children }) {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return children;
}
