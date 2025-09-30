import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

export default function ShopHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
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
                Мой магазин
              </h1>
              <p className="text-sm text-gray-500">
                Управление товарами и категориями
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={logout}>
            <Icon name="LogOut" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}