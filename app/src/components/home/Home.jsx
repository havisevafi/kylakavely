import { useRouteLoaderData } from 'react-router';
import { AttractionCard } from './AttractionCard.jsx';

export const Home = () => {
  const { destinations } = useRouteLoaderData('destinations');

  const destinationCards = Object.entries(destinations).map(([id, data]) => {
    console.log(`id=${id} => ${data.title}`);
    return (
      <AttractionCard key={id} id={id} image={data.image} title={data.title} />
    );
  });

  return (
    <div>
      <ul>{destinationCards}</ul>
    </div>
  );
};
