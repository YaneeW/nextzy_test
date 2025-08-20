interface TvItemDTO {
    id: number,
    backdrop: string,
    original_name: string,
    name: string,
    overview: string,
    vote_average: number,
    original_language: string
}



export interface TvDTO {
    page: number,
    results: TvItemDTO[],
    total_pages: number,
    total_results: number
}

