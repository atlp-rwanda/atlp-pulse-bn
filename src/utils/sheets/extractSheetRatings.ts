import { GraphQLError } from "graphql"
import { FileUpload, ReadStream } from "graphql-upload-ts"
import * as XLSX from "xlsx"

export type FileRating={
    email: string,
    quantity: number,
    feedBacks: string,
    quality: number,
    professional_skills: number,
}

const isValidValue = (value: any)=> !isNaN(parseInt(value,10)) && value <= 2 && value >= 0

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const extractSheetRatings = async(file: FileUpload): Promise<{validRows: FileRating[], invalidRows: FileRating[]}>=>{
    try{
        const validRows: FileRating[] = []
        const invalidRows: FileRating[] = []
        const { createReadStream }  = await file
        const dataStream: ReadStream = createReadStream()
        const dataBuffer = new Promise<Buffer>((resolve, reject)=>{
            const data: Buffer[] = []
            dataStream.on('data',(chunk)=>{
                data.push(chunk)
            })
            dataStream.on('error',()=>reject)
            dataStream.on('end',()=>resolve(Buffer.concat(data)))
        })
        const workbook = XLSX.read(await dataBuffer,{ type: "buffer"})
        workbook.SheetNames.forEach((SheetName: string)=>{
            const sheetData = workbook.Sheets[SheetName]
            const data: FileRating[] = XLSX.utils.sheet_to_json(sheetData)
            for(const rating of data){
                if(
                    !emailRegex.test(rating.email) ||
                    !isValidValue(rating.quantity) ||
                    !isValidValue(rating.quality) ||
                    !isValidValue(rating.professional_skills) ||
                    !rating.feedBacks
                ){
                    invalidRows.push(rating)
                }else{
                    validRows.push(rating)
                }
            }
        })
        if(!validRows.length){
            throw new GraphQLError("No valid rows found in the file",{
                extensions: {
                    code: "FILE_PROCESSING_ERROR"
                }
            })
        }
        return {validRows, invalidRows}
    }catch(error: any){
        if (error instanceof GraphQLError) {
            throw error
        } else {
            throw new GraphQLError("Failed to process file", {
                extensions: {
                    code: "FILE_PROCESSING_ERROR"
                }
            })
        }
    }
}