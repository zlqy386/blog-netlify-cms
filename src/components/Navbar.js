import React from "react";
import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "gatsby";
import classNames from "classnames"
import github from "../img/github-icon.svg";

const navigation = [
  { name: 'Blog', href: '/blog', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

const Navbar = () => {
  return (
  <Disclosure as="nav" className="bg-white border-b lg:w-full lg:top-0 lg:left-0 lg:z-40">
    {({ open }) => (
      <>
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative p-4 flex items-center justify-between sm:p-0">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center text-lg">
                <Link to="/">盈昃</Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="inset-y-0 right-0 flex items-center pr-2 hidden sm:flex sm:inset-auto sm:ml-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={'block px-6 py-4 border-b-2 border-transparent hover:border-black '}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Disclosure.Panel>
          <div className="space-y-1">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={'block py-2 text-center hover:bg-gray-100'}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
  )
}

export default Navbar;