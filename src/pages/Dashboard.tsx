import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardItem {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, hasPermission } = useAuth();

  const dashboardItems: DashboardItem[] = [
    {
      title: 'Общие настройки',
      description: 'Общие настройки сайта: смена пароля, настройки панели управления и т.д.',
      icon: 'Settings',
      link: '/settings',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Страницы сайта',
      description: 'Управление страницами сайта. Добавление и редактирование страниц.',
      icon: 'FileText',
      link: '/pages',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Меню сайта',
      description: 'Управление меню сайта. Создание новых меню и управление пунктами.',
      icon: 'Menu',
      link: '/menu',
      color: 'from-pink-400 to-pink-600',
    },
    {
      title: 'Мой магазин',
      description: 'Разделы каталога, товары, заказы, импорт/экспорт, настройки магазина.',
      icon: 'ShoppingCart',
      link: '/shop',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Варианты оформления',
      description: 'Поменять оформление сайта на один из встроенных вариантов.',
      icon: 'Palette',
      link: '/design',
      color: 'from-orange-400 to-orange-600',
    },
    {
      title: 'Изображения',
      description: 'Загрузка изображений для использования на сайте.',
      icon: 'Image',
      link: '/images',
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Файлы',
      description: 'Загрузка файлов для скачивания - прайс-листы, документы и другие.',
      icon: 'Folder',
      link: '/files',
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      title: 'Пользователи',
      description: 'Управление пользователями и их правами доступа.',
      icon: 'Users',
      link: '/users',
      color: 'from-red-400 to-red-600',
    },
  ];

  const filteredItems = dashboardItems.filter((item) => {
    if (item.link === '/users') {
      return hasPermission('canManageUsers');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center animate-float shadow-lg">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Панель управления
                </h1>
                <p className="text-sm text-gray-500">
                  Добро пожаловать, {user?.name}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Выйти"
              >
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Icon name="Info" size={24} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Информация о магазине
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Icon name="ShoppingBag" size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Всего заказов: <b>0</b>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Комментариев: <b>0</b>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Lock" size={18} className="text-green-600" />
                  <span className="text-sm text-green-600">
                    <b>Защищено SSL</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-pink-200"
              onClick={() => navigate(item.link)}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <div className="flex items-start gap-4">
              <div className="bg-pink-500 rounded-full p-3">
                <Icon name="TrendingUp" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Быстрый старт
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Настройте основные параметры магазина
                </p>
                <Button
                  size="sm"
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  onClick={() => navigate('/settings')}
                >
                  Начать настройку
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 rounded-full p-3">
                <Icon name="HelpCircle" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Нужна помощь?
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Обратитесь в техподдержку
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 hover:bg-blue-50"
                  onClick={() => navigate('/support')}
                >
                  Написать в поддержку
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 rounded-full p-3">
                <Icon name="BookOpen" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Документация
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Изучите возможности платформы
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 hover:bg-green-50"
                  onClick={() => navigate('/help')}
                >
                  Открыть справку
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}