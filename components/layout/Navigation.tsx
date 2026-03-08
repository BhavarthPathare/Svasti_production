import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex gap-6 text-sm">
      <Link href="/" className="hover:opacity-80">Home</Link>
      <Link href="/about" className="hover:opacity-80">About</Link>
      <Link href="/gallery" className="hover:opacity-80">Gallery</Link>
      <Link href="/contact" className="hover:opacity-80">Contact</Link>
    </nav>
  );
}