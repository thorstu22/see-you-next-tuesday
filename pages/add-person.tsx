import useAxios from "axios-hooks";
import { useState } from "react";
import axios from "axios";

import Layout from "../components/layout";

export default function AddPerson() {
  const [name, setName] = useState(" ");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const postToDatabase = async (name: string) => {
    setSuccess(false);
    setErr("");
    if (name.length <= 1) {
      setErr("please enter a name");
      return;
    }
    const updatedPerson = await axios.post("http://localhost:3000/api/folks", {
      name,
    });

    if (updatedPerson.status === 201) {
      setSuccess(true);
    }
    if (updatedPerson.status === 200) {
      if (updatedPerson.data.data.length >= 1) {
        setErr("person already exists");
      } else {
        setErr("person not found");
      }
    } else if (updatedPerson.status >= 400) {
      setErr("Ran into a problem");
    }
  };

  const [{ data, loading, error }, refetch] = useAxios(
    "http://localhost:3000/api/folks/battle"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Layout>
      <p className="title">Add A Person </p>
      <div className="field has-addons">
        <div className="control">
          <input
            onChange={handleInput}
            className="input"
            type="text"
            placeholder="e.g John Smith"
          />
        </div>
        <div className="control">
          <a
            className="button is-info"
            onClick={() => {
              postToDatabase(name);
            }}
          >
            Add
          </a>
        </div>
      </div>
      {success ? (
        <p className="has-text-white">Got someone successfully</p>
      ) : null}
      {err.length > 0 ? <p className="has-text-white">{err}</p> : null}
    </Layout>
  );
}
