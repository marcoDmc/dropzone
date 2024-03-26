import { File } from "@/components/File";
import { SiMicrosoftexcel } from "react-icons/si";

export default function Home() {
  return (

    <>
      <section className="w-full h-screen bg-neutral-400
      flex items-center justify-center
      ">
        <File.Root>
          <File.Content>
            <File.Card Icon={SiMicrosoftexcel} 
            name="table curriculum.xls"
            styles="bg-green-600 rounded"
            size={20}
            />
          </File.Content>
        </File.Root>

      </section>

    </>
  );
}
