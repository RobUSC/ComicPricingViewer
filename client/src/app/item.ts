export interface Item {
  _id?: string
  publisher?: string
  series_title?: string
  issue_number?: string
  high?: string
  low?: string
  comps?: comps
  price_data?: price_data
  isShown?: boolean
}


export interface price_data {
  pricing_summary?: pricing_summary

}


export interface pricing_summary {
  mean?: number
  median?: number
  mode?: number
  high?: number
  low?: number
}

export interface comps {
  exact_matches?: listing[]
  fuzzy_matches?: listing[]
  ebay_matches?: listing[]
}

export interface listing {
  title?: string
  url?: string
  price?: number
  currency?: string
  galleryUrl?: string
}
