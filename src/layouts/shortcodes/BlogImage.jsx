import React from 'react';

function BlogImage({ src, alt, width = "100%", align = "center", title }) {
  let wrapperClass = "my-6 clear-both";
  let imgClass = "rounded-2xl shadow-md";
  
  if (align === "left") {
    wrapperClass = "float-left mr-6 mb-4 clear-none";
  } else if (align === "right") {
    wrapperClass = "float-right ml-6 mb-4 clear-none";
  } else {
    wrapperClass = "flex flex-col items-center my-6 clear-both";
    imgClass += " mx-auto";
  }
  
  return (
    <div className={wrapperClass} style={{ width: width, maxWidth: "100%" }}>
      <img src={src} alt={alt || title} className={imgClass} style={{ width: "100%", height: "auto" }} />
      {(alt || title) && (
        <span className="block text-center text-xs text-slate-400 mt-2 font-medium">
          {alt || title}
        </span>
      )}
    </div>
  );
}

export default BlogImage;
