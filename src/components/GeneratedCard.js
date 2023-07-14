import React, { useState } from "react";
import { motion } from "framer-motion";

import "./Card.css";
const GeneratedCard = ({ random, loading, clickFunc }) => {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <>
      {loading ? (
        <h1 className="load">Loading Please Wait..!!</h1>
      ) : (
        <div className="card-container">
          <motion.div
            transition={{ layout: { duration: 0.5, type: "spring" } }}
            layout="size"
            className="card"
            key={random.id}
            onClick={() => {
              SetIsOpen(!isOpen);
            }}
            style={{
              boxShadow: "0px 10px 30px rgba(255,255,255, 0.5)",
              height: "max-content",
            }}
          >
            {/* {console.log(random, "random")} */}
            <motion.div layout className="main-display">
              <div className="top-line">
                <h5 className="hp">
                  HP :{" "}
                  <span>{random.stats ? random.stats[0].base_stat : ""}</span>
                </h5>
                <h5 className="exp">
                  EXP : <span>{random.base_experience}</span>
                </h5>
              </div>
              <img
                alt={`${random.name}`}
                src={`${
                  random.sprites
                    ? random.sprites.other.dream_world.front_default
                    : ""
                }`}
              />
              <p className="name">
                <strong>
                  {random.id}
                  {random.name}
                </strong>
              </p>
            </motion.div>
            {isOpen && (
              <motion.div
              transition={{ opacity: { duration: 1 } }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout 
              className="info">
                <div className="properties">
                  <div className="types">
                    {random.types
                      ? random.types.map((type) => {
                          return <span>{type.type.name}</span>;
                        })
                      : ""}
                  </div>
                  <div className="abilities">
                    <h3>ABILITIES</h3>
                    {random.abilities
                      ? random.abilities.map((ability) => {
                          return <span>{ability.ability.name}</span>;
                        })
                      : ""}
                  </div>
                </div>
                <div className="stats">
                  <div>
                    <h3>{random.stats ? random.stats[1].base_stat : ""}</h3>
                    <p>Attack</p>
                  </div>
                  <div>
                    <h3>{random.stats ? random.stats[2].base_stat : ""}</h3>
                    <p>Defense</p>
                  </div>
                  <div>
                    <h3>{random.stats ? random.stats[5].base_stat : ""}</h3>
                    <p>Speed</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default GeneratedCard;
