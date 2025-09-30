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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  status: 'active' | 'draft' | 'outofstock';
  image: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  productsCount: number;
}

export default function Shop() {
  const navigate = useNavigate();
  const { logout, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Воздушные шары "Сердце"',
      category: 'Шары',
      price: 150,
      oldPrice: 200,
      stock: 50,
      status: 'active',
      image: '🎈',
      description: 'Красивые воздушные шары в форме сердца',
    },
    {
      id: '2',
      name: 'Букет из шаров',
      category: 'Букеты',
      price: 850,
      stock: 20,
      status: 'active',
      image: '🎉',
      description: 'Яркий праздничный букет из воздушных шаров',
    },
    {
      id: '3',
      name: 'Цифры из фольги',
      category: 'Шары',
      price: 450,
      stock: 0,
      status: 'outofstock',
      image: '🔢',
      description: 'Цифры из фольгированных шаров',
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Шары', productsCount: 15 },
    { id: '2', name: 'Букеты', productsCount: 8 },
    { id: '3', name: 'Сувениры', productsCount: 12 },
    { id: '4', name: 'Открытки', productsCount: 25 },
  ]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'active',
    description: '',
  });

  const [newCategory, setNewCategory] = useState({ name: '' });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      oldPrice: newProduct.oldPrice,
      stock: newProduct.stock || 0,
      status: newProduct.status || 'active',
      image: '🎁',
      description: newProduct.description || '',
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'active',
      description: '',
    });
    setIsAddProductOpen(false);
    toast.success('Товар успешно добавлен!');
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error('Введите название категории');
      return;
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      productsCount: 0,
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '' });
    setIsAddCategoryOpen(false);
    toast.success('Категория успешно добавлена!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success('Товар удален');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success('Категория удалена');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'outofstock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'draft':
        return 'Черновик';
      case 'outofstock':
        return 'Нет в наличии';
      default:
        return status;
    }
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Список товаров
                </h3>
                <Dialog
                  open={isAddProductOpen}
                  onOpenChange={setIsAddProductOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-pink-500 hover:bg-pink-600">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить товар
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Новый товар</DialogTitle>
                      <DialogDescription>
                        Заполните информацию о товаре
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label>Название товара *</Label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                          }
                          placeholder="Введите название"
                        />
                      </div>
                      <div>
                        <Label>Категория *</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.name}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Цена *</Label>
                          <Input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                price: Number(e.target.value),
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label>Старая цена</Label>
                          <Input
                            type="number"
                            value={newProduct.oldPrice || ''}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                oldPrice: Number(e.target.value),
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Количество на складе</Label>
                        <Input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: Number(e.target.value),
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label>Статус</Label>
                        <Select
                          value={newProduct.status}
                          onValueChange={(value: any) =>
                            setNewProduct({ ...newProduct, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Активен</SelectItem>
                            <SelectItem value="draft">Черновик</SelectItem>
                            <SelectItem value="outofstock">
                              Нет в наличии
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Описание</Label>
                        <Textarea
                          value={newProduct.description}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              description: e.target.value,
                            })
                          }
                          placeholder="Описание товара"
                          rows={4}
                        />
                      </div>
                      <Button
                        onClick={handleAddProduct}
                        className="w-full bg-pink-500 hover:bg-pink-600"
                      >
                        Добавить товар
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Товар</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Склад</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{product.image}</div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {product.description.slice(0, 40)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {product.price} ₽
                          </p>
                          {product.oldPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {product.oldPrice} ₽
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            product.stock > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {product.stock} шт
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(product.status)}
                        >
                          {getStatusLabel(product.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {hasPermission('canEdit') && (
                            <Button variant="ghost" size="icon">
                              <Icon name="Edit" size={18} />
                            </Button>
                          )}
                          {hasPermission('canDelete') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Категории товаров
                </h3>
                <Dialog
                  open={isAddCategoryOpen}
                  onOpenChange={setIsAddCategoryOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-pink-500 hover:bg-pink-600">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить категорию
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новая категория</DialogTitle>
                      <DialogDescription>
                        Создайте новую категорию товаров
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label>Название категории</Label>
                        <Input
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory({ name: e.target.value })
                          }
                          placeholder="Введите название"
                        />
                      </div>
                      <Button
                        onClick={handleAddCategory}
                        className="w-full bg-pink-500 hover:bg-pink-600"
                      >
                        Добавить категорию
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className="p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {category.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {category.productsCount} товаров
                        </p>
                      </div>
                      {hasPermission('canDelete') && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
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
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Настройки магазина
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Валюта</Label>
                  <Select defaultValue="rub">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rub">Рубль (₽)</SelectItem>
                      <SelectItem value="usd">Доллар ($)</SelectItem>
                      <SelectItem value="eur">Евро (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email для уведомлений</Label>
                  <Input type="email" placeholder="shop@example.com" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Автоматическое уведомление о заказах
                    </p>
                    <p className="text-sm text-gray-500">
                      Получать email при новых заказах
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Сохранить настройки
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}