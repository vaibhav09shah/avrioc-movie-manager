export interface FilmsDTO {
    name: string;
    desc: string;
    releaseDate: Date;
    rating: number;
    ticketPrice: number;
    country: string;
    genre: string[],
    photo: string
}