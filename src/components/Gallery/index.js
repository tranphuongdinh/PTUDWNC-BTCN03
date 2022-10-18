import { Button, Container, FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "../Image";
import styles from "./styles.module.css";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const ref = useRef(null);

  const getData = async () => {
    console.log("getData");
    const promise = await fetch("https://api.imgflip.com/get_memes");
    const res = await promise.json();
    const newData = res?.data?.memes || [];
    setData([...data, ...newData]);
  };

  const handleScroll = async () => {
    if (infiniteScroll) {
      const bottom = ref.current.getBoundingClientRect().bottom - 200 <= window.innerHeight;
      if (bottom) {
        await getData();
      }
    }
  };

  const handleInfinite = () => {
    setInfiniteScroll(!infiniteScroll);
  };

  useEffect(() => {
    if (!data.length) getData();
  });

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <div className={styles.menu}>
        <span className={styles.title}>MEME GALLERY</span>
        <FormControlLabel control={<Switch onChange={handleInfinite} checked={infiniteScroll} />} label="Infinite Scroll" />
        <Button disabled={infiniteScroll} variant="contained" onClick={() => getData()}>
          Load More
        </Button>
      </div>
      <Container ref={ref} className={styles.container}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {data.map((image) => (
              <Image {...image} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
    </>
  );
}
