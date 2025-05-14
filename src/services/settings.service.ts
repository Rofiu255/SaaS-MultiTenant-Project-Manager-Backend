import { SettingsModel } from '../models/settings.model';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { ISettings } from '@interface/ISettings'; // Ensure @interface alias works correctly

export class SettingsService {
  /**
   * Get settings for a specific tenant.
   */
  static async getSettings(tenantId: string): Promise<ISettings> {
    const settings = await SettingsModel.findOne({ tenantId }).lean(); // Use `.lean()` if you only want the plain JavaScript object

    if (!settings) {
      throw new NotFoundError(`Settings not found for tenant: ${tenantId}`);
    }

    return settings;
  }

  /**
   * Update or create settings for a specific tenant.
   */
  static async updateSettings(tenantId: string, updates: Partial<ISettings>): Promise<ISettings> {
    if (!tenantId) {
      throw new BadRequestError('Tenant ID is required');
    }

    const updatedSettings = await SettingsModel.findOneAndUpdate(
      { tenantId },
      { $set: updates },
      { new: true, upsert: true }
    ).lean(); // Use `.lean()` to return a plain object

    return updatedSettings;
  }

  /**
   * Delete settings (if needed).
   */
  static async deleteSettings(tenantId: string): Promise<void> {
    const deleted = await SettingsModel.findOneAndDelete({ tenantId });

    if (!deleted) {
      throw new NotFoundError(`Settings not found for tenant: ${tenantId}`);
    }
  }
}
