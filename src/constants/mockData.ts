export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  city: 'Москва' | 'Санкт-Петербург' | 'Казань';
  clinic: string;
  avatarUrl: string;
  price: number;
  availableSlot: string;
}

export interface NotificationItem {
  id: string;
  type: 'analysis_done' | 'appointment' | 'welcome' | 'promo';
  title: string;
  subtitle: string;
  timestamp: string;
  isUnread: boolean;
  zoneTag?: string;
}

export interface ScanRecord {
  id: string;
  procedureName: string;
  subType: string;
  date: string;
  matchScore: number;
  iconName: string;
  previewBeforeUrl: string;
  previewAfterUrl: string;
}

export interface ConsultationItem {
  id: string;
  doctor: Doctor;
  format: 'online' | 'in_person';
  dateTime: string;
  status: 'upcoming' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export interface FacialZone {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface ProcedureOption {
  id: string;
  zoneId: string;
  title: string;
  badge?: string;
  description: string;
  rehabDays: string;
  defaultIntensity: 'delicate' | 'optimal' | 'expressive';
}

export const FACIAL_ZONES: FacialZone[] = [
  { id: 'brows', name: 'Брови', iconName: 'eye-outline', description: 'Форма и лифтинг надбровных дуг' },
  { id: 'eyelids', name: 'Веки', iconName: 'eye', description: 'Блефаропластика и удаление нависаний' },
  { id: 'lips', name: 'Губы', iconName: 'heart-outline', description: 'Контуринг и эстетическое увеличение' },
  { id: 'nose', name: 'Нос', iconName: 'triangle-outline', description: 'Коррекция горбинки, кончика и спинки' },
  { id: 'volume', name: 'Объем', iconName: 'sparkles-outline', description: 'Скулы и восполнение объема средней зоны' },
  { id: 'chin', name: 'Подбородок', iconName: 'shield-outline', description: 'Проекция и ментопластика' },
  { id: 'jaw', name: 'Челюсть', iconName: 'crop', description: 'Углы молодости и овал лица' },
  { id: 'neck', name: 'Шея', iconName: 'git-commit-outline', description: 'Платизмопластика и угол шеи' },
];

export const PROCEDURES_DATA: ProcedureOption[] = [
  {
    id: 'jaw_jolie',
    zoneId: 'jaw',
    title: 'Углы челюсти (Джоли)',
    badge: 'Хит',
    description: 'Чёткий рельеф и контуринг нижней челюсти',
    rehabDays: '1-3 дня',
    defaultIntensity: 'optimal',
  },
  {
    id: 'rhino_bump',
    zoneId: 'nose',
    title: 'Ринопластика (Убрать горбинку)',
    badge: 'Топ',
    description: 'Выравнивание костно-хрящевой спинки для идеального профиля',
    rehabDays: '7-10 дней',
    defaultIntensity: 'optimal',
  },
  {
    id: 'rhino_straight',
    zoneId: 'nose',
    title: 'Ринопластика (Прямая спинка)',
    description: 'Классическая европейская спинка носа',
    rehabDays: '7-10 дней',
    defaultIntensity: 'optimal',
  },
  {
    id: 'rhino_upturned',
    zoneId: 'nose',
    title: 'Ринопластика (Курносый кончик)',
    badge: 'Популярно',
    description: 'Элегантный подъем и сужение кончика носа',
    rehabDays: '7 дней',
    defaultIntensity: 'delicate',
  },
  {
    id: 'lips_french',
    zoneId: 'lips',
    title: 'Увеличение губ (Французский бант)',
    badge: 'Хит',
    description: 'Четкая арка Купидона и мягкий естественный объем',
    rehabDays: '1-2 дня',
    defaultIntensity: 'delicate',
  },
  {
    id: 'bleph_fox',
    zoneId: 'eyelids',
    title: 'Блефаропластика (Лисий взгляд)',
    badge: 'Топ',
    description: 'Поднятие наружных уголков глаз и разглаживание века',
    rehabDays: '5-7 дней',
    defaultIntensity: 'optimal',
  },
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Д-р Михаил Соколов',
    specialization: 'Ринопластика',
    experienceYears: 14,
    rating: 4.96,
    reviewsCount: 168,
    city: 'Москва',
    clinic: 'Клиника пластической хирургии «Art Plastic»',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop',
    price: 8500,
    availableSlot: 'Завтра, 15:30',
  },
  {
    id: 'doc-2',
    name: 'Д-р Анна Смирнова',
    specialization: 'Блефаропластика',
    experienceYears: 12,
    rating: 4.92,
    reviewsCount: 124,
    city: 'Санкт-Петербург',
    clinic: 'Институт Красоты на Арбате',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?q=80&w=400&auto=format&fit=crop',
    price: 7000,
    availableSlot: '24 Окт, 11:00',
  },
  {
    id: 'doc-3',
    name: 'Д-р Руслан Алиев',
    specialization: 'Маммопластика',
    experienceYears: 16,
    rating: 4.98,
    reviewsCount: 215,
    city: 'Москва',
    clinic: 'Европейский медицинский центр (EMC)',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop',
    price: 9500,
    availableSlot: '26 Окт, 18:00',
  },
  {
    id: 'doc-4',
    name: 'Д-р Екатерина Воронова',
    specialization: 'Подтяжка лица',
    experienceYears: 15,
    rating: 4.88,
    reviewsCount: 94,
    city: 'Казань',
    clinic: 'Клиника эстетической медицины «Aesthetica»',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
    price: 6500,
    availableSlot: '28 Окт, 14:00',
  },
  {
    id: 'doc-5',
    name: 'Д-р Тимур Гаджиев',
    specialization: 'Липосакция',
    experienceYears: 11,
    rating: 4.90,
    reviewsCount: 88,
    city: 'Москва',
    clinic: 'Центр микрохирургии и контуринга',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop',
    price: 7500,
    availableSlot: '30 Окт, 12:30',
  },
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'analysis_done',
    title: 'ИИ Анализ завершен',
    subtitle: 'Результат моделирования зоны «Нос» готов к просмотру',
    timestamp: '10 мин назад',
    isUnread: true,
    zoneTag: 'Нос',
  },
  {
    id: 'notif-2',
    type: 'appointment',
    title: 'Напоминание о записи',
    subtitle: 'Завтра в 14:00 онлайн-консультация с д-ром Соколовым М.А.',
    timestamp: 'Вчера, 18:30',
    isUnread: true,
  },
  {
    id: 'notif-3',
    type: 'welcome',
    title: 'Добро пожаловать!',
    subtitle: 'Интерактивный манекен откалиброван. Выберите анатомическую зону для моделирования.',
    timestamp: '14 Окт',
    isUnread: false,
  },
];

