import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function OrdersTab() {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Заказы
      </h3>
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Icon name="ShoppingBag" size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-500 mb-4">Заказов пока нет</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          Перейти на сайт
        </Button>
      </div>
    </Card>
  );
}