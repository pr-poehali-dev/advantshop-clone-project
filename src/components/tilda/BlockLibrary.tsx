import { Card } from '@/components/ui/card';
import { Block } from '@/types/tilda';
import Icon from '@/components/ui/icon';

interface BlockLibraryProps {
  onAddBlock: (block: Omit<Block, 'id' | 'order'>) => void;
}

const blockTemplates = [
  {
    type: 'hero' as const,
    title: 'Hero секция',
    icon: 'Sparkles',
    preview: 'Большой заголовок с кнопкой',
    content: {
      heading: 'Создавайте сайты без кода',
      subheading: 'Визуальный редактор нового поколения',
      buttonText: 'Начать бесплатно',
    },
    styles: {
      backgroundColor: '#fce7f3',
      textColor: '#831843',
      padding: '6rem 2rem',
      textAlign: 'center' as const,
    },
  },
  {
    type: 'text' as const,
    title: 'Текстовый блок',
    icon: 'Type',
    preview: 'Заголовок и параграф',
    content: {
      heading: 'О нас',
      text: 'Расскажите о вашей компании и услугах. Добавьте интересные факты и уникальные преимущества.',
    },
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      padding: '4rem 2rem',
      textAlign: 'center' as const,
    },
  },
  {
    type: 'features' as const,
    title: 'Преимущества',
    icon: 'Grid3x3',
    preview: '3 карточки с иконками',
    content: {
      heading: 'Наши преимущества',
      items: [
        { title: 'Быстро', description: 'Запуск за 5 минут', icon: '⚡' },
        { title: 'Просто', description: 'Без кода и программирования', icon: '✨' },
        { title: 'Красиво', description: 'Современный дизайн', icon: '💎' },
      ],
    },
    styles: {
      backgroundColor: '#f9fafb',
      textColor: '#1f2937',
      padding: '4rem 2rem',
      textAlign: 'center' as const,
    },
  },
  {
    type: 'image' as const,
    title: 'Изображение',
    icon: 'Image',
    preview: 'Полноширинная картинка',
    content: {
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
    },
    styles: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      textAlign: 'center' as const,
    },
  },
  {
    type: 'button' as const,
    title: 'Кнопка',
    icon: 'MousePointer',
    preview: 'Call-to-action кнопка',
    content: {
      buttonText: 'Связаться с нами',
      buttonLink: '#contact',
    },
    styles: {
      backgroundColor: '#ffffff',
      padding: '3rem 2rem',
      textAlign: 'center' as const,
    },
  },
];

export default function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Библиотека блоков</h3>
      <div className="grid grid-cols-1 gap-3">
        {blockTemplates.map((template) => (
          <Card
            key={template.type}
            className="p-4 cursor-pointer hover:shadow-md hover:border-pink-300 transition-all group"
            onClick={() => onAddBlock(template)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-colors">
                <Icon name={template.icon as any} size={20} className="text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1">
                  {template.title}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {template.preview}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}