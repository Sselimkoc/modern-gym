import { useEffect } from "react";
import { Helmet } from "react-helmet";

export const useSEO = ({ title, description, keywords, image, url }) => {
  useEffect(() => {
    // Dinamik meta tags
    document.title = title ? `${title} | Modern Gym` : "Modern Gym - Your Fitness Journey";
  }, [title]);

  return (
    <Helmet>
      <title>{title ? `${title} | Modern Gym` : "Modern Gym - Your Fitness Journey"}</title>
      <meta name="description" content={description || "Find your perfect gym and start your fitness journey today."} />
      <meta name="keywords" content={keywords || "gym, fitness, training, health"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title || "Modern Gym"} />
      <meta property="og:description" content={description || "Find your perfect gym and start your fitness journey today."} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Modern Gym"} />
      <meta name="twitter:description" content={description || "Find your perfect gym and start your fitness journey today."} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}
      
      {/* Additional */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};

export default useSEO;