import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import React from "react";

const Result = (value, clearInput) => {
  return (
      <motion.div
          key={value.id}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0}}
          exit={{ opacity: 0}}

      >
          <Link to={`/producte/${value.x_categories}/${value.slug}`} className="dataItem" onClick={clearInput}>
              <p className="m-0">{value.title.rendered} / <small>{value.x_categories}</small> </p>
          </Link>
      </motion.div>
  )
}

export default Result
