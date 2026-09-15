import { Product } from '../types/product';
import { GiftCard } from '../types/giftcard';
import { User } from '../types/auth';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bombones-autor',
    name: 'Bombones de Autor - Selección Bariloche',
    category: 'bombones',
    price: 18500,
    priceFormatted: '$18.500 ARS',
    image: '/assets/images/bombones.webp',
    tag: 'Edición Limitada',
    cocoaPct: '72%',
    description: 'Surtido de bombones rellenos artesanalmente con dulce de leche casero, frambuesas patagónicas y licores artesanales.',
    notes: ['Dulce de Leche', 'Frambuesa', 'Oro Comestible', 'Avellana'],
    stock: 45,
    featured: true
  },
  {
    id: 'chocolate-rama',
    name: 'Chocolate en Rama Tradicional (250g)',
    category: 'rama',
    price: 14200,
    priceFormatted: '$14.200 ARS',
    image: '/assets/images/rama.webp',
    tag: 'Clásico Patagónico',
    cocoaPct: '60%',
    description: 'Delicadas láminas de chocolate con leche y amargo templado manualmente sobre mesada de mármol según la receta tradicional.',
    notes: ['Sabor Suave', 'Cacao Puro', 'Textura Crocante'],
    stock: 60,
    featured: true
  },
  {
    id: 'trufas-patagonicas',
    name: 'Trufas de Cacao & Frutos Rojos (12u)',
    category: 'trufas',
    price: 16800,
    priceFormatted: '$16.800 ARS',
    image: '/assets/images/trufas.webp',
    tag: '70% Cacao',
    cocoaPct: '70%',
    description: 'Trufas intensas elaboradas con cacao de origen único, espolvoreadas con caco en polvo holandés y frambuesas liofilizadas.',
    notes: ['Cacao Intenso', 'Toque Cítrico', 'Cremoso'],
    stock: 30,
    featured: true
  },
  {
    id: 'alfajores-artesanales',
    name: 'Alfajores Patagónicos de Chocolate (6u)',
    category: 'alfajores',
    price: 12900,
    priceFormatted: '$12.900 ARS',
    image: '/assets/images/alfajores.webp',
    tag: 'Artesanal',
    cocoaPct: '55%',
    description: 'Masa suave de cacao, abundante relleno de dulce de leche de campo y baño generoso de chocolate amargo.',
    notes: ['Dulce de Leche', 'Masa Cacao', 'Receta Familiar'],
    stock: 80
  },
  {
    id: 'caja-regalo-tronador',
    name: 'Caja Regalo Tronador Deluxe (12 piezas)',
    category: 'bombones',
    price: 24500,
    priceFormatted: '$24.500 ARS',
    image: '/assets/images/caja.webp',
    tag: 'Ideal Regalo',
    cocoaPct: '68%',
    description: 'Estuche rígido de madera con detalles en dorado, con una fina selección de nuestras piezas artesanales más galardonadas.',
    notes: ['Caja de Madera', 'Lujo Artesanal', 'Maridaje'],
    stock: 25,
    featured: true
  }
];

export const INITIAL_GIFTCARDS: GiftCard[] = [
  {
    code: 'TRONADOR10000',
    amount: 10000,
    balance: 10000,
    status: 'ACTIVA',
    createdAt: '2026-09-01',
    recipientName: 'Cliente Especial'
  },
  {
    code: 'BARILOCHE5000',
    amount: 5000,
    balance: 5000,
    status: 'ACTIVA',
    createdAt: '2026-09-05',
    recipientName: 'Regalo Patagónico'
  },
  {
    code: 'PATAGONIA15000',
    amount: 15000,
    balance: 15000,
    status: 'ACTIVA',
    createdAt: '2026-09-10',
    recipientName: 'Socio Tronador'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-cliente-1',
    name: 'Sofía Martínez',
    email: 'sofia@bariloche.com',
    role: 'CLIENTE',
    memberSince: '2025-04-12'
  },
  {
    id: 'usr-maestro-1',
    name: 'Don Mateo Tronador',
    email: 'maestro@chocolatestronador.com',
    role: 'MAESTRO_CHOCOLATERO',
    memberSince: '1988-10-15'
  }
];
