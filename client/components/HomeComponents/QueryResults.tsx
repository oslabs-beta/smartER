import React, { FC, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import DataTable, { Direction } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { HomepageContext } from '../../Context';

const sampleData = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    runtime: '92',
    genres: ['Comedy', 'Fantasy'],
    director: 'Tim Burton',
    actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
  },
  {
    id: 2,
    title: 'The Cotton Club',
    year: '1984',
    runtime: '127',
    genres: ['Crime', 'Drama', 'Music'],
    director: 'Francis Ford Coppola',
    actors: 'Richard Gere, Gregory Hines, Diane Lane, Lonette McKee',
    plot: 'The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
  },
  {
    id: 3,
    title: 'The Shawshank Redemption',
    year: '1994',
    runtime: '142',
    genres: ['Crime', 'Drama'],
    director: 'Frank Darabont',
    actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg',
  },
  {
    id: 4,
    title: 'Crocodile Dundee',
    year: '1986',
    runtime: '97',
    genres: ['Adventure', 'Comedy'],
    director: 'Peter Faiman',
    actors: 'Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil',
    plot: 'An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg',
  },
];

const QueryResults: React.FC<{}> = () => {
  const { queryString, setQueryString } = useContext(HomepageContext)!;
  const { submit, setSubmit } = useContext(HomepageContext)!;
  const { history, setHistory } = useContext(HomepageContext)!;
  const [dataTable, setDataTable] = useState([]);

  const columns = [
    {
      name: 'title',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'year',
      selector: 'year',
      sortable: true,
    },
    {
      name: 'director',
      selector: 'director',
      sortable: true,
    },
    {
      name: 'actors',
      selector: 'actors',
      sortable: true,
    },
  ];
  //   useEffect(() => {
  //     // send queryString to backend and get the data from the query

  //     console.log('queryString: ', queryString);
  //     console.log('submit: ', submit);
  //     console.log('history: ', history);
  //   }, []);

  return (
    <>
      <div className="query-table">
        <div className="query-table">
          <DataTable
            title="films"
            columns={columns}
            data={sampleData}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="50vh"
          />
        </div>
      </div>
    </>
  );
};

export default QueryResults;

// need to install
// npm i --save-dev @types/react-resizable
