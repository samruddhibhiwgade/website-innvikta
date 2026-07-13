"use client";
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt || ""}
      {...rest}
      src={imgSrc}
      onError={() => {
        const defaultFallback = "/images/logo.png";
        const nextFallback = fallback || defaultFallback;
        if (imgSrc !== nextFallback) {
          setImgSrc(nextFallback);
        }
      }}
    />
  );
};

export default ImageFallback;
