import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopStats from '@/components/shop/ShopStats';
import ProductsTab from '@/components/shop/ProductsTab';
import CategoriesTab from '@/components/shop/CategoriesTab';
import OrdersTab from '@/components/shop/OrdersTab';
import SettingsTab from '@/components/shop/SettingsTab';
import { Product, Category } from '@/types/shop';

export default function Shop() {
  const { hasPermission } = useAuth();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <ShopHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShopStats products={products} categories={categories} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsTab
              products={products}
              categories={categories}
              isAddProductOpen={isAddProductOpen}
              onAddProductOpenChange={setIsAddProductOpen}
              newProduct={newProduct}
              onProductChange={setNewProduct}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              hasEditPermission={hasPermission('canEdit')}
              hasDeletePermission={hasPermission('canDelete')}
            />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab
              categories={categories}
              isAddCategoryOpen={isAddCategoryOpen}
              onAddCategoryOpenChange={setIsAddCategoryOpen}
              newCategoryName={newCategory.name}
              onCategoryNameChange={(name) => setNewCategory({ name })}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              hasDeletePermission={hasPermission('canDelete')}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}