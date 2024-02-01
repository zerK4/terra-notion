import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

function NoAcctounView() {
  return (
    <div className="w-full border">
      <header className="flex h-20 items-center justify-between px-10 w-full">
        <div className="">
          <Image src={'/logo.svg'} alt="Terra" width={100} height={50} />
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button className="text-foreground bg-background">
              Login/Register
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Terra
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl text-foreground/50">
                  Side project at it&apos;s finest
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow transition-colors "
                  href="/login"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary border border-accent">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm">
                    Edit text like in Notion
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Fast and Efficient
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our application is designed to be fast and efficient, saving
                    you time and effort.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm">
                    Feature 2
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    User-Friendly Interface
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our user-friendly interface makes it easy for anyone to use,
                    regardless of their technical skills.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm">
                    Feature 3
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    High-Quality Results
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our application ensures high-quality results, making your
                    editing process a breeze.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NoAcctounView;
