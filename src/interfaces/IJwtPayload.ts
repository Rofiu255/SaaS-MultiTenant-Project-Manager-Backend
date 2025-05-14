/**
 * Structure of the decoded JWT payload.
 */
export interface IJwtPayload {
    userId: string;
    tenantId: string;
    email: string;
    role: string;
    permissions?: string[];  // Optional permissions array
    iat?: number;
    exp?: number;
}
