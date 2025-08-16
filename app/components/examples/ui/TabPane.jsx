export function TabPane({ active, children }) {
    return active ? <div>{children}</div> : null;
}
