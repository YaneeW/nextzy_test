interface HomeItemDTO {
    id: number,
    backdrop: string,
    original_name: string,
    name: string,
    overview: string,
    vote_average: number,
    original_language: string
}



export interface HomesDTO {
    page: number,
    results: HomeItemDTO[],
    total_pages: number,
    total_results: number
}

