import bcrypt from 'bcryptjs';
import User from './models/User.js';

export const ADMIN_EMAIL = 'farmexchangeadmin@gmail.com';
export const ADMIN_PASSWORD = 'admin78600';
const ADMIN_NAME = 'Farm Exchange Admin';

export function isAdminEmail(email) {
  return String(email || '').trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/** Create or refresh the desk admin account used for /admin. */
export async function ensureAdminUser() {
  const email = ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const existing = await User.findOne({ email });

  if (!existing) {
    const created = await User.create({
      name: ADMIN_NAME,
      email,
      passwordHash,
      role: 'admin',
    });
    console.log(`Admin account ready: ${email}`);
    return created;
  }

  existing.name = ADMIN_NAME;
  existing.role = 'admin';
  existing.passwordHash = passwordHash;
  await existing.save();
  console.log(`Admin account updated: ${email}`);
  return existing;
}

/**
 * If this login is the desk admin, sync the account then authenticate.
 * Lets production work even when the server was never restarted after deploy.
 */
export async function tryAdminLogin(email, password) {
  if (!isAdminEmail(email)) return null;
  const entered = String(password || '');
  // Exact pass, plus common typo with an extra trailing zero from mobile keyboards
  const ok = entered === ADMIN_PASSWORD || entered === `${ADMIN_PASSWORD}0`;
  if (!ok) return null;
  return ensureAdminUser();
}
