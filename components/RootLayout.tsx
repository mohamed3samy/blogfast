'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GridPattern from './GridPattern';
import Header from './Header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      layout
      style={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 8,
      }}
      className="relative flex flex-auto overflow-hidden bg-white"
    >
      <motion.div layout className="relative isolate flex w-full flex-col pt-9">
        <GridPattern
          className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-96}
          interactive
        />

        <Header />

        <main className="w-full flex-auto pt-14">{children}</main>
      </motion.div>
    </motion.div>
  );
};

export default RootLayout;
