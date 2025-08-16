import React, { createContext, useContext } from 'react';

// Context to provide the current role
const SectionContext = createContext();

export default function Render({ role, children }) {
    return (
        <SectionContext.Provider value={role}>
            <section>{children}</section>
        </SectionContext.Provider>
    );
}

/*
@da

*/

/**
 * PermissionBlock is a role-based conditional rendering wrapper.
 *
 * @param {string|string[]} allowedRoles - Role(s) that are allowed to render this block
 * @param {boolean} [display=true] - Additional condition to control rendering
 * @param {React.ReactNode} children - Content to render
 * @param {React.ReactNode} fallback - Optional fallback to show if not rendered
 * @param {string} hiddenClass - Optional class to apply if hidden (instead of removing from DOM)
 */
export const PermissionBlock = ({ allowedRoles, display = true, children, fallback = null, hiddenClass = null }) => {
    const role = useContext(SectionContext);

    const isAllowed = Array.isArray(allowedRoles) ? allowedRoles.includes(role) : allowedRoles === role;

    const shouldRender = isAllowed && display;

    if (process.env.NODE_ENV === 'development') {
        if (!allowedRoles) {
            console.warn('<PermissionBlock>: missing `allowedRoles` prop');
        }
    }

    if (shouldRender) return <div className="size-full">{children}</div>;

    if (hiddenClass) return <div className={hiddenClass}>{children}</div>;

    return fallback;
};
