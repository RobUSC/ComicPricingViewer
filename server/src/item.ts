import * as mongodb from "mongodb";

export interface item {
  _id?: mongodb.ObjectId;
  publisher: string;
  series_title: string;
  issue_number: string;
  graded: string;
  'Professional Grader': string,
  Grade: string;
  high: listing;
  low: listing;
  comps: {
    exact_matches: [listing],
    fuzzy_matches: [listing],
    ebay_matches: [listing]
  },
  price_data: {
    pricing_summary: {
      mean: number;
      median: number;
      mode: number;
      low: number;
      high: number;
    }
  }
}

export interface listing {
  _id?: mongodb.ObjectId;
  title: string;
  url: string;
  price: number;
  currency: string;
  galleryUrl: string;
}
