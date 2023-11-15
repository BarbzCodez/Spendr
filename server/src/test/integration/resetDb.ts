import prisma from '../../prismaClient';

export default async function resetDb() {
  await Promise.all([
    prisma.groupExpenseSplit.deleteMany(),
    prisma.expense.deleteMany(),
    prisma.budget.deleteMany(),
  ]);

  await prisma.groupExpense.deleteMany();
  await prisma.user.deleteMany();

  await prisma.$disconnect();
}
