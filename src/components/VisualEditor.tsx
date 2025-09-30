import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'card' | 'section';
  content: string;
  styles: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
  };
  position: { x: number; y: number };
}

export const VisualEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([
    {
      id: '1',
      type: 'text',
      content: 'Добро пожаловать!',
      styles: { fontSize: '32px', color: '#FF1493' },
      position: { x: 50, y: 50 }
    },
    {
      id: '2',
      type: 'button',
      content: 'Купить сейчас',
      styles: { backgroundColor: '#FF1493', color: '#FFFFFF', borderRadius: '24px', padding: '12px 24px' },
      position: { x: 50, y: 150 }
    }
  ]);

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const components = [
    { type: 'text', icon: 'Type', label: 'Текст', color: 'from-blue-400 to-blue-600' },
    { type: 'image', icon: 'Image', label: 'Изображение', color: 'from-purple-400 to-purple-600' },
    { type: 'button', icon: 'MousePointer', label: 'Кнопка', color: 'from-pink-400 to-pink-600' },
    { type: 'card', icon: 'Square', label: 'Карточка', color: 'from-green-400 to-green-600' },
    { type: 'section', icon: 'Layout', label: 'Секция', color: 'from-orange-400 to-orange-600' }
  ];

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type);
    toast.info('Перетащите элемент на холст');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    if (componentType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newElement: EditorElement = {
        id: Date.now().toString(),
        type: componentType as any,
        content: getDefaultContent(componentType),
        styles: getDefaultStyles(componentType),
        position: { x, y }
      };

      setElements([...elements, newElement]);
      toast.success('Элемент добавлен!');
    }
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text': return 'Новый текст';
      case 'button': return 'Нажми меня';
      case 'image': return '🖼️';
      case 'card': return 'Карточка';
      case 'section': return 'Секция';
      default: return '';
    }
  };

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case 'text':
        return { fontSize: '16px', color: '#1F2937' };
      case 'button':
        return { backgroundColor: '#FF1493', color: '#FFFFFF', borderRadius: '24px', padding: '12px 24px' };
      case 'image':
        return { borderRadius: '12px' };
      case 'card':
        return { backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '24px' };
      case 'section':
        return { backgroundColor: '#FFF5F7', padding: '48px', borderRadius: '32px' };
      default:
        return {};
    }
  };

  const updateElement = (id: string, updates: Partial<EditorElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
    toast.success('Элемент удалён');
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  const getCanvasWidth = () => {
    switch (deviceMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <aside className="w-80 bg-white border-r shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Icon name="Palette" className="text-pink-500" size={24} />
            Компоненты
          </h2>
        </div>

        <Tabs defaultValue="components" className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="components" className="flex-1">
              <Icon name="Box" size={16} className="mr-2" />
              Элементы
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex-1">
              <Icon name="Settings" size={16} className="mr-2" />
              Свойства
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="flex-1 p-6 space-y-3 overflow-auto">
            {components.map((comp, idx) => (
              <Card
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, comp.type)}
                className={`p-4 cursor-move hover:shadow-lg transition-all wave-border-soft bg-gradient-to-br ${comp.color} text-white animate-fade-in`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <Icon name={comp.icon as any} size={24} />
                  <span className="font-semibold">{comp.label}</span>
                </div>
              </Card>
            ))}

            <div className="pt-4 border-t mt-6">
              <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                <Icon name="Layers" size={16} />
                Готовые блоки
              </h3>
              {['Герой секция', 'Галерея', 'Контакты', 'Футер'].map((block, idx) => (
                <Card
                  key={idx}
                  className="p-3 mb-2 cursor-pointer hover:shadow-md transition-all bg-white border-2 border-pink-200"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Copy" size={16} className="text-pink-500" />
                    <span>{block}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="properties" className="flex-1 p-6 overflow-auto">
            {selectedEl ? (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Содержимое</Label>
                  <Input
                    value={selectedEl.content}
                    onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                    className="rounded-full"
                  />
                </div>

                {selectedEl.type === 'text' && (
                  <>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Размер шрифта</Label>
                      <Select
                        value={selectedEl.styles.fontSize}
                        onValueChange={(value) => updateElement(selectedEl.id, {
                          styles: { ...selectedEl.styles, fontSize: value }
                        })}
                      >
                        <SelectTrigger className="rounded-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12px">12px - Маленький</SelectItem>
                          <SelectItem value="16px">16px - Обычный</SelectItem>
                          <SelectItem value="24px">24px - Большой</SelectItem>
                          <SelectItem value="32px">32px - Заголовок</SelectItem>
                          <SelectItem value="48px">48px - Огромный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Цвет текста</Label>
                      <div className="flex gap-2">
                        {['#FF1493', '#1F2937', '#FFFFFF', '#FFB6C1', '#FF69B4'].map(color => (
                          <button
                            key={color}
                            onClick={() => updateElement(selectedEl.id, {
                              styles: { ...selectedEl.styles, color }
                            })}
                            className="w-10 h-10 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {(selectedEl.type === 'button' || selectedEl.type === 'card' || selectedEl.type === 'section') && (
                  <>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Цвет фона</Label>
                      <div className="flex gap-2 flex-wrap">
                        {['#FF1493', '#FFB6C1', '#FF69B4', '#FFFFFF', '#FFF5F7', '#1F2937'].map(color => (
                          <button
                            key={color}
                            onClick={() => updateElement(selectedEl.id, {
                              styles: { ...selectedEl.styles, backgroundColor: color }
                            })}
                            className="w-10 h-10 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Скругление углов</Label>
                      <Select
                        value={selectedEl.styles.borderRadius}
                        onValueChange={(value) => updateElement(selectedEl.id, {
                          styles: { ...selectedEl.styles, borderRadius: value }
                        })}
                      >
                        <SelectTrigger className="rounded-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0px">Без скругления</SelectItem>
                          <SelectItem value="8px">Небольшое</SelectItem>
                          <SelectItem value="16px">Среднее</SelectItem>
                          <SelectItem value="24px">Круглое</SelectItem>
                          <SelectItem value="50%">Волнистое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t">
                  <Button
                    variant="destructive"
                    className="w-full rounded-full"
                    onClick={() => deleteElement(selectedEl.id)}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить элемент
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Icon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Выберите элемент на холсте для редактирования</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Редактор шаблона</h1>
              <p className="text-sm text-gray-500">Мой цветочный магазин</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1 rounded-full transition-all ${deviceMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}
              >
                <Icon name="Monitor" size={18} />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-1 rounded-full transition-all ${deviceMode === 'tablet' ? 'bg-white shadow-sm' : ''}`}
              >
                <Icon name="Tablet" size={18} />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1 rounded-full transition-all ${deviceMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}
              >
                <Icon name="Smartphone" size={18} />
              </button>
            </div>

            <Button variant="outline" className="rounded-full">
              <Icon name="Eye" size={16} className="mr-2" />
              Предпросмотр
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="mx-auto transition-all duration-300" style={{ width: getCanvasWidth() }}>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="min-h-[600px] bg-white rounded-3xl shadow-xl relative overflow-hidden wave-border-soft"
              style={{ minHeight: '800px' }}
            >
              {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none">
                  <div className="text-center">
                    <Icon name="MousePointer" size={64} className="mx-auto mb-4 opacity-30" />
                    <p className="text-xl">Перетащите элементы сюда</p>
                  </div>
                </div>
              )}

              {elements.map((element) => (
                <div
                  key={element.id}
                  onClick={() => setSelectedElement(element.id)}
                  className={`absolute cursor-move transition-all hover:scale-105 ${
                    selectedElement === element.id ? 'ring-2 ring-pink-500 ring-offset-2' : ''
                  }`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    ...element.styles
                  }}
                >
                  {element.type === 'text' && (
                    <div style={{ fontSize: element.styles.fontSize, color: element.styles.color }}>
                      {element.content}
                    </div>
                  )}
                  {element.type === 'button' && (
                    <button
                      style={{
                        backgroundColor: element.styles.backgroundColor,
                        color: element.styles.color,
                        borderRadius: element.styles.borderRadius,
                        padding: element.styles.padding
                      }}
                      className="font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {element.content}
                    </button>
                  )}
                  {element.type === 'image' && (
                    <div className="text-6xl">{element.content}</div>
                  )}
                  {element.type === 'card' && (
                    <Card
                      style={{
                        backgroundColor: element.styles.backgroundColor,
                        borderRadius: element.styles.borderRadius,
                        padding: element.styles.padding
                      }}
                      className="shadow-lg min-w-[200px]"
                    >
                      <p>{element.content}</p>
                    </Card>
                  )}
                  {element.type === 'section' && (
                    <div
                      style={{
                        backgroundColor: element.styles.backgroundColor,
                        borderRadius: element.styles.borderRadius,
                        padding: element.styles.padding
                      }}
                      className="min-w-[300px] min-h-[100px] shadow-lg"
                    >
                      <p className="text-gray-600">{element.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};