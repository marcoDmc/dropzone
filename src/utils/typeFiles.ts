const typeFilesImage = [
    "jpg", "gif", "png", "svg", "psd", "webp", "raw", "tiff", "bmp", "jpeg"
]

export const methods = {

    handleFilenameFormatting(filename: string | null): string {

        let file: any = ""
        let firstFileName = ""

        if (!filename) return ""
        const thereAreSpaces = /\s/.test(filename)

        if (filename.length < 20) firstFileName = filename

        if (thereAreSpaces && filename.length >= 20) {
            file = filename.split(" ")
            firstFileName = file[file.length - 1]
        }

        if (!thereAreSpaces && filename.length >= 20) {
            file = filename.split(".")
            firstFileName = file[0].split("")[file.length - 1] + "." + file[1]
        }

        return firstFileName
    },

    handleVerifyFiles(file: string): boolean {
        const files = [
            "jpg", "gif", "png", "svg", "psd", "webp", "raw", "tiff", "bmp", "jpeg",
            "docx", "pdf", "txt", "xlsx"
        ]

        if (!files.includes(file)) return false
        else return true
    }
    ,
    handleReturnTypeFile(file: string): string {


        let value = ""

        if (!file) return ""

        const fileExtension = file.split(".")[1]


        typeFilesImage.forEach(type => {
            if (fileExtension === type) value = "image"
        })

        switch (fileExtension) {
            case "txt":

                value = "text"
                break;
            case "pdf":
                value = "pdf"
                break
            case "docx":
                value = "doc"
                break
            case "xlsx":
                value = "excel"
                break
        }
        return value
    },


    convertingMeasurements(size: number): string {
        const KB = 1024;
        const MB = KB * KB;
        const GB = MB * KB;

        if (size < KB) {
            return size + ' b';
        } else if (size < MB) {
            return (size / KB).toFixed(2) + ' kb';
        } else if (size < GB) {
            return (size / MB).toFixed(2) + ' mb';
        } else {
            return (size / GB).toFixed(2) + ' gb';
        }
    }
}
