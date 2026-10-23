import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Package, Settings, User, UserRound } from 'lucide-react';
import { useAuth } from '../auth';

export default function AccountMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const onSignup = pathname === '/signup';

  if (!user) {
    return (
      <Link
        to="/signup"
        className={`flex items-center gap-1.5 rounded-lg border-2 no-underline p-1.5 transition-colors min-[480px]:gap-2 min-[480px]:px-3 min-[480px]:py-1.5 ${
          onSignup
            ? 'border-accent bg-accent text-white hover:bg-accent-dark'
            : 'border-accent bg-white text-accent hover:bg-accent/5'
        }`}
      >
        <User size={18} className={onSignup ? 'text-white' : 'text-accent'} />
        <span className="hidden min-[1280px]:flex flex-col text-left leading-tight">
          <span className={`text-[9px] uppercase font-black ${onSignup ? 'text-white' : 'text-accent'}`}>Create</span>
          <span className={`text-xs font-extrabold ${onSignup ? 'text-white' : 'text-accent'}`}>my account</span>
        </span>
      </Link>
    );
  }

  const firstName = user.name.trim().split(/\s+/)[0];

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };

  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 160);
  };

  const signOut = async () => {
    setOpen(false);
    await logout();
    navigate('/');
  };

  const itemClass = 'flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-bold text-primary no-underline bg-transparent border-none cursor-pointer hover:bg-primary/5';

  return (
    <div className="relative z-[1200]" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 border-2 border-accent bg-white text-accent py-1.5 px-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/5"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
          <UserRound size={14} />
        </span>
        <span className="hidden min-[1280px]:flex flex-col text-left leading-tight">
          <span className="text-[9px] text-accent uppercase font-black">Welcome</span>
          <span className="text-xs font-extrabold text-accent">{firstName}</span>
        </span>
      </button>

      <div className={`absolute right-0 top-full z-[1100] pt-2 ${open ? 'block' : 'hidden'}`}>
        <div role="menu" className="w-48 overflow-hidden rounded-xl border border-primary/10 bg-white py-1 shadow-[0_16px_40px_rgb(2_70_46/0.16)]">
          <Link to="/profile" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
            <User size={15} /> Profile
          </Link>
          <Link to="/orders" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
            <Package size={15} /> Orders
          </Link>
          <Link to="/settings" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
            <Settings size={15} /> Settings
          </Link>
          <button type="button" role="menuitem" onClick={signOut} className={`${itemClass} text-accent`}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
