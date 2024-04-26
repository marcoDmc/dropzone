const typeFilesImage = [
    "jpg", "gif", "png", "svg", "psd", "raw", "tiff", "bmp", "jpeg"
]

export const methods = {

    handleFilenameFormatting(filename: string): string {

        let file: any = ""
        let firstFileName = ""
        const lenght = 30

        if (!filename) return ""
        const thereAreSpaces = /\s/.test(filename)

        if (filename.length < lenght) firstFileName = filename

        if (thereAreSpaces && filename.length >= lenght) {
            file = filename.split(" ")
            firstFileName = file[file.length - 1]
        }

        if (!thereAreSpaces && filename.length >= lenght) {
            file = filename.split(".")
            firstFileName = file[0].split("")[file.length - 1] + "." + file[1]
        }

        return firstFileName
    },

    handleVerifyFiles(file: string): boolean {
        const files = [
            "jpg", "gif", "png", "svg", "psd", "raw", "tiff", "bmp", "jpeg",
            "docx", "pdf", "txt", "xlsx"
        ]

        if (files.includes(file)) return true
        else return false
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

    handleConvertingMeasurements(size: string): string {
        const sz = parseInt(size)
        const KB = 1024;
        const MB = KB * KB;
        const GB = MB * KB;

        if (sz < KB) {
            return sz + ' b';
        } else if (sz < MB) {
            return (sz / KB).toFixed(2) + ' kb';
        } else if (sz < GB) {
            return (sz / MB).toFixed(2) + ' mb';
        } else {
            return (sz / GB).toFixed(2) + ' gb';
        }
    },

    handleVerifyEmail(email: string): boolean {

        const rgxEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !rgxEmail.test(email)) {

            return false
        }

        return true
    },

    handleVerifyPassword(password: string): boolean {

        const rgxPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        if (!password || !rgxPwd.test(password)) {

            return false
        }

        return true
    },
    handleVerifyNickname(nickname: string): boolean {

        const rgxName = /^[a-zA-Z\s]+$/;

        if (!nickname || !rgxName.test(nickname)) {
            return false
        }

        return true
    },
    handleSaveTokenLocal(token: string) {
        localStorage.setItem("token", token)
    }

}
