import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RolePermissions {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canPublish: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: keyof RolePermissions) => boolean;
  getRolePermissions: () => RolePermissions;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissionsMap: Record<UserRole, RolePermissions> = {
  admin: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canPublish: true,
  },
  editor: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canPublish: true,
  },
  viewer: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canPublish: false,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const demoUsers: User[] = [
      { id: '1', name: 'Администратор', email: 'admin@example.com', role: 'admin' },
      { id: '2', name: 'Редактор', email: 'editor@example.com', role: 'editor' },
      { id: '3', name: 'Наблюдатель', email: 'viewer@example.com', role: 'viewer' },
    ];

    const foundUser = demoUsers.find((u) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }

    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: 'viewer',
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const getRolePermissions = (): RolePermissions => {
    if (!user) {
      return rolePermissionsMap.viewer;
    }
    return rolePermissionsMap[user.role];
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    const permissions = getRolePermissions();
    return permissions[permission];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        hasPermission,
        getRolePermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}