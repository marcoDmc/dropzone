import Icons from "@/utils/icons"

interface IconFileProps {
    file: string
    filename: string
}


export function IconFile({ file, filename }: IconFileProps) {
    return (<>
        <strong className="w-full max-w-xl text-xs capitalize max-sm:text-center flex  gap-2 items-center max-sm:grid max-sm:place-items-center transition-all">
            {
                file == "image" && <Icons.BsFileEarmarkImage size={20} style={{ color: "green" }} />
            }
            {
                file == "doc" && <Icons.BsFiletypeDoc size={20} style={{ color: "blue" }} />
            }
            {
                file == "pdf" && <Icons.PiFilePdf size={20} style={{ color: "red" }} />
            }
            {
                file == "excel" && <Icons.RiFileExcel2Line size={20} style={{ color: "orange" }} />
            }
            {
                file == "text" && <Icons.AiFillFileText size={20} style={{ color: "black" }} />
            }
            {filename ? filename : "waiting"}
        </strong>
    </>)
}