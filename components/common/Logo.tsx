export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`font-serif text-2xl tracking-wide ${className ?? ''}`}>Svasti Production</div>
  );
}