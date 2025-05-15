import { SettingsModel } from '../models/settings.model';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { ISettings } from '../interfaces/ISettings';

/**
 * Get settings for a specific tenant.
 */
export const getSettingsService = async (tenantId: string): Promise<ISettings> => {
  if (!tenantId) {
    throw new BadRequestError('Tenant ID is required');
  }

  const settings = await SettingsModel.findOne({ tenantId });

  if (!settings) {
    throw new NotFoundError(`Settings not found for tenant: ${tenantId}`);
  }

  return settings;
};

/**
 * Update or create settings for a specific tenant.
 */
export const updateSettingsService = async (
  tenantId: string,
  updates: Partial<ISettings>
): Promise<ISettings> => {
  if (!tenantId) {
    throw new BadRequestError('Tenant ID is required');
  }

  const updatedSettings = await SettingsModel.findOneAndUpdate(
    { tenantId },
    { $set: updates },
    { new: true, upsert: true }
  );

  if (!updatedSettings) {
    throw new NotFoundError(`Unable to update settings for tenant: ${tenantId}`);
  }

  return updatedSettings;
};

/**
 * Delete settings for a specific tenant (optional).
 */
export const deleteSettingsService = async (tenantId: string): Promise<void> => {
  if (!tenantId) {
    throw new BadRequestError('Tenant ID is required');
  }

  const deleted = await SettingsModel.findOneAndDelete({ tenantId });

  if (!deleted) {
    throw new NotFoundError(`Settings not found for tenant: ${tenantId}`);
  }
};
