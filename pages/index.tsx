import Image from "next/image";
import useAxios from "axios-hooks";
import Layout from "../components/layout";
import { useAppContext } from "../context/state";
import loadConfig from "next/dist/server/config";
interface Person {
  _id: number;
  name: string;
  image: string;
  votes: number;
}
export default function Home() {
  const { battle, refetchBattle, refetchFolks } = useAppContext();

  const [{ data: putData, loading: putLoading, error: putError }, executePut] =
    useAxios(
      {
        url: "http://localhost:3000/api/folks/vote",
        method: "PUT",
      },
      { manual: true }
    );

  const vote = (person: Person) => {
    console.log("TRIGGERD A VOTE");

    executePut({
      data: { _id: person._id },
    });

    // gets us another battle
    refetchBattle();

    // will get us the leaderboard and update the folks object in the global state (context)
    refetchFolks();
  };

  // let withImages = null;
  // if (battle) {
  //   withImages = battle.map((person: Person) => person.hasOwnProperty("image"));
  // }

  // const anyOfTheseHasFalse = withImages.some((person: Person) => false);

  // if (anyOfTheseHasFalse) {
  //   refetchBattle();
  // }
  return (
    <Layout>
      <div className="container is-widescreen  mx-4">
        <div className="columns is-vcentered has-text-centered">
          {battle && battle.length == 0 ? (
            <div>database empty</div>
          ) : (
            <>
              <div className="column ">
                {battle && battle[0].image && (
                  <>
                    {" "}
                    <Image
                      onClick={(e) => {
                        e.persist();

                        console.log(
                          "🚀 ~ file: index.tsx ~ line 64 ~ Home ~ e",
                          e
                        );
                        vote(battle[0]);
                      }}
                      alt={battle[0].name}
                      src={`${process.env.PUBLIC_URL}/static/images/${battle[0].image}`}
                      width={400}
                      height={400}
                      className="img-battle"
                    />
                  </>
                )}
              </div>
              <div className="column ">
                <div className="tile is-child">
                  {battle && battle[1].image && (
                    <>
                      <Image
                        onClick={(e) => {
                          console.log(
                            "🚀 ~ file: index.tsx ~ line 82 ~ Home ~ e",
                            e
                          );
                          e.persist();

                          vote(battle[1]);
                        }}
                        alt={battle[1].name}
                        src={`${process.env.PUBLIC_URL}/static/images/${battle[1].image}`}
                        width={400}
                        height={400}
                        className="img-battle"
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
