export interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
  meta: string;
  featured?: boolean;
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Sunlit 2BHK",
    location: "Indiranagar, Bengaluru",
    price: "₹28,000",
    type: "Home",
    image: "/images/home-apartment.jpg",
    meta: "2 bed · 2 bath · Furnished",
    featured: true,
  },
  {
    id: "2",
    title: "Green View PG",
    location: "Kothrud, Pune",
    price: "₹12,500",
    type: "PG",
    image: "/images/pg-room.jpg",
    meta: "Single room · Meals · Wi-Fi",
  },
  {
    id: "3",
    title: "City Shared Room",
    location: "HSR Layout, Bengaluru",
    price: "₹9,000",
    type: "Shared room",
    image: "/images/shared-room.jpg",
    meta: "Shared room · Furnished · Wi-Fi",
  },
  {
    id: "4",
    title: "Parkside 1BHK",
    location: "Baner, Pune",
    price: "₹21,000",
    type: "Home",
    image: "/images/parkside-1bhk.jpg",
    meta: "1 bed · 1 bath · Semi-furnished",
  },
  {
    id: "5",
    title: "Metro Heights PG",
    location: "Koramangala, Bengaluru",
    price: "₹14,000",
    type: "PG",
    image: "/images/metro-pg-room.jpg",
    meta: "Single room · Housekeeping · Wi-Fi",
  },
  {
    id: "6",
    title: "Lakeview Shared Home",
    location: "Viman Nagar, Pune",
    price: "₹10,500",
    type: "Shared room",
    image: "/images/shared-room.jpg",
    meta: "Shared room · 2 flatmates · Furnished",
  },
];
