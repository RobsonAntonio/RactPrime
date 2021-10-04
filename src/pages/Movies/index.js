import React, { useEffect, useState } from "react";

import { View, Text } from 'react-native';
import Header from "../../components/Header";
import FavoriteItem from "../../components/FavoriteItem";
import { getMoviesSave, deleteMovie } from '../../utils/storage';
import { useNavigation, useIsFocused } from "@react-navigation/native";


import { Container, ListMovies } from './style';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.development";
function Movies() {
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    useEffect(() => {
        let isActive = true;


        async function getFavoriteMovies() {
            const result = await getMoviesSave('@primereact')

            if (isActive) {
                setMovies(result);

            }
        }
        if (isActive) {
            getFavoriteMovies();
        }

        return () => {
            isActive = false;
        }

    }, [isFocused]);


async function handleDelete(id){
    const result = await deleteMovie(id);
    setMovies(result);
    
}

function navigateDetailsPage(item) {
    navigation.navigate('Detail', {id: item.id})
    
}


    return (
        <Container>
            <Header title="Meus Filmes" />
            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={ item => String(item.id)}
                renderItem={ ({item}) => (
                    <FavoriteItem
                    data={item}
                    deleteMovie={handleDelete}
                    navigatePage ={() => navigateDetailsPage(item)}
                    
                    />
                )}
            />

        </Container>

    )
}

export default Movies;