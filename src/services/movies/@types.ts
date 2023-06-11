interface Movie {
  backdrop_path?: string;
  id: number | string;
  title?: string;
  release_date: number;
  vote_average: number;
}

interface Image {
  asset_id: string;
  public_id: string;
  url: string;
}