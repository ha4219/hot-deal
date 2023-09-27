import Image from "next/image";
import AuthForm from "./components/AuthForm";
import FilterForm from "./components/FilterForm";
import getFiltering from "../actions/getFiltering";
import FilteringList from "./components/FilteringList";

export default async function Home() {
  const filtering = await getFiltering();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthForm />

      <FilteringList initialItems={filtering} />
      <div>
        <FilterForm />
      </div>
    </main>
  );
}
