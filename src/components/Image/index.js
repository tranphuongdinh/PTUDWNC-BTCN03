import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.css";

export default function Image({ id, name, url, width, height }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div key={id} className={styles.wrapper}>
      {!loaded && <Skeleton variant="rectangle" className={styles.imageSkeleton} />}
      <img src={url} alt={name} onLoad={() => setLoaded(true)} className={styles.image} style={{ display: loaded ? "block" : "none" }} />
    </div>
  );
}
