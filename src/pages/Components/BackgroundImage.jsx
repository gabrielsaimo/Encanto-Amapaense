import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import backgroundImage from "../../assets/fundo.webp";

export default function BackgroundImage() {
  return (
    <LazyLoadImage
      src={backgroundImage}
      effect="blur"
      alt="background"
      style={{ width: "98vw", zIndex: 0, position: "relative", top: 0 }}
    />
  );
}
