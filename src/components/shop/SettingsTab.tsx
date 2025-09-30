import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsTab() {
  return (
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
  );
}