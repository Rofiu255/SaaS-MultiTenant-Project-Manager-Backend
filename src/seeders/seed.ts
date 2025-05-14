// seeders/seed.ts

import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env';
import User from '../models/User';
import Tenant from '../models/Tenant';
import { Roles } from '../constants/roles';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to MongoDB');

    // 1. Create default tenant
    const tenantSlug = 'main-org';
    let tenant = await Tenant.findOne({ slug: tenantSlug });

    if (!tenant) {
      tenant = await Tenant.create({
        name: 'Main Organization',
        slug: tenantSlug,
        isActive: true,
      });
      logger.info('Seeded tenant: Main Organization');
    }

    // 2. Create super admin user
    const adminEmail = 'admin@main.org';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await User.create({
        tenantId: tenant._id,
        email: adminEmail,
        password: hashedPassword,
        role: Roles.SUPER_ADMIN,
        fullName: 'Super Admin',
        isActive: true,
      });

      logger.info('Seeded super admin user');
    }

    logger.info('✅ Database seeding complete');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seed();
