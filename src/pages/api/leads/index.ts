import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { leadValidationSchema } from 'validationSchema/leads';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getLeads();
    case 'POST':
      return createLead();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLeads() {
    const data = await prisma.lead
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'lead'));
    return res.status(200).json(data);
  }

  async function createLead() {
    await leadValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.lead.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
