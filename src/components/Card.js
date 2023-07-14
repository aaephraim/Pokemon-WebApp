import React, { useState } from "react";
import { motion } from "framer-motion";

import "./Card.css";

const Card = ({
  name,
  id,
  imgSrc,
  hp,
  exp,
  attack,
  defense,
  speed,
  types,
  abilities,
}) => {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <>
      <div className="card-container">
        <motion.div
          transition={{ layout: { duration: 0.5, type: "spring" } }}
          layout="size"
          className="card"
          key={id}
          
          onClick={() => {
            SetIsOpen(!isOpen);
          }}
          style={{
            boxShadow: "0px 10px 30px rgba(255,255,255, 0.5)",
            height: "max-content",
          }}
        >
          <motion.div layout className="main-display">
            <div className="top-line">
              <h5 className="hp">
                HP : <span>{hp}</span>
              </h5>
              <h5 className="exp">
                EXP : <span>{exp}</span>
              </h5>
            </div>
            <div className="img-container">
              <img alt={`${name}`} src={`${imgSrc}`} />
            </div>
            <p className="name">
              <strong>
                {name}
              </strong>
            </p>
          </motion.div>
          {isOpen &&  (
            <motion.div
              transition={{ opacity: { duration: 1 } }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className="info"
            >
              <div className="properties">
                <div className="types">
                  {types.map((type) => {
                    return <span>{type.type.name}</span>;
                  })}
                </div>
                <div className="abilities">
                  <h3>ABILITIES</h3>
                  {abilities.map((ability) => {
                    return <span>{ability.ability.name}</span>;
                  })}
                </div>
              </div>

              <div className="stats">
                <div>
                  <h3>{attack}</h3>
                  <p>Attack</p>
                </div>
                <div>
                  <h3>{defense}</h3>
                  <p>Defense</p>
                </div>
                <div>
                  <h3>{speed}</h3>
                  <p>Speed</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        <div></div>
      </div>
    </>
  );
};

export default Card;
