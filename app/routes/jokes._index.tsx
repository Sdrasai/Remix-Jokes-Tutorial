import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    skip: randomRowNumber,
    take: 1,
  });
  return json({ randomJoke });
};

export default function JokesIndexRoute() {
  const data = useLoaderData<typeof loader>();
  // console.log("++++++++++++++++++++++++",data.randomJoke.name);
  
  return (
    <div>
      <p>Here is a random joke:</p>
      <p>{data.randomJoke.name}</p>
      <Link to={data.randomJoke.id}>
        `{data.randomJoke.name}`` Permalink
      </Link>
    </div>
  );
}
