import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Icons from "@/utils/icons";
import { motion } from "framer-motion";
import { ProgressBar } from './ProgressBar';
import { IconFile } from './IconFile';

interface FormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleGetNameFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    size: string;
    file: string;
    filename: string;
    type: string;
    range: number | null;
    status: number | null;
    url: string;
    spinner: boolean;
    setRange: Dispatch<SetStateAction<{ status: number; spinner: boolean; range: number; }>>;
}

export function Form({ handleSubmit, handleGetNameFile, size, file, filename, type, range, status, url, spinner, setRange }: FormProps) {

    const [currentValue, setCurrentValue] = useState(0)

    useEffect(() => {
        function handleAddEveryTwoSeconds(baseNumber: number) {
            const intervalId = setInterval(() => {
                setCurrentValue(prev => {
                    const newValue = prev + 100;

                    if (newValue >= baseNumber) {
                        clearInterval(intervalId);
                        return baseNumber;
                    }
                    return newValue;
                });
            }, 1000);
            return intervalId;
        }
        const intervalId = handleAddEveryTwoSeconds(Number(range));
        return () => clearInterval(intervalId);
    }, [range])



    useEffect(() => {
        if (currentValue >= Number(range)) setRange(prev => ({ ...prev, spinner: false }))
    }, [currentValue])

    return (<>
        <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="grid bg-neutral-100 w-full max-w-96 overflow-hidden rounded h-auto gap-5 p-5 shadow-lg relative  shadow-neutral-500">
            <h1 className="first-letter:uppercase font-bold text-2xl w-full text-start transition-all text-zinc-900">drop zone</h1>
            <div className="w-full h-full min-h-32 grid place-items-center border p-2 gap-10 border-zinc-500 border-dashed relative rounded bg-cyan-200 hover:bg-opacity-25 transition-all hover:transition-all cursor-pointer">
                <Icons.IoCloudUploadSharp size={35} className="text-zinc-600" />
                <input onChange={handleGetNameFile} type="file" name="file" id="file" className="w-full h-full bg-red-300 absolute opacity-0 cursor-pointer transition-all" />
                <p className="text-neutral-500 font-semibold text-xs w-full flex items-center justify-center gap-2 max-sm:grid max-sm:place-items-center transition-all">Drag and drop file or
                    <span className="first-letter:uppercase underline">choose file</span></p>
            </div>
            <span className="px-2 text-neutral-400 font-medium flex w-full items-center justify-between max-sm:grid max-sm:gap-4 transition-all">
                <p className="text-xs w- full first-letter:uppercase">supported formats: img/txt/pdf/doc/xlsx</p>
                <p className="text-xs font-bold">size: <span className="text-zinc-900">{size ? size : "..."}</span></p></span>
            <div className="grid  place-items-center rounded pl-2 gap-16 grid-cols-3 bg-neutral-100 shadow-md h-full min-h-32 w-full min-w-full max-sm:grid-cols-1 max-sm:gap-3 transition-all py-2">
                <div className="grid w-full gap-5 col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-1 transition-all p-3 bg-neutral-100">
                    <IconFile file={file} filename={filename} />
                    <p className="w-full max-w-xl text-xs text-neutral-800 max-sm:text-center whitespace-nowrap overflow-hidden text-ellipsis">{type ? type : "..."}</p>
                    {
                        Number(range) > 0 && <ProgressBar currentValue={currentValue} range={Number(range)} />
                    }
                </div>
                {
                    status === 201 && currentValue > 0 && !spinner && (<a href={url} download={filename}><div className="hover:border-cyan-500 transition-all
                  w-full max-w-14 cursor-pointer p-2 rounded bg-neutral-100 border flex items-center justify-center">
                        <Icons.ImDownload size={16} style={{ color: "rgb(6 182 212)" }} />
                    </div>
                    </a>
                    )
                }

                {
                    spinner && (
                        <motion.div className="w-full max-w-7 bg-cyan-500 rounded-full h-full max-h-7 relative flex items-center justify-center
                        after:absolute after:content-[''] after:rounded-full after:bg-slate-50 after:w-full after:max-w-5
                        after:h-full after:max-h-5 before:absolute before:content-[''] before:bg-slate-50 before:w-full
                        before:max-w-3 before:h-full before:max-h-1.5 before:top-0"
                            animate={{ rotate: 360 }}
                            transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                        />
                    )
                }
            </div>


            <div className="w-full flex justify-end items-center gap-1 max-sm:justify-center transition-all"
            >
                <button
                    className={
                        filename ?
                            "bg-zinc-900 w-full max-w-20 p-1.5 outline-none text-neutral-100 rounded border border-cyan-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all cursor-pointer hover:scale-105 hover:transition-all opacity-100"
                            : "bg-neutral-300 w-full max-w-20 p-1.5 text-neutral-500 rounded border border-neutral-400 font-semibold text-xs shadow-md shadow-neutral-400 capitalize transition-all cursor-none pointer-events-none opacity-35"
                    }
                >ulpload
                </button>
            </div>

        </form>
    </>)
}