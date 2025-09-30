import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Product, Category } from '@/types/shop';

interface ShopStatsProps {
  products: Product[];
  categories: Category[];
}

export default function ShopStats({ products, categories }: ShopStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-full p-3">
            <Icon name="Package" size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Всего товаров</p>
            <p className="text-2xl font-bold text-gray-900">
              {products.length}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 rounded-full p-3">
            <Icon name="CheckCircle" size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Активные</p>
            <p className="text-2xl font-bold text-gray-900">
              {products.filter((p) => p.status === 'active').length}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 rounded-full p-3">
            <Icon name="AlertCircle" size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Нет в наличии</p>
            <p className="text-2xl font-bold text-gray-900">
              {products.filter((p) => p.status === 'outofstock').length}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 rounded-full p-3">
            <Icon name="Layers" size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Категории</p>
            <p className="text-2xl font-bold text-gray-900">
              {categories.length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}