// seeders/seed.ts
import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env';
import { UserModel } from '../models/User';   // ✅ import function to resolve tenant user model
import { TenantModel } from '../models/Tenant'; // ✅ you'll need to expose this too
import { Roles } from '../constants/roles';
import { logger } from '../utils/logger';
import bcrypt from 'bcrypt';


const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to MongoDB');

    const tenantSlug = 'main-org';
    let tenant = await TenantModel.findOne({ slug: tenantSlug });

    if (!tenant) {
      tenant = await TenantModel.create({
        name: 'Main Organization',
        slug: tenantSlug,
        isActive: true,
      });
      logger.info('Seeded tenant: Main Organization');
    }

    const adminEmail = 'admin@main.org';
    const User = UserModel(tenant._id.toString()); // ✅ resolve tenant user model

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: Roles.SUPER_ADMIN,
        tenantId: tenant._id.toString(),
        createdAt: new Date(),
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
