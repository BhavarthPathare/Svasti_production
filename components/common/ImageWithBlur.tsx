import Image, { ImageProps } from 'next/image';

export default function ImageWithBlur(props: ImageProps) {
  return (
    <Image {...props} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2Zy8+" />
  );
}