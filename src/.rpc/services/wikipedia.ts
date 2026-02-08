interface SearchResult {
    title: string;
    snippet: string;
    url: string;
}

export async function search(query: string): Promise<SearchResult[]> {
    const results: any[] = await fetch(
        `https://nl.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json`,
    )
        .then((response) => response.json())
        .then((data) => data.query.search);

    return results.map((result) => ({
        title: result.title,
        snippet: result.snippet,
        url: `https://nl.wikipedia.org/wiki/${encodeURIComponent(result.title.replace(/ /g, "_"))}`,
    }));
}
