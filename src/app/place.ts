export interface Place {
  placeName: string;
  coordinates: string;
  imageUrl: string;
  description: string;
  region: string;
  tripType: string;
  budget: number;
  attractions: string[];
  _id?: string;
}
