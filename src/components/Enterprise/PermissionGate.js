import React, { useContext, createContext } from 'react';
import './PermissionGate.scss';

// * Permission Context
const PermissionContext = createContext({
    user: null,
    permissions: [],
    roles: [],
    hasPermission: () => false,
    hasRole: () => false,
    hasAnyPermission: () => false,
    hasAnyRole: () => false
});

// * Permission Provider
export const PermissionProvider = ({
    children,
    user,
    permissions = [],
    roles = []
}) => {
    // * Check if user has specific permission
    const hasPermission = (permission) => {
        if (!user || !permissions) return false;
        return permissions.includes(permission);
    };

    // * Check if user has specific role
    const hasRole = (role) => {
        if (!user || !roles) return false;
        return roles.includes(role);
    };

    // * Check if user has any of the specified permissions
    const hasAnyPermission = (permissionList) => {
        if (!user || !permissions) return false;
        return permissionList.some(permission => permissions.includes(permission));
    };

    // * Check if user has any of the specified roles
    const hasAnyRole = (roleList) => {
        if (!user || !roles) return false;
        return roleList.some(role => roles.includes(role));
    };

    const value = {
        user,
        permissions,
        roles,
        hasPermission,
        hasRole,
        hasAnyPermission,
        hasAnyRole
    };

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
};

// * Hook to use permissions
export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionProvider');
    }
    return context;
};

// * Permission Gate Component
const PermissionGate = ({
    children,
    permission,
    permissions = [],
    role,
    roles = [],
    fallback = null,
    showFallback = true,
    className = '',
    requireAll = false
}) => {
    const {
        hasPermission,
        hasRole,
        hasAnyPermission,
        hasAnyRole
    } = usePermissions();

    // * Check permissions
    const hasRequiredPermission = () => {
        if (permission) {
            return hasPermission(permission);
        }

        if (permissions.length > 0) {
            return requireAll
                ? permissions.every(p => hasPermission(p))
                : hasAnyPermission(permissions);
        }

        return true;
    };

    // * Check roles
    const hasRequiredRole = () => {
        if (role) {
            return hasRole(role);
        }

        if (roles.length > 0) {
            return requireAll
                ? roles.every(r => hasRole(r))
                : hasAnyRole(roles);
        }

        return true;
    };

    // * Determine if access is granted
    const hasAccess = hasRequiredPermission() && hasRequiredRole();

    // * Render based on access
    if (hasAccess) {
        return <div className={`permission-gate ${className}`}>{children}</div>;
    }

    // * Show fallback if specified
    if (showFallback && fallback) {
        return <div className={`permission-gate permission-gate--denied ${className}`}>{fallback}</div>;
    }

    // * Don't render anything if no access and no fallback
    return null;
};

// * Specialized Permission Components
export const AdminOnly = ({ children, fallback, ...props }) => (
    <PermissionGate
        role="admin"
        fallback={fallback || <AdminDeniedMessage />}
        {...props}
    >
        {children}
    </PermissionGate>
);

export const ModeratorOnly = ({ children, fallback, ...props }) => (
    <PermissionGate
        roles={['admin', 'moderator']}
        fallback={fallback || <ModeratorDeniedMessage />}
        {...props}
    >
        {children}
    </PermissionGate>
);

export const UserOnly = ({ children, fallback, ...props }) => (
    <PermissionGate
        permission="user.access"
        fallback={fallback || <UserDeniedMessage />}
        {...props}
    >
        {children}
    </PermissionGate>
);

export const PremiumOnly = ({ children, fallback, ...props }) => (
    <PermissionGate
        permission="premium.access"
        fallback={fallback || <PremiumDeniedMessage />}
        {...props}
    >
        {children}
    </PermissionGate>
);

// * Denied Access Messages
const AdminDeniedMessage = () => (
    <div className="permission-denied">
        <div className="permission-denied__icon">🔒</div>
        <h4 className="permission-denied__title">Admin Access Required</h4>
        <p className="permission-denied__message">
            This feature is only available to administrators. Please contact your system administrator if you believe you should have access.
        </p>
    </div>
);

const ModeratorDeniedMessage = () => (
    <div className="permission-denied">
        <div className="permission-denied__icon">👥</div>
        <h4 className="permission-denied__title">Moderator Access Required</h4>
        <p className="permission-denied__message">
            This feature requires moderator or admin privileges. Please contact your team lead if you need access.
        </p>
    </div>
);

const UserDeniedMessage = () => (
    <div className="permission-denied">
        <div className="permission-denied__icon">👤</div>
        <h4 className="permission-denied__title">User Account Required</h4>
        <p className="permission-denied__message">
            Please sign in to access this feature. Create an account if you don't have one.
        </p>
    </div>
);

const PremiumDeniedMessage = () => (
    <div className="permission-denied">
        <div className="permission-denied__icon">⭐</div>
        <h4 className="permission-denied__title">Premium Feature</h4>
        <p className="permission-denied__message">
            This feature is available to premium users. Upgrade your account to unlock premium features.
        </p>
        <button className="btn btn--primary">
            Upgrade to Premium
        </button>
    </div>
);

// * Permission-based UI variations
export const PermissionBasedUI = ({
    children,
    variants = {},
    defaultVariant = 'default',
    className = ''
}) => {
    const { hasPermission, hasRole } = usePermissions();

    // * Determine which variant to show based on permissions
    const getVariant = () => {
        // * Check for role-based variants first
        if (hasRole('admin') && variants.admin) {
            return 'admin';
        }

        if (hasRole('moderator') && variants.moderator) {
            return 'moderator';
        }

        if (hasRole('premium') && variants.premium) {
            return 'premium';
        }

        // * Check for permission-based variants
        if (hasPermission('advanced.features') && variants.advanced) {
            return 'advanced';
        }

        if (hasPermission('basic.features') && variants.basic) {
            return 'basic';
        }

        // * Return default variant
        return defaultVariant;
    };

    const currentVariant = getVariant();
    const variantContent = variants[currentVariant] || children;

    return (
        <div className={`permission-based-ui permission-based-ui--${currentVariant} ${className}`}>
            {variantContent}
        </div>
    );
};

// * Permission-aware button
export const PermissionButton = ({
    children,
    permission,
    role,
    onClick,
    disabled,
    className = '',
    ...props
}) => {
    const { hasPermission, hasRole } = usePermissions();

    const hasAccess = () => {
        if (permission && !hasPermission(permission)) return false;
        if (role && !hasRole(role)) return false;
        return true;
    };

    if (!hasAccess()) {
        return null;
    }

    return (
        <button
            className={`permission-button ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

// * Permission-aware link
export const PermissionLink = ({
    children,
    permission,
    role,
    to,
    className = '',
    ...props
}) => {
    const { hasPermission, hasRole } = usePermissions();

    const hasAccess = () => {
        if (permission && !hasPermission(permission)) return false;
        if (role && !hasRole(role)) return false;
        return true;
    };

    if (!hasAccess()) {
        return null;
    }

    return (
        <a
            className={`permission-link ${className}`}
            href={to}
            {...props}
        >
            {children}
        </a>
    );
};

export default PermissionGate;
