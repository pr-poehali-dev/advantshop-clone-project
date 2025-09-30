import { Block } from '@/types/tilda';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function BlockRenderer({
  block,
  isEditing,
  onEdit,
  onDelete,
}: BlockRendererProps) {
  const { type, content, styles } = block;

  const blockStyle = {
    backgroundColor: styles.backgroundColor,
    color: styles.textColor,
    padding: styles.padding || '3rem 1rem',
    textAlign: styles.textAlign || 'center',
  };

  const renderContent = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {content.heading || 'Заголовок Hero блока'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {content.subheading || 'Подзаголовок с описанием'}
            </p>
            {content.buttonText && (
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                {content.buttonText}
              </Button>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="max-w-3xl mx-auto">
            {content.heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content.heading}
              </h2>
            )}
            <p className="text-lg leading-relaxed">
              {content.text || 'Текст блока'}
            </p>
          </div>
        );

      case 'features':
        return (
          <div className="max-w-6xl mx-auto">
            {content.heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                {content.heading}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.items?.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">{item.icon || '✨'}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="max-w-4xl mx-auto">
            <img
              src={content.imageUrl || 'https://via.placeholder.com/800x400'}
              alt="Block"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        );

      case 'button':
        return (
          <div className="max-w-2xl mx-auto">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">
              {content.buttonText || 'Кнопка'}
            </Button>
          </div>
        );

      default:
        return (
          <div className="max-w-3xl mx-auto text-gray-500">
            Блок типа "{type}"
          </div>
        );
    }
  };

  return (
    <div
      style={blockStyle as any}
      className={`relative group ${isEditing ? 'border-2 border-dashed border-pink-300' : ''}`}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={onEdit}
            className="bg-white shadow-lg"
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onDelete}
            className="shadow-lg"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      )}
      {renderContent()}
    </div>
  );
}