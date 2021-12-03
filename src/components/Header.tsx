import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Header() {
    interface GenreResponseProps {
        id: number;
        name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
        title: string;
      }
      
      interface MovieProps {
        imdbID: string;
        Title: string;
        Poster: string;
        Ratings: Array<{
          Source: string;
          Value: string;
        }>;
        Runtime: string;
      }
      
      interface IContentProps {
        selectedGenreId: number;
      }
      
      export function Content({ selectedGenreId }: IContentProps) {
        const [movies, setMovies] = useState<MovieProps[]>([]);
        const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
      
        useEffect(() => {
          api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
          });
      
          api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
          })
        }, [selectedGenreId]);
      
        return (
          <div className="container">
            <header>
              <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
            </header>
            )
}