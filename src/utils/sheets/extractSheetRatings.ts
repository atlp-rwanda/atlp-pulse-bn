import { GraphQLError } from "graphql"
import { FileUpload, ReadStream } from "graphql-upload-ts"
import * as XLSX from "xlsx"
import { User } from "../../models/user"

export type FileRating={
    email: string,
    quantity: number,
    feedBacks: string,
    quality: number,
    professional_skills: number,
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const extractSheetRatings = async(file: FileUpload): Promise<{validRows: FileRating[], invalidRows: FileRating[]}>=>{
    try{
        const validRows: FileRating[] = []
        const invalidRows: FileRating[] = []
        const dataStream: ReadStream = file.createReadStream()
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
            console.log(data)
            for(const rating of data){
                if(
                    !emailRegex.test(rating.email) ||
                    rating.quality > 2 ||
                    rating.quality < 0 ||
                    rating.quantity > 2 ||
                    rating.quantity < 0 ||
                    rating.professional_skills > 2 ||
                    rating.professional_skills < 0
                ){
                    invalidRows.push(rating)
                }else{
                    validRows.push(rating)
                }
            }
        })
        return {validRows, invalidRows}
    }catch(error: any){
        console.log(error)
        throw new GraphQLError("Failed to process file",{
            extensions:{
                code: "FILE_PROCESSING_ERROR"
            }
        })
    }
}