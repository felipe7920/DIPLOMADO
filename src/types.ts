export enum Screen {
  WELCOME = 'welcome',
  LOGIN = 'login',
  EXPLORE = 'explore',
  DETAIL = 'detail',
  SUMMARY = 'summary',
  CONFIRMATION = 'confirmation'
}

export interface StoreItem {
  id: string;
  name: string;
  store: string;
  distance: string;
  rating: number;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  tags: string[];
  freshness: number; // 0-100
  freshnessLabel: string;
  weight: string;
  pickupInfo: string;
}

export const MOCK_ITEMS: StoreItem[] = [
  {
    id: '1',
    name: 'Pack de Vegetales Esenciales',
    store: 'Verdulería La Huerta',
    distance: '0.4 km',
    rating: 4.8,
    description: 'Un paquete cuidadosamente seleccionado que contiene patatas locales, cebollas amarillas y tomates madurados en la planta. Aunque estos artículos se acercan a su fecha de consumo preferente, siguen siendo perfectos para el consumo inmediato en guisos, sopas o salsas.',
    price: 4.50,
    originalPrice: 12.00,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
    category: 'Vegetales',
    tags: ['Vegan'],
    freshness: 85,
    freshnessLabel: 'Muy Fresco',
    weight: '3 kg aprox',
    pickupInfo: 'Recoger en mostrador principal'
  },
  {
    id: '2',
    name: 'Bolsa Sorpresa de Panadería',
    store: 'Panadería San José',
    distance: '1.2 km',
    rating: 4.9,
    description: 'Un surtido cáliz y acogedor de panes de masa madre artesanales y croissants dorados. El estilo visual es moderno y enfatiza la conexión comunitaria.',
    price: 5.00,
    originalPrice: 15.00,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    category: 'Panadería',
    tags: ['Artesanal'],
    freshness: 40,
    freshnessLabel: 'Consumir hoy',
    weight: '1.5 kg aprox',
    pickupInfo: 'Recoger en el área de cafetería'
  }
];
