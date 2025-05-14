// interfaces/ITenant.ts

export interface ITenant {
    _id: string;             // Unique identifier (you can use ObjectId or string)
    name: string;            // Tenant's name
    ownerEmail: string;      // Owner's email address (or other fields relevant to your tenant)
    createdAt: Date;         // When the tenant was created
    updatedAt: Date;         // When the tenant was last updated
  }
  