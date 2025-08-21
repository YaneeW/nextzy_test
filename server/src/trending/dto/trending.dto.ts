interface TrendingItemDTO {
    id: number,
    backdrop_path: string,
    original_title?: string,
    title?: string,
    original_name?: string,
    name?: string,
    overview: string,
    vote_average: number,
    original_language: string
}



export interface TrendingDTO {
    page: number,
    results: TrendingItemDTO[],
    total_pages: number,
    total_results: number
}

