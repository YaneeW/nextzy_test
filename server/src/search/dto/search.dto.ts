interface SearchItemDTO {
    id: number,
    backdrop: string,
    original_name: string,
    name: string,
    overview: string,
    vote_average: number,
    original_language: string
}



export interface SearchDTO {
    page: number,
    results: SearchItemDTO[],
    total_pages: number,
    total_results: number
}

