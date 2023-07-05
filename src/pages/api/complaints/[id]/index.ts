import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { complaintValidationSchema } from 'validationSchema/complaints';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.complaint
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getComplaintById();
    case 'PUT':
      return updateComplaintById();
    case 'DELETE':
      return deleteComplaintById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getComplaintById() {
    const data = await prisma.complaint.findFirst(convertQueryToPrismaUtil(req.query, 'complaint'));
    return res.status(200).json(data);
  }

  async function updateComplaintById() {
    await complaintValidationSchema.validate(req.body);
    const data = await prisma.complaint.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteComplaintById() {
    const data = await prisma.complaint.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
