import React from "react";
import { useMe } from "@/features/auth/hooks/use-me";
import { useRole } from "@/features/auth/hooks/use-auth";
/** Canonical sets (narrowed via `as const` for literal unions) */
export const ROLES = [
    "owner",
    "advisor",
    "president",
    "vice_president",
    "secretary",
    "treasurer",
    "instructor",
    "student",
] as const;

const RESOURCES = ["events", "users", "points", "attendance", "rsvps", ""] as const;

const ACTIONS = ["create", "delete", "update", "list"] as const;

/** Literal unions */
export type Role = typeof ROLES[number];
type Resource = typeof RESOURCES[number];
type Action = typeof ACTIONS[number];

/** Permission strings:
 *  - "*:*" = global wildcard
 *  - `${Resource}:*` = any action on that resource
 *  - `${Resource}:${Action}` = specific action on that resource
 */
type GlobalPermission = "*:*";
type ResourceWildcardPermission = `${Resource}:*`;
type SpecificPermission = `${Resource}:${Action}`;
export type Permission =
    | GlobalPermission
    | ResourceWildcardPermission
    | SpecificPermission;

/** Props: pass required roles, the resource, and actions you need on it */
type PermissionGuardProps = {
    children: React.ReactNode;
    resource: Resource;
    requiredRoles?: Role[];         // optional; omit if only permission-based
    requiredActions?: Action[];     // optional; omit if only role-based
};

function normalizePermissions(raw: unknown): string[] {
    if (!raw) return [];

    // If backend sent an actual array already
    if (Array.isArray(raw)) return raw.map(String);

    // If backend sent a JSON string like "["*:*","events:create"]"
    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
            console.warn("Could not parse permissions string:", raw);
        }
    }

    return [];
}


/** Role check with owner override */
function isRoleAllowed(userRole: string, requiredRoles?: Role[]) {
    if (userRole === "owner") return true;
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.includes(userRole as Role);
}

/** Permission check with wildcards:
 *  - "*:*" grants everything
 *  - `${resource}:*` grants all actions on that resource
 *  - `${resource}:${action}` grants that specific action
 */
function isPermitted(
    userPerms: readonly string[] | readonly Permission[],
    resource: Resource,
    requiredActions?: Action[]
) {
    if (!requiredActions || requiredActions.length === 0) return true;

    if (!resource.length || resource === "") return true

    // Fast global wildcard
    if (userPerms.includes("*:*")) return true;

    // Resource wildcard
    const resAny = `${resource}:*` as ResourceWildcardPermission;
    if (userPerms.includes(resAny)) return true;

    // Specific action(s)
    return requiredActions.some((a) =>
        userPerms.includes(`${resource}:${a}` as SpecificPermission)
    );
}


export function PermissionGuard({
    children,
    resource,
    requiredRoles,
    requiredActions,
}: PermissionGuardProps) {
    const { data } = useRole();
    if (!data) return null;
    const { role, permissions: userPermissions } = data

    // Expecting something like:
    // user.role: string (backend may send dynamic roles)
    // user.permissions: Permission[] | string[] (e.g., ["*:*"] or ["events:create","users:list"])
    // const role = user.role;
    const permissions = normalizePermissions(userPermissions);

    if (!role) return null;
    if (!permissions) return null;

    const roleAllowed = isRoleAllowed(role, requiredRoles);
    const permissionAllowed = isPermitted(permissions, resource, requiredActions);

    if (!roleAllowed || !permissionAllowed) return null;

    return <>{children}</>;
}
