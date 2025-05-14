import { TenantModel } from '../models/Tenant';

interface CreateTenantInput {
  name: string;
  ownerEmail: string;
}

export const createTenantService = async ({ name, ownerEmail }: CreateTenantInput) => {
  const existing = await TenantModel.findOne({ name });
  if (existing) throw new Error('Tenant already exists');
  return await TenantModel.create({ name, ownerEmail });
};

export const getTenantService = async (tenantId: string) => {
  return await TenantModel.findById(tenantId);
};
