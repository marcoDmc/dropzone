
interface ProgressBarProps {
    currentValue: number
    range: number
}

export function ProgressBar({ currentValue, range }: ProgressBarProps) {

    const calculation = (currentValue / range) * 100
    return (<>
        <div className="bg-neutral-300 w-full h-1 rounded overflow-hidden flex">
            <span className={`bg-cyan-500 h-full transition-all`} style={{
                width: `${calculation}%`
            }}></span>
        </div>
    </>)
}