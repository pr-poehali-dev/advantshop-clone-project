// Update this page (the content is just a fallback if you fail to update the page)

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
      <div className="text-center max-w-2xl px-4">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
            <Icon name="Sparkles" size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
            Tilda Pink
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Конструктор сайтов нового поколения с розовым дизайном
          </p>
        </div>
        
        <Button
          size="lg"
          onClick={() => navigate('/tilda')}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-lg px-8 py-6"
        >
          <Icon name="Rocket" size={20} className="mr-2" />
          Начать создавать
        </Button>

        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">100+</div>
            <div className="text-sm text-gray-600">Готовых блоков</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Строк кода</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">5 мин</div>
            <div className="text-sm text-gray-600">До запуска</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;