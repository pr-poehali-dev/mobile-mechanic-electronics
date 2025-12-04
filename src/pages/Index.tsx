import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const services = [
  {
    title: 'Диагностика электрики',
    description: 'Компьютерная диагностика всех систем автомобиля',
    icon: 'Search',
    price: 'от 1500 ₽'
  },
  {
    title: 'Ремонт электрооборудования',
    description: 'Ремонт генератора, стартера, проводки',
    icon: 'Zap',
    price: 'от 2000 ₽'
  },
  {
    title: 'Замена АКБ',
    description: 'Замена и обслуживание аккумуляторных батарей',
    icon: 'Battery',
    price: 'от 500 ₽'
  },
  {
    title: 'Ремонт систем освещения',
    description: 'Замена и ремонт фар, габаритов, поворотников',
    icon: 'Lightbulb',
    price: 'от 800 ₽'
  },
  {
    title: 'Установка сигнализации',
    description: 'Установка и настройка противоугонных систем',
    icon: 'Shield',
    price: 'от 3000 ₽'
  },
  {
    title: 'Аварийный выезд',
    description: 'Экстренная помощь на дороге 24/7',
    icon: 'Siren',
    price: 'от 2500 ₽'
  }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function Index() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка принята!',
      description: `Мы свяжемся с вами по номеру ${phone} для подтверждения записи`,
    });

    setIsOpen(false);
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Wrench" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary">АвтоЭлектрик</h1>
              <p className="text-sm text-muted-foreground">Выездной автослесарь</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="Calendar" size={18} />
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Онлайн-запись</DialogTitle>
                <DialogDescription>
                  Выберите услугу, дату и время. Мы перезвоним для подтверждения.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="service">Услуга</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.title} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Время</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleBooking} className="w-full">
                Отправить заявку
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative bg-secondary text-secondary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://cdn.poehali.dev/projects/47eed7b9-6d5d-4633-b2e3-c7577be787e6/files/8165a03a-f649-4a8b-9e5b-75209a511ce9.jpg"
            alt="Auto service"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Профессиональный ремонт электрики авто
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Выезд к вам за 30 минут. Диагностика и ремонт на месте. Гарантия на все работы.
            </p>
            <div className="flex flex-wrap gap-4">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="default" className="gap-2">
                    <Icon name="Calendar" size={20} />
                    Записаться онлайн
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button size="lg" variant="outline" className="gap-2 bg-white text-secondary hover:bg-gray-100">
                <Icon name="Phone" size={20} />
                +7 (999) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={24} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Записаться</Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему мы?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Быстрый выезд</h3>
              <p className="text-muted-foreground">Приедем за 30 минут в любую точку города</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Опыт 10+ лет</h3>
              <p className="text-muted-foreground">Работаем со всеми марками автомобилей</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Гарантия</h3>
              <p className="text-muted-foreground">Гарантия на все виды работ до 12 месяцев</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Wallet" className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-semibold mb-2">Честная цена</h3>
              <p className="text-muted-foreground">Точная смета перед началом работ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">Круглосуточно, без выходных</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Зона выезда</h3>
                      <p className="text-muted-foreground">Москва и Московская область</p>
                      <p className="text-sm text-muted-foreground">Выезд за МКАД обсуждается индивидуально</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@autoelectric.ru</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full gap-2" size="lg">
                        <Icon name="Calendar" size={20} />
                        Записаться на ремонт
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Wrench" className="text-primary-foreground" size={20} />
            </div>
            <span className="text-lg font-semibold">АвтоЭлектрик</span>
          </div>
          <p className="text-sm opacity-80">
            © 2024 Выездной автослесарь-автоэлектрик. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
