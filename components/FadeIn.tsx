'use client';

import React, { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: '0px 0px -200px' };

const FadeIn = (props: React.ComponentPropsWithoutRef<typeof motion.div>) => {
  let shouldReduceMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      {...props}
    />
  );
};

export default FadeIn;
