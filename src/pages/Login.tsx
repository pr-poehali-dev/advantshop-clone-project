import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(formData.login, formData.password);
    
    if (success) {
      toast.success('Вход выполнен успешно!');
      navigate('/dashboard');
    } else {
      toast.error('Неверные данные для входа');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 wave-border-soft shadow-2xl animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center animate-float shadow-lg">
              <Icon name="Sparkles" className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-2">
              TAPLINK
            </h1>
            <p className="text-gray-600">Вход в панель управления</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="login" className="text-gray-700 font-medium">
                Логин
              </Label>
              <Input
                id="login"
                type="text"
                placeholder="Введите логин"
                value={formData.login}
                onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                className="mt-2 rounded-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 rounded-full"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Запомнить меня</span>
              </label>
              <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                Забыли пароль?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Вход...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon name="LogIn" size={20} />
                  Войти
                </div>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">или</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full h-11"
              onClick={() => toast.info('Вход через Telegram скоро будет доступен')}
            >
              <Icon name="Send" size={18} className="mr-2 text-blue-500" />
              Войти через Telegram
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full h-11"
              onClick={() => toast.info('Вход через VK скоро будет доступен')}
            >
              <Icon name="MessageCircle" size={18} className="mr-2 text-blue-600" />
              Войти через VK
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Нет аккаунта?{' '}
              <a href="#" className="text-pink-600 hover:text-pink-700 font-semibold">
                Зарегистрироваться
              </a>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Тестовый доступ: любой логин и пароль
          </p>
          <div className="flex justify-center gap-4 text-gray-500">
            <a href="#" className="hover:text-pink-600 transition-colors">
              <Icon name="HelpCircle" size={20} />
            </a>
            <a href="#" className="hover:text-pink-600 transition-colors">
              <Icon name="Shield" size={20} />
            </a>
            <a href="#" className="hover:text-pink-600 transition-colors">
              <Icon name="Info" size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
            <Icon name="Lock" size={16} className="text-green-600" />
            <span className="text-sm text-gray-700">Защищено SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;