import React from "react";
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "gatsby";
import classNames from "classnames"

const navigation = [
  { name: '博客', href: '/posts', current: true },
  { name: '动态', href: '/about', current: false },
  { name: '收藏', href: '/collections', current: false },
  { name: '关于', href: '/about', current: false },
]

const Navbar = () => {
  return (
  <Disclosure as="nav" className="bg-white border-b lg:w-full lg:top-0 lg:left-0 lg:z-40">
    {({ open }) => (
      <>
        <div className="container px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between p-4 sm:p-0">
            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
              <div className="flex items-center flex-shrink-0 text-lg">
                <Link to="/">流水落花</Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block w-6 h-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="inset-y-0 right-0 items-center hidden pr-2 sm:flex sm:inset-auto sm:ml-6">
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