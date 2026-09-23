import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

const PRODUCTS = {
  basic: { name: 'Три банана. Базовые навыки', price: 100 },
  advanced: { name: 'Три банана. Продвинутый уровень', price: 200 },
} as const;

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, productIds: string[]) {
    const uniqueProductIds = [...new Set(productIds)] as Array<keyof typeof PRODUCTS>;

    if (uniqueProductIds.length === 0) {
      throw new BadRequestException('Выберите хотя бы один PDF');
    }

    const items = uniqueProductIds.map((productId) => {
      const product = PRODUCTS[productId];
      return { productId, name: product.name, price: product.price, quantity: 1 };
    });
    const amount = items.reduce((sum, item) => sum + item.price, 0);

    return this.prisma.order.create({
      data: {
        email,
        amount,
        items: { create: items },
      },
      select: { id: true, email: true, amount: true, status: true, createdAt: true, items: true },
    });
  }
}