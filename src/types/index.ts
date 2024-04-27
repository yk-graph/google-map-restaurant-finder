export type ShopItem = google.maps.places.PlaceResult & {
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
};
