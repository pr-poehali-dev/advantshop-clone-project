import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Website {
  id: number;
  name: string;
  domain: string;
  template: string;
  published: boolean;
  views: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [websites] = useState<Website[]>([
    { id: 1, name: 'Мой цветочный магазин', domain: 'flowers.poehali.dev', template: 'Bloom', published: true, views: 1247 },
    { id: 2, name: 'Интернет-магазин подарков', domain: 'gifts.poehali.dev', template: 'Wave', published: false, views: 342 },
    { id: 3, name: 'Свадебный салон', domain: 'wedding.poehali.dev', template: 'Romance', published: true, views: 892 },
  ]);

  const templates = [
    { name: 'Bloom', category: 'Магазин', preview: '🌸' },
    { name: 'Wave', category: 'Бизнес', preview: '🌊' },
    { name: 'Romance', category: 'События', preview: '💝' },
    { name: 'Fresh', category: 'Магазин', preview: '🌿' },
    { name: 'Candy', category: 'Магазин', preview: '🍬' },
    { name: 'Cloud', category: 'Портфолио', preview: '☁️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center animate-float">
                <Icon name="Sparkles" className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                TAPLINK
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Главная</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Дашборд</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Шаблоны</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">Домены</a>
              <Button 
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6"
                onClick={() => navigate('/login')}
              >
                <Icon name="User" size={16} className="mr-2" />
                Вход
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <a href="#" className="text-lg text-gray-700 hover:text-pink-600">Главная</a>
                  <a href="#" className="text-lg text-gray-700 hover:text-pink-600">Дашборд</a>
                  <a href="#" className="text-lg text-gray-700 hover:text-pink-600">Шаблоны</a>
                  <a href="#" className="text-lg text-gray-700 hover:text-pink-600">Домены</a>
                  <Button 
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-full mt-4"
                    onClick={() => navigate('/login')}
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Вход
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Мои проекты
            </h2>
            <p className="text-gray-600">Управляйте своими сайтами и шаблонами</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-600">Режим редактирования</span>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  editMode ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  editMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full gap-2">
                  <Icon name="Plus" size={20} />
                  Создать сайт
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Выберите шаблон</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {templates.map((template, idx) => (
                    <Card
                      key={idx}
                      className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 wave-border-soft bg-gradient-to-br from-white to-pink-50"
                    >
                      <div className="text-5xl mb-3 animate-float">{template.preview}</div>
                      <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                      <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="sites" className="w-full">
          <TabsList className="bg-white shadow-sm rounded-full p-1 mb-6">
            <TabsTrigger value="sites" className="rounded-full px-6">
              <Icon name="Globe" size={16} className="mr-2" />
              Мои сайты
            </TabsTrigger>
            <TabsTrigger value="templates" className="rounded-full px-6">
              <Icon name="Layout" size={16} className="mr-2" />
              Шаблоны
            </TabsTrigger>
            <TabsTrigger value="domains" className="rounded-full px-6">
              <Icon name="Link" size={16} className="mr-2" />
              Домены
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sites" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((site) => (
                <Card
                  key={site.id}
                  className="overflow-hidden wave-border-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white animate-fade-in"
                >
                  <div className="h-40 bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30 animate-float">🌸</div>
                    </div>
                    {site.published && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        <Icon name="CheckCircle" size={14} className="mr-1" />
                        Опубликован
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-gray-900">{site.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Icon name="Globe" size={14} />
                      <span className="truncate">{site.domain}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon name="Eye" size={14} />
                        <span>{site.views} просмотров</span>
                      </div>
                      <Badge variant="outline">{site.template}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-full" size="sm">
                        <Icon name="Settings" size={14} className="mr-1" />
                        Настроить
                      </Button>
                      <Button 
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full" 
                        size="sm"
                        onClick={() => navigate('/editor')}
                      >
                        <Icon name="Edit" size={14} className="mr-1" />
                        Редактор
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templates.map((template, idx) => (
                <Card
                  key={idx}
                  className="p-8 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-2 wave-border bg-gradient-to-br from-white via-pink-50 to-white animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-6xl mb-4 animate-float text-center">{template.preview}</div>
                  <h3 className="font-bold text-xl mb-2 text-center">{template.name}</h3>
                  <Badge variant="secondary" className="w-full justify-center">{template.category}</Badge>
                  <Button className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full">
                    Использовать
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="domains">
            <Card className="p-8 wave-border-soft bg-white">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center animate-float">
                  <Icon name="Link" className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Управление доменами</h3>
                <p className="text-gray-600 mb-8">
                  Подключите свой собственный домен или используйте бесплатный поддомен
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Input
                    placeholder="example.com"
                    className="flex-1 rounded-full"
                  />
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8">
                    Подключить домен
                  </Button>
                </div>
                <div className="bg-pink-50 rounded-3xl p-6 mt-8">
                  <h4 className="font-semibold mb-3 flex items-center justify-center gap-2">
                    <Icon name="Info" size={18} className="text-pink-600" />
                    Как это работает
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2 text-left max-w-md mx-auto">
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Купите домен у любого регистратора</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Добавьте CNAME запись в DNS</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>SSL сертификаты выпускаются автоматически</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Ваш сайт будет доступен по новому домену</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mt-12 wave-border-alt bg-gradient-to-br from-pink-500 to-pink-600 p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-3 mb-6">
              <div className="text-4xl animate-float">🚀</div>
              <div className="text-4xl animate-float" style={{ animationDelay: '0.2s' }}>✨</div>
              <div className="text-4xl animate-float" style={{ animationDelay: '0.4s' }}>🎨</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Создайте сайт за 5 минут
            </h2>
            <p className="text-pink-100 mb-8 text-lg">
              Без знания кода, с визуальным редактором и готовыми шаблонами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 rounded-full px-8">
                <Icon name="Play" size={20} className="mr-2" />
                Начать сейчас
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8">
                <Icon name="Video" size={20} className="mr-2" />
                Посмотреть видео
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'Zap', title: 'Быстрая доставка', desc: 'Цветы доставляются в течение 2 часов' },
            { icon: 'Heart', title: 'Свежие цветы', desc: 'Букеты собираются непосредственно перед доставкой' },
            { icon: 'Award', title: 'Хорошие цены', desc: '1600+ довольных клиентов за 4 года' },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 wave-border-soft bg-white hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 animate-float">
                <Icon name={feature.icon as any} className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </Card>
          ))}
        </section>

        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">✨</span>
              <span className="text-sm">© 2025 TAPLINK. Платформа для создания сайтов</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                <Icon name="Send" size={20} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;