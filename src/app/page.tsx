import { File } from "@/components/File";

export default function Home() {
  return (

    <>
      <section className="w-full h-screen bg-neutral-400
      flex items-center justify-center
      ">
        <File.Root>
          <File.Content/>
        </File.Root>

      </section>

    </>
  );
}
