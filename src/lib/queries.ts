export const SONGS_QUERY = `
  *[_type == "song"]{
    _id,
    title,
    artist,
    roles,
    spotifyUrl,
    "coverUrl": cover.asset->url
  }
`;
