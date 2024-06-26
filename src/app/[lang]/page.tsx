import Link from "next/link";

import { CreatePost } from "@/app/[lang]/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Miaou from "./_components/miaou"
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";


export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale};
}) {
  const dictionary = await getDictionary(lang, "landing");
  const hello = await api.post.hello({ text: "hello" });
  const session = await getServerAuthSession();
  const latestPost = await api.post.getLatest();
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {dictionary.create} <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">{dictionary.first} →</h3>
            <div className="text-lg">
              {dictionary.basics}
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              {dictionary.learnMore}
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>{dictionary.loggedIn} {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign Out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
      <CrudShowcase params={{ lang }} />
      { latestPost === undefined || 
      <Miaou data={latestPost} text={dictionary}/>
      }
    </main>
  );
}

async function CrudShowcase(
  {
  params: { lang },
}: {
  params: { lang: Locale};
}
) {

  const dictionary = await getDictionary(lang, "landing");
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">{dictionary.recentPosts}: {latestPost.name}</p>
      ) : (
        <p>{dictionary.noPostRecent}.</p>
      )}

      <CreatePost />
    </div>
  );
}