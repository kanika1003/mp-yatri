const WIKIPEDIA_API =
  "https://en.wikipedia.org/w/rest.php/v1";

const SUMMARY_API =
  "https://en.wikipedia.org/api/rest_v1/page/summary";

export async function searchWikipedia(query) {
  if (!query || !query.trim()) {
    return [];
  }

  try {
    const url =
      `${WIKIPEDIA_API}/search/page` +
      `?q=${encodeURIComponent(query)}` +
      `&limit=12`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Wikipedia search failed");
    }

    const data = await response.json();

    return data.pages || [];
  } catch (error) {
    console.error("Wikipedia search error:", error);
    throw error;
  }
}


export async function getWikipediaPage(title) {
  if (!title) {
    return null;
  }

  try {
    const url =
      `${SUMMARY_API}/${encodeURIComponent(title)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Wikipedia page could not be loaded");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Wikipedia page error:", error);
    throw error;
  }
}