"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Main = () => {

  const router = useRouter();

  const toDashboard = () => {
    router.push("/main/dashboard");
  }
  return (
    <main className="flex-grow p-4 mb-20">

      <Button onClick={toDashboard}>
        zum Dashboard
      </Button>

    </main>
  );
};


export default Main;