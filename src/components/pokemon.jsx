
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Image, Input } from '@nextui-org/react';

const PokemonCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return pokemonDetail.data;
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error('Error fetching pokemons', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-5 min-h-screen relative"
         style={{ backgroundColor: 'rgb(29, 40, 58)' }}>
      <img
        src="https://www.thegoodgametheory.com/_next/static/media/logo-transparent-dark.1f144641.svg"
        alt="Logo"
        className="h-20 mt-4 mb-8 ml-8 absolute top-0 left-0" // Increased logo size and positioned top left
      />
      <Input
        clearable
        underlined
        labelPlaceholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-8 text-primary max-w-md" // Increased search bar size
      />
      <div className="flex flex-wrap justify-center gap-5">
        {filteredPokemons.map((pokemon) => (
          <Card key={pokemon.id} className="py-4 bg-white text-primary shadow-md">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-lg">{pokemon.name}</h4>
              <p className="text-sm">Height: {pokemon.height}</p>
              <p className="text-sm">Weight: {pokemon.weight}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt={pokemon.name}
                className="object-cover rounded-xl"
                src={pokemon.sprites.front_default}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PokemonCards;
