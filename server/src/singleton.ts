import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from './prismaClient';

/**
 * Mock the prisma client
 *
 * @see https://www.prisma.io/docs/guides/testing/unit-testing
 */
jest.mock('./prismaClient', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

// Reset the mock before each test
beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
