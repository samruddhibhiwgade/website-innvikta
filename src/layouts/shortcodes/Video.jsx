function Video({ title, width = "100%", height = "auto", src, align = "center", ...rest }) {
  let wrapperClass = "my-6特色-video clear-both";
  let videoClass = "overflow-hidden rounded-xl shadow-md";
  
  if (align === "left") {
    wrapperClass = "float-left mr-6 mb-4 clear-none";
  } else if (align === "right") {
    wrapperClass = "float-right ml-6 mb-4 clear-none";
  } else {
    wrapperClass = "flex flex-col items-center my-6 clear-both mx-auto";
    videoClass += " mx-auto";
  }

  // Handle case where src starts with slash or backend path, or local video
  const videoSrc = src.match(/^(https?:|\/)/) ? src : `/videos/${src}`;

  return (
    <div className={wrapperClass} style={{ width: width, maxWidth: "100%" }}>
      <video
        className={videoClass}
        style={{ width: "100%", height: height }}
        controls
        {...rest}
      >
        <source
          src={videoSrc}
          type="video/mp4"
        />
        {title}
      </video>
      {title && (
        <span className="block text-center text-xs text-slate-400 mt-2 font-medium">
          {title}
        </span>
      )}
    </div>
  );
}

export default Video;
