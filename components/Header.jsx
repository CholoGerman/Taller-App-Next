'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import SesionPanel from './SesionPanel';

const navigation = [
  { name: 'Listado de locales', href: '/home/#ListadoLocales' },
  { name: 'Listado de platos', href: '/home/#ListadoPlatos' },
  { name: 'Alta Locales', href: '/AltaLocales' },
  { name: 'Alta Platos', href: '/AltaPlatos' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-md dark:bg-background-dark/80 transition-all duration-300">
      <nav
        aria-label="Global"
        className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6 lg:px-10"
      >
        <div className="flex items-center gap-3">
          <Link href="/home" aria-label="Rutas del Sabor - Home" className="-m-1.5 p-1.5 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Rutas del Sabor"
                width={48}
                height={48}
              />
         

            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-sm font-bold text-[#181411] dark:text-slate-100">
                Rutas del <span className="text-orange-500">Sabor</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Comunidad Gastronómica
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100/60"
            aria-label="Open main menu"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center lg:gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-orange-500 transition-colors group"
            >
              {item.name}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex">
            <SesionPanel />
          </div>
        </div>
      </nav>

      {/* Mobile dialog / slide-over */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/20" aria-hidden="true" />

        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm">
          <Dialog.Panel className="h-full overflow-y-auto bg-white dark:bg-slate-900 p-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/home" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="h-8 w-8 relative">
                  <Image
                    src="/images/logo.png"   
                    alt="Rutas del Sabor"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="sr-only">Rutas del Sabor</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-orange-500 hover:bg-gray-100/60"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6">
                <div className="space-y-3">
                  <div className="mt-2">
                    <SesionPanel />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
}