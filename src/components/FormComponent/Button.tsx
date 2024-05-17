interface ButtonProps {
    name: string
}



export default function Button({ name }: ButtonProps) {
    return (
        <>
            <button
                className="
            w-full
            bg-blue-600
            hover:opacity-75
            hover:transition-all
            rounded-lg
            p-1 first-letter:capitalize
            text-neutral-100
            my-1
            "
                type="submit"
            >{name}</button>
        </>
    )
}