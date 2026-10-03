import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

function DestinationImage({ destination, className = "" }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const findImage = async () => {
      setLoading(true);
      setImageUrl("");

      try {
        const query = `${destination.name} ${destination.city} Madhya Pradesh`;

        const params = new URLSearchParams({
          action: "query",
          format: "json",
          origin: "*",
          generator: "search",
          gsrsearch: query,
          gsrnamespace: "6",
          gsrlimit: "10",
          prop: "imageinfo",
          iiprop: "url",
          iiurlwidth: "900",
        });

        const response = await fetch(
          `https://commons.wikimedia.org/w/api.php?${params}`
        );

        if (!response.ok) {
          throw new Error("Image API failed");
        }

        const data = await response.json();

        const pages = data.query?.pages
          ? Object.values(data.query.pages)
          : [];

        if (pages.length > 0) {
          const firstImage = pages.find(
            (page) =>
              page.imageinfo &&
              page.imageinfo[0]?.thumburl
          );

          if (
            firstImage &&
            !cancelled
          ) {
            setImageUrl(
              firstImage.imageinfo[0].thumburl
            );
          }
        }
      } catch (error) {
        console.error(
          "Wikimedia image error:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    findImage();

    return () => {
      cancelled = true;
    };
  }, [destination]);

  if (loading) {
    return (
      <div
        className={`destination-image-loading ${className}`}
      >
        <MapPin size={30} />
        <span>Loading photo...</span>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div
        className={`destination-image-fallback ${className}`}
      >
        <MapPin size={32} />
        <span>{destination.name}</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={destination.name}
      className={className}
      onError={() => {
        setImageUrl("");
      }}
    />
  );
}

export default DestinationImage;