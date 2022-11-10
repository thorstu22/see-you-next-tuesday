import Layout from "../components/layout";
import { useAppContext } from "../context/state";
export default function Leaderboard() {
  // get all folks
  interface Person {
    _id: number;
    name: string;
    image: string;
    votes: number;
  }
  const { folks } = useAppContext();

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th>
              <abbr title="Position">Pos</abbr>
            </th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>
              <abbr title="Position">Pos</abbr>
            </th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </tfoot>
        <tbody>
          {folks &&
            folks.data.map((person: Person) => {
          
              return (
                <tr key={`${person._id}`}>
                  <td key={`${person._id}`}>{person._id}</td>
                  <td key={`${person.name}`}>{person.name}</td>
                  <td key={`${person.votes}`}>{person.votes}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
