export function isAdmin(user: { email?: string | null } | null): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !user?.email) return false;
  return user.email.toLowerCase() === adminEmail.toLowerCase();
}
