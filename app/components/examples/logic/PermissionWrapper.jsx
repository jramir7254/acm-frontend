export default function PermissionWrapper({ role, required, children }) {
  if (!required.includes(role)) return null;
  return children;
}
