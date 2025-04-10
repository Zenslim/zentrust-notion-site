import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const menuItems = [
  {
    title: 'Why',
    tagline: 'The soul of ZenTrust',
    links: [
      { name: 'Our Ethos', href: '/about' },
      { name: 'Philosophy of Regeneration', href: '/vision' },
      { name: 'The BPSS Compass', href: '/bpps' },
    ],
  },
  {
    title: 'How',
    tagline: 'Our way of walking',
    links: [
      { name: 'Research & Education', href: '/how/research' },
      { name: 'Syntropic Agriculture', href: '/how/farming' },
      { name: 'Healing Environments', href: '/how/wellness' },
      { name: 'Open Source & DAO', href: '/how/dao' },
    ],
  },
  {
    title: 'What',
    tagline: 'What we’re building',
    links: [
      { name: 'Duxbury Project', href: 'https://duxbury.zentrust.world', external: true },
      { name: 'Partnerships & Grants', href: '/what/partners' },
      { name: 'Programs & Pilots', href: '/what/programs' },
      { name: 'Blog & Reflections', href: 'https://blog.zentrust.world', external: true },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(null);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <a href="/" className="text-xl font-bold tracking-tight">ZenTrust</a>
      <div className="hidden md:flex space-x-8">
        {menuItems.map((item, idx) => (
          <div key={idx} className="relative group">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex items-center gap-1 font-medium text-gray-800 hover:text-black transition"
            >
              {item.title}
              <ChevronDown size={16} />
            </button>
            <div className={`absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg p-4 min-w-[220px] transition-all duration-200 ${
              open === idx ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            }`}>
              <p className="text-sm text-gray-500 mb-2">{item.tagline}</p>
              <ul className="space-y-1">
                {item.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      className="block text-sm hover:underline text-gray-800"
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
