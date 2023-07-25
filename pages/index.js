import client from "@/client";
import { gql } from "@apollo/client";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blocks }) {
  const { attributes } = blocks[0];
  return (
    <main className={`flex min-h-screen flex-col p-24 ${inter.className}`}>
      <h2>Home Page</h2>
      <Image
        src={attributes.url}
        alt="cover"
        width={attributes.width}
        height={attributes.height}
      />
    </main>
  );
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks
          }
        }
      }
    `,
  });
  return {
    props: {
      blocks: data.nodeByUri.blocks,
    },
  };
};
