import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";

const Video = () => {
  return  <section className="container relative mx-auto mb-12 max-w-screen-sm px-8 py-16 text-left md:text-center">
  <p className="mb-8 mt-2 text-4xl font-bold">
    Like seriously, it&apos;s THIS easy
  </p>
  <AspectRatio ratio={16 / 9}>
    <video width="800" height="600" poster="/opengraph-image.png" controls>
      <source src="/assets/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </AspectRatio>
</section>

};

export default Video;
