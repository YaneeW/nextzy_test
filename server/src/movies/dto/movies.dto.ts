interface MoviesItemDTO {
    id: number,
    backdrop: string,
    original_name: string,
    name: string,
    overview: string,
    vote_average: number,
    original_language: string
}



export interface MoviesDTO {
    page: number,
    results: MoviesItemDTO[],
    total_pages: number,
    total_results: number
}

