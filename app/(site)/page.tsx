import AuthForm from "./components/AuthForm";
import Body from "./components/Body";
import { FilteringContextProvider } from "../context/FilteringContext";

interface IParams {
  page: number;
}

export default async function Home({ params }: { params: IParams }) {
  return (
    <main className="min-h-screen p-24">
      <div className="mx-auto max-w-[90%]  sm:max-w-2xl lg:max-w-4xl">
        <AuthForm />

        <FilteringContextProvider>
          <Body />
        </FilteringContextProvider>
      </div>
    </main>
  );
}
