function ImageGallery({ images }) {
  return (
    <div>
      {images.map(img => (
        <img
          key={img.id}
          src={img.base64}
          alt={`image-${img.id}`}
          style={{ width: '200px', height: 'auto', margin: '10px' }}
        />
      ))}
    </div>
  );
}
export default  ImageGallery