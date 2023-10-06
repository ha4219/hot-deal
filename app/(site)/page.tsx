import Image from "next/image";
import AuthForm from "./components/AuthForm";
import FilterForm from "./components/FilterForm";
import getFiltering from "../actions/getFiltering";
import FilteringList from "./components/FilteringList";
import Link from "next/link";
import Body from "./components/Body";

interface IParams {
  page: number;
}

export default async function Home({ params }: { params: IParams }) {
  const filtering = await getFiltering();

  console.log(params.page);
  return (
    <main className="min-h-screen p-24">
      <AuthForm />

      <FilteringList initialItems={filtering} />
      <Body />
    </main>
  );
}
