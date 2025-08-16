export default function QueryContainer({ queryHook, children }) {
  const { data, isLoading, error } = queryHook();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load</p>;
  return children(data);
}
