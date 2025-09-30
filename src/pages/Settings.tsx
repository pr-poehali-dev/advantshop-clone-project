import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');

  const [accountData, setAccountData] = useState({
    email: user?.email || '',
    phone: '+79086668824',
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
  });

  const [domainData, setDomainData] = useState({
    domain: 'balooirk.ru',
    status: 'connected',
  });

  const handleSaveAccount = () => {
    toast.success('Настройки аккаунта сохранены!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    toast.success('Пароль успешно изменен!');
    setPasswordData({ newPassword: '', confirmPassword: '', oldPassword: '' });
  };

  const handleSaveDomain = () => {
    toast.success('Настройки домена сохранены!');
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
                onClick={() => navigate('/dashboard')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Общие настройки
                </h1>
                <p className="text-sm text-gray-500">
                  Управление аккаунтом и параметрами магазина
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={logout}>
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="account">Аккаунт</TabsTrigger>
            <TabsTrigger value="password">Пароль</TabsTrigger>
            <TabsTrigger value="domain">Домен</TabsTrigger>
            <TabsTrigger value="email">Почта</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="images">Изображения</TabsTrigger>
            <TabsTrigger value="advanced">Дополнительно</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Настройки аккаунта
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Логин</Label>
                  <Input value={user?.name || ''} disabled className="bg-gray-50" />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    value={accountData.email}
                    onChange={(e) =>
                      setAccountData({ ...accountData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Телефон моб.</Label>
                  <Input
                    value={accountData.phone}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-green-600 mt-1">номер подтвержден</p>
                </div>
                <Button onClick={handleSaveAccount} className="bg-pink-500 hover:bg-pink-600">
                  Сохранить
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Смена пароля
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Новый пароль</Label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Пароль еще раз</Label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Старый пароль</Label>
                  <Input
                    type="password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, oldPassword: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleChangePassword} className="bg-pink-500 hover:bg-pink-600">
                  Изменить пароль
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="domain">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Отдельный домен
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Отдельный домен</Label>
                  <Input
                    value={domainData.domain}
                    onChange={(e) =>
                      setDomainData({ ...domainData, domain: e.target.value })
                    }
                  />
                  {domainData.status === 'connected' && (
                    <p className="text-sm text-green-600 mt-1">подключен</p>
                  )}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">DNS-записи:</h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>ns1.alltrades.site</p>
                    <p>ns2.alltrades.site</p>
                  </div>
                </div>
                <Button onClick={handleSaveDomain} className="bg-pink-500 hover:bg-pink-600">
                  Сохранить
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Почта на домене
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Почтовая служба</Label>
                  <Select defaultValue="0">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Не подключена</SelectItem>
                      <SelectItem value="4">Яндекс 360</SelectItem>
                      <SelectItem value="1">Zoho Mail</SelectItem>
                      <SelectItem value="2">VK WorkMail</SelectItem>
                      <SelectItem value="3">Google Workspace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Сохранить
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Уведомления
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">О новых заказах</p>
                    <p className="text-sm text-gray-500">
                      Получать уведомления о новых заказах
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">О новых сообщениях</p>
                    <p className="text-sm text-gray-500">
                      Получать уведомления о новых сообщениях
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Сохранить
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Двухэтапная авторизация
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Основной метод</Label>
                  <Select defaultValue="0">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Отключен</SelectItem>
                      <SelectItem value="1">Код по SMS</SelectItem>
                      <SelectItem value="2">Код на емейл</SelectItem>
                      <SelectItem value="3">Код в Telegram</SelectItem>
                      <SelectItem value="4">Google Authenticator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    Авторизация в два этапа: после введения логина и пароля будет
                    запрошен одноразовый код авторизации
                  </p>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Сохранить
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Качество изображений и водяной знак
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Водяной знак</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Нет</SelectItem>
                      <SelectItem value="1">В левом верхнем углу</SelectItem>
                      <SelectItem value="2">В правом верхнем углу</SelectItem>
                      <SelectItem value="3">В левом нижнем углу</SelectItem>
                      <SelectItem value="4">В правом нижнем углу</SelectItem>
                      <SelectItem value="5">В центре</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Качество (1-100)</Label>
                  <Input type="number" defaultValue="90" min="1" max="100" />
                </div>
                <div>
                  <Label>Формат WebP</Label>
                  <Select defaultValue="0">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Включен</SelectItem>
                      <SelectItem value="1">Отключен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Сохранить
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Файл SITEMAP
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Создавать файл sitemap</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Не создавать файл</SelectItem>
                        <SelectItem value="1">Создавать файл</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      Адрес файла SITEMAP:
                    </p>
                    <p className="text-sm font-mono text-blue-600">
                      https://{domainData.domain}/sitemap.xml
                    </p>
                  </div>
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Обновить файл
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-red-200 bg-red-50">
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} />
                  Удаление сайта
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Внимание! Интернет-магазин удаляется из системы полностью без
                    возможности последующего восстановления данных!
                  </p>
                  <div>
                    <Label>Текущий пароль</Label>
                    <Input type="password" placeholder="Введите пароль" />
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (
                        confirm(
                          'Действительно удалить сайт? Восстановление сайта будет невозможно!'
                        )
                      ) {
                        toast.error('Функция удаления временно недоступна');
                      }
                    }}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить сайт
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}