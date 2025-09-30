import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useProject } from '@/contexts/ProjectContext';
import { Project } from '@/types/tilda';
import { toast } from 'sonner';

export default function TildaHome() {
  const navigate = useNavigate();
  const { projects, setCurrentProject, addProject } = useProject();

  const createNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `Проект ${projects.length + 1}`,
      pages: [
        {
          id: 'page-1',
          title: 'Главная',
          slug: 'index',
          blocks: [],
          settings: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      settings: {
        primaryColor: '#ec4899',
        secondaryColor: '#f472b6',
        fontFamily: 'Inter',
      },
    };
    addProject(newProject);
    setCurrentProject(newProject);
    toast.success('Проект создан!');
    navigate('/tilda/editor');
  };

  const openProject = (project: Project) => {
    setCurrentProject(project);
    navigate('/tilda/editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
      <header className="border-b border-pink-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                Tilda Pink
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-gray-700 hover:text-pink-600">
                  Мои проекты
                </Button>
                <Button variant="ghost" className="text-gray-700 hover:text-pink-600">
                  Шаблоны
                </Button>
                <Button variant="ghost" className="text-gray-700 hover:text-pink-600">
                  Обучение
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                Помощь
              </Button>
              <Button
                onClick={createNewProject}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Создать проект
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Мои проекты
          </h2>
          <p className="text-gray-600">
            Создавайте сайты без кода с помощью визуального редактора
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              onClick={() => openProject(project)}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-pink-300"
            >
              <div className="aspect-video bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <Icon
                  name="Layout"
                  size={64}
                  className="text-pink-300 group-hover:text-pink-500 transition-colors"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Icon name="FileText" size={14} className="mr-1" />
                    {project.pages.length} {project.pages.length === 1 ? 'страница' : 'страниц'}
                  </span>
                  <span>Изменено сегодня</span>
                </div>
              </div>
            </Card>
          ))}

          <Card
            onClick={createNewProject}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-dashed border-pink-300 hover:border-pink-500 hover:bg-pink-50/50"
          >
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <Icon name="Plus" size={32} className="text-pink-500" />
                </div>
                <p className="text-gray-600 font-medium">
                  Создать новый проект
                </p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 text-center">
                Начните с пустого проекта или выберите шаблон
              </p>
            </div>
          </Card>
        </div>

        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Популярные шаблоны
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Лендинг', icon: 'Zap', color: 'from-pink-400 to-rose-500' },
              { name: 'Магазин', icon: 'ShoppingCart', color: 'from-rose-400 to-fuchsia-500' },
              { name: 'Портфолио', icon: 'Briefcase', color: 'from-fuchsia-400 to-purple-500' },
              { name: 'Блог', icon: 'BookOpen', color: 'from-purple-400 to-pink-500' },
            ].map((template) => (
              <Card
                key={template.name}
                className="cursor-pointer hover:shadow-lg transition-all group"
              >
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon name={template.icon as any} size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Готовый шаблон для быстрого старта
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}