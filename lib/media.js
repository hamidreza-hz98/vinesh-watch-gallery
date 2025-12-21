export const setFullscreenImages = (images) => {
  const final = [];

  images.map((image) => final.push((image.path)));

  return final;
};
