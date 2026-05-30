import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

async function seedUsers() {
  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: { id: user.id, name: user.name, email: user.email, password: hashedPassword },
      });
    }),
  );
}

async function seedCustomers() {
  return Promise.all(
    customers.map((customer) =>
      prisma.customer.upsert({
        where: { id: customer.id },
        update: {},
        create: customer,
      }),
    ),
  );
}

async function seedInvoices() {
  return Promise.all(
    invoices.map((invoice) =>
      prisma.invoice.create({
        data: {
          customer_id: invoice.customer_id,
          amount: invoice.amount,
          status: invoice.status,
          date: new Date(invoice.date),
        },
      }),
    ),
  );
}

async function seedRevenue() {
  return Promise.all(
    revenue.map((rev) =>
      prisma.revenue.upsert({
        where: { month: rev.month },
        update: {},
        create: rev,
      }),
    ),
  );
}

export async function GET() {
  try {
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
