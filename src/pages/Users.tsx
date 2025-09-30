import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'editor' | 'viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-200',
  editor: 'bg-blue-100 text-blue-800 border-blue-200',
  viewer: 'bg-green-100 text-green-800 border-green-200',
};

const roleLabels = {
  admin: 'Администратор',
  editor: 'Редактор',
  viewer: 'Просмотр',
};

const roleDescriptions = {
  admin: 'Полный доступ ко всем функциям',
  editor: 'Создание и редактирование контента',
  viewer: 'Только просмотр контента',
};

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Анна Смирнова',
      email: 'anna@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2 часа назад',
    },
    {
      id: '2',
      name: 'Петр Иванов',
      email: 'petr@example.com',
      role: 'editor',
      status: 'active',
      lastLogin: '5 минут назад',
    },
    {
      id: '3',
      name: 'Мария Петрова',
      email: 'maria@example.com',
      role: 'viewer',
      status: 'active',
      lastLogin: '1 день назад',
    },
    {
      id: '4',
      name: 'Иван Сидоров',
      email: 'ivan@example.com',
      role: 'editor',
      status: 'inactive',
      lastLogin: '2 недели назад',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer' as UserRole,
  });

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      lastLogin: 'Только что',
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'viewer' });
    setIsAddDialogOpen(false);
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Управление пользователями
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Управляйте доступом и ролями пользователей
                </p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Добавить пользователя
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новый пользователь</DialogTitle>
                  <DialogDescription>
                    Добавьте нового пользователя и назначьте роль
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      placeholder="Введите имя"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Роль</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: UserRole) =>
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex flex-col items-start">
                            <span className="font-medium">Администратор</span>
                            <span className="text-xs text-gray-500">
                              {roleDescriptions.admin}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value="editor">
                          <div className="flex flex-col items-start">
                            <span className="font-medium">Редактор</span>
                            <span className="text-xs text-gray-500">
                              {roleDescriptions.editor}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value="viewer">
                          <div className="flex flex-col items-start">
                            <span className="font-medium">Просмотр</span>
                            <span className="text-xs text-gray-500">
                              {roleDescriptions.viewer}
                            </span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleAddUser}
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    disabled={!newUser.name || !newUser.email}
                  >
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <Icon name="Shield" size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Администраторы</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'admin').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Icon name="Edit" size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Редакторы</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'editor').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <Icon name="Eye" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Просмотр</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'viewer').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Последний вход</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value: UserRole) =>
                        handleRoleChange(user.id, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue>
                          <Badge
                            variant="outline"
                            className={roleColors[user.role]}
                          >
                            {roleLabels[user.role]}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          {roleLabels.admin}
                        </SelectItem>
                        <SelectItem value="editor">
                          {roleLabels.editor}
                        </SelectItem>
                        <SelectItem value="viewer">
                          {roleLabels.viewer}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }
                    >
                      {user.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(user.id)}
                        title={
                          user.status === 'active'
                            ? 'Деактивировать'
                            : 'Активировать'
                        }
                      >
                        <Icon
                          name={
                            user.status === 'active' ? 'UserX' : 'UserCheck'
                          }
                          size={18}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Удалить"
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Описание ролей
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 rounded-lg p-2">
                <Icon name="Shield" size={20} className="text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Администратор</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {roleDescriptions.admin}
                </p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li>• Управление пользователями</li>
                  <li>• Настройка системы</li>
                  <li>• Создание и удаление контента</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <Icon name="Edit" size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Редактор</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {roleDescriptions.editor}
                </p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li>• Создание контента</li>
                  <li>• Редактирование контента</li>
                  <li>• Публикация материалов</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-lg p-2">
                <Icon name="Eye" size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Просмотр</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {roleDescriptions.viewer}
                </p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li>• Просмотр контента</li>
                  <li>• Чтение документов</li>
                  <li>• Без права изменений</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}