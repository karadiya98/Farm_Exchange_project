import { Minus, Plus } from 'lucide-react';
import { useCart } from '../cart';

export default function CartQtyControl({
  productId,
  className = '',
  size = 'md',
  stopLink = false,
}) {
  const { getQty, addItem, setQty } = useCart();
  const qty = getQty(productId);

  const stop = (event) => {
    if (!stopLink) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const pad = size === 'sm' ? 'py-2 text-[11px]' : 'py-3 text-[13px]';
  const icon = size === 'sm' ? 12 : 14;

  if (qty <= 0) {
    return (
      <button
        type="button"
        onClick={(event) => {
          stop(event);
          addItem(productId, 1);
        }}
        className={`w-full cursor-pointer border-none bg-primary font-extrabold uppercase text-white transition-colors hover:bg-primary/90 ${pad} ${className}`}
      >
        Add to cart
      </button>
    );
  }

  return (
    <div
      className={`grid w-full grid-cols-[1fr_auto_1fr] items-stretch border border-primary bg-primary text-white ${className}`}
      onClick={stop}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={(event) => {
          stop(event);
          setQty(productId, qty - 1);
        }}
        className={`flex cursor-pointer items-center justify-center border-none bg-transparent text-white transition-colors hover:bg-white/10 ${pad}`}
      >
        <Minus size={icon} strokeWidth={2.5} />
      </button>
      <span className={`flex min-w-[2.25rem] items-center justify-center px-2 font-black tabular-nums ${pad}`}>
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={(event) => {
          stop(event);
          setQty(productId, qty + 1);
        }}
        className={`flex cursor-pointer items-center justify-center border-none bg-transparent text-white transition-colors hover:bg-white/10 ${pad}`}
      >
        <Plus size={icon} strokeWidth={2.5} />
      </button>
    </div>
  );
}
