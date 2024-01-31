import React from "react";
import { motion } from "framer-motion";

function VideoModal({ showModal, setShowMadal }) {
  const animationVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const animationTransition = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };
  return (
    <div>
      <div>
        {showModal ? (
          <div>
            <div className=" overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="container flex justify-center items-center ">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={animationTransition}
                  style={{
                    width: "90%", // Set the width to 98%
                    height: "90%", // Center vertically

                    // Center horizontally
                    transform: "translate(-50%, -50%)", // Center both horizontally and vertically
                    borderRadius: "8px",
                  }}
                  className=" flex justify-center"
                >
                  {/*content*/}

                  <div className="p-3  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* Head */}
                    <div className="">
                      <img
                        src="https://media.istockphoto.com/id/1196172395/photo/in-the-photo-studio-with-professional-equipment-portrait-of-the-famous-photographer-holding.jpg?s=612x612&w=0&k=20&c=utO4aHRyA5ZUAYxbk9NelmhR1_E5-AOWUWcqDMP-NXE="
                        alt=""
                        className="w-[90%] h-[90]"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default VideoModal;
