interface ParkType {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  altText: string;
}

const parkTypes: ParkType[] = [
  {
    id: "water-parks",
    title: "Dog water parks",
    description: "Many hosts have added water features like pools and/or are nearby lakes or rivers.",
    href: "/listings/water-parks",
    imageUrl: "/api/placeholder/582/400",
    altText: "Dog water parks thumbnail"
  },
  {
    id: "hiking-trails", 
    title: "Dog hiking trails",
    description: "Some of our best spots have hiking trails in wonderful natural settings.",
    href: "/listings/hiking-trails",
    imageUrl: "/api/placeholder/582/400",
    altText: "Dog hiking trails thumbnail"
  },
  {
    id: "indoor-parks",
    title: "Indoor dog parks",
    description: "A good alternative to do activities with your dogs on a rainy day and unpleasant weather in general.",
    href: "/listings/indoor-dog-parks", 
    imageUrl: "/api/placeholder/582/400",
    altText: "Indoor dog parks thumbnail"
  },
  {
    id: "fenced-parks",
    title: "Fully fenced dog parks",
    description: "Very popular choice, perfect to contain your dogs if they are escape artists or if they are not good at recall.",
    href: "/listings/fenced-parks",
    imageUrl: "/api/placeholder/582/400", 
    altText: "Fully fenced dog parks thumbnail"
  },
  {
    id: "dog-beaches",
    title: "Dog beaches",
    description: "Perfect for dogs who love swimming and playing in the sand.",
    href: "/listings/dog-beaches",
    imageUrl: "/api/placeholder/582/400",
    altText: "Dog beaches thumbnail"
  },
  {
    id: "agility-parks",
    title: "Dog agility parks",
    description: "Places where your dog can get their daily exercise by running around and playing on agility objects.",
    href: "/listings/agility-parks",
    imageUrl: "/api/placeholder/582/400",
    altText: "Dog agility parks thumbnail"
  },

  {
    id: "fields",
    title: "Dog fields",
    description: "Many of the listed spots are large pastures, fields and have farm animals that can be sighted.",
    href: "/listings/dog-parks-fields",
    imageUrl: "/api/placeholder/582/400",
    altText: "Dog fields thumbnail"
  },
  {
    id: "small-dog-parks",
    title: "Small dog parks",
    description: "Specially designed spaces for smaller breeds to play safely with dogs their own size.",
    href: "/listings/small-dog-parks",
    imageUrl: "/api/placeholder/582/400",
    altText: "Small dog parks thumbnail"
  },
  {
    id: "swimming-pools",
    title: "Dog swimming pools", 
    description: "Perfect for dogs who love water activities and need to cool off during hot summer days.",
    href: "/listings/swimming-pools",
    imageUrl: "/api/placeholder/582/400",
    altText: "Dog swimming pools thumbnail"
  }
];

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path 
      d="M.571 8H15.43M11.429 12l4-4-4-4" 
      stroke="#3AA648" 
      strokeWidth="1.143" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export function ParkTypes() {
  return (
    <div style={{
      backgroundColor: "var(--bb-bg-surface)",
      padding: "4rem 0"
    }}>
      <div style={{
        maxWidth: "1200px", 
        margin: "0 auto",
        padding: "0 2rem"
      }}>
        <h2 style={{
          fontSize: "36px",
          fontWeight: 600,
          color: "var(--bb-text-primary)",
          marginBottom: "1rem",
          textAlign: "center"
        }}>
          What types of private dog parks are available
        </h2>
        
        <p style={{
          fontSize: "18px",
          color: "var(--bb-text-secondary)",
          marginBottom: "3rem",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto 3rem auto",
          lineHeight: "1.6"
        }}>
          Sniffspot has different types of private dog parks to allow any dog to find their ideal spot!
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem"
        }}>
          {parkTypes.map((parkType) => (
            <a
              key={parkType.id}
              href={parkType.href}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--bb-bg-surface)",
                borderRadius: "var(--bb-radius-card)",
                overflow: "hidden",
                border: "1px solid var(--bb-border)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: "var(--bb-shadow-card)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--bb-shadow-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "var(--bb-shadow-card)";
              }}
            >
              <div style={{
                width: "100%",
                height: "250px",
                backgroundColor: "#E5E7EB",
                position: "relative"
              }}>
                <img
                  src={parkType.imageUrl}
                  alt={parkType.altText}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              
              <div style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1
              }}>
                <div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--bb-text-primary)",
                    marginBottom: "0.5rem",
                    margin: 0
                  }}>
                    {parkType.title}
                  </h3>
                  
                  <p style={{
                    fontSize: "14px",
                    color: "var(--bb-text-secondary)",
                    lineHeight: "1.5",
                    marginBottom: "1rem",
                    margin: "0.5rem 0 1rem 0"
                  }}>
                    {parkType.description}
                  </p>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#3AA648",
                  fontSize: "14px",
                  fontWeight: 500
                }}>
                  Explore
                  <ArrowIcon />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}