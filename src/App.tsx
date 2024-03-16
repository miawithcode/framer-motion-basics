import {
  useScroll,
  motion,
  useInView,
  useAnimation,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const svgIconVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgb(252, 211, 77, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgb(252, 211, 77, 1)',
  },
};

const App = () => {
  const { scrollYProgress: completionProgress } = useScroll();

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  });

  // paragraph text animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ['-100%', '0%']
  );
  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ['100%', '0%']
  );

  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 p-10 gap-10"
      >
        {/* Fade Up/Down */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-200 aspect-square rounded-lg flex justify-center items-center gap-4"
        >
          <motion.div
            className="w-10 h-10 md:w-20 md:h-20 bg-white rounded-lg"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          ></motion.div>
          <motion.div
            className="w-10 h-10 md:w-20 md:h-20 bg-white rounded-full"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          ></motion.div>
        </motion.div>

        {/* Shape Shifting/Keyframe */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-200 aspect-square rounded-lg flex justify-center items-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-rose-400"
            animate={{
              scale: [1, 2, 2, 1],
              rotate: [0, 90, 90, 0],
              borderRadius: ['10%', '10%', '50%', '10%'],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            }}
          ></motion.div>
        </motion.div>

        {/* Hover & Tap */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-200 aspect-square rounded-lg flex justify-center items-center gap-10"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, backgroundColor: '#059669' }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className="bg-emerald-600 w-1/2 py-4 rounded-lg text-sm text-gray-100 font-light tracking-wide"
          >
            Button
          </motion.button>
        </motion.div>

        {/* Drag */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-200 aspect-square rounded-lg flex justify-center items-center gap-10"
        >
          <motion.div
            className="w-1/3 h-1/3 bg-blue-500 rounded-2xl cursor-grab flex justify-center items-center text-slate-100 text-sm"
            drag
            dragConstraints={{
              top: -100,
              right: 100,
              bottom: 100,
              left: -100,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          >
            Drag
          </motion.div>
        </motion.div>

        {/* Scroll Progress */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-200 aspect-square rounded-lg flex justify-center items-center gap-10"
        >
          <motion.div className="w-20 md:w-40 aspect-square bg-gray-500 rounded-xl">
            <motion.div
              className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
              style={{ scaleY: completionProgress }}
            ></motion.div>
          </motion.div>
        </motion.div>

        {/* SVG Animation */}
        <motion.div
          variants={gridSquareVariants}
          className="bg-slate-200 aspect-square rounded-lg flex justify-center items-center gap-10"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgIconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: {
                  duration: 2,
                  ease: 'easeInOut',
                  delay: 1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: 'easeIn',
                  delay: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 1,
                },
              }}
            />
          </motion.svg>
        </motion.div>
      </motion.section>

      {/* Page Scroll Animation */}
      <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1
          className="text-5xl tracking-wide text-zinc-800 text-center"
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{ delay: 0.3 }}
        >
          Keep Scrolling
        </motion.h1>
        <motion.p
          style={{ translateX: paragraphOneValue }}
          className="text-zinc-600 font-thin text-2xl w-2/3 mx-auto"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          sequi neque vel iste, dignissimos nihil, commodi, hic ea nostrum
          voluptates modi. Accusantium facere ex aliquam, maiores modi voluptate
          totam repellat!
        </motion.p>
        <motion.p
          style={{ translateX: paragraphTwoValue }}
          className="text-zinc-600 font-thin text-2xl w-2/3 mx-auto"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          sequi neque vel iste, dignissimos nihil, commodi, hic ea nostrum
          voluptates modi. Accusantium facere ex aliquam, maiores modi voluptate
          totam repellat!
        </motion.p>
      </section>
    </div>
  );
};
export default App;
