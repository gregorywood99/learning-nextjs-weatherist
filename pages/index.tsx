import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SearchParams from "./components/searchParams";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weatherist</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SearchParams />
      </main>
    </div>
  );
};

export default Home;