export const SCAN_HISTORY_DATA: ScanRecord[] = [
  {
    id: 'scan-1',
    procedureName: 'Ринопластика',
    subType: 'Прямой нос',
    date: '15 Авг 2026',
    matchScore: 96,
    iconName: 'triangle-outline',
    previewBeforeUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    previewAfterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'scan-2',
    procedureName: 'Увеличение губ',
    subType: 'Пухлые губы',
    date: '12 Авг 2026',
    matchScore: 94,
    iconName: 'heart-outline',
    previewBeforeUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    previewAfterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'scan-3',
    procedureName: 'Блефаропластика',
    subType: 'Лисий взгляд',
    date: '28 Июл 2026',
    matchScore: 98,
    iconName: 'eye-outline',
    previewBeforeUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    previewAfterUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'scan-4',
    procedureName: 'Углы челюсти',
    subType: 'Джоли профиль',
    date: '10 Июл 2026',
    matchScore: 92,
    iconName: 'crop',
    previewBeforeUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    previewAfterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
];

export const CONSULTATIONS_DATA: ConsultationItem[] = [
  {
    id: 'cons-1',
    doctor: DOCTORS_DATA[0],
    format: 'online',
    dateTime: '24 Окт 2026, 15:30',
    status: 'upcoming',
    notes: 'Обсуждение результатов ИИ моделирования спинки носа',
  },
  {
    id: 'cons-2',
    doctor: DOCTORS_DATA[1],
    format: 'in_person',
    dateTime: '28 Окт 2026, 11:00',
    status: 'pending',
    notes: 'Осмотр и моделирование блефаропластики',
  },
  {
    id: 'cons-3',
    doctor: DOCTORS_DATA[2],
    format: 'online',
    dateTime: '12 Сен 2026, 17:00',
    status: 'completed',
    notes: 'Первичная консультация',
  },
];

export const USER_PROFILE_DATA = {
  name: 'Umid Babayev',
  email: 'umidbabayeff@gmail.com',
  phone: '+7 (999) 123-45-67',
  badge: 'Google Аккаунт',
  isPro: true,
};
