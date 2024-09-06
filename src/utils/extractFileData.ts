import { ReadStream } from 'fs';
import { GraphQLError } from 'graphql';
import * as xlsx from 'xlsx';

const EmailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Role = 'trainee' | 'admin' | 'ttl' | 'coordinator';

export async function extractFileData(file: any) {
  try {
    const { createReadStream, filename } = await file;
    const stream: ReadStream = createReadStream();

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: any[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });

    const workbook: xlsx.WorkBook = xlsx.read(buffer, { type: 'buffer' });
    const invitees: { email: string; role: Role }[] = [];
    const invalidRows: string[] = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];
      const data: any[] = xlsx.utils.sheet_to_json(worksheet);

      data.forEach((row) => {
        const email = (row as { email?: string }).email?.trim();
        const role = (row as { role?: string }).role?.trim().toLowerCase();

        const validRoles: Role[] = ['trainee', 'admin', 'ttl', 'coordinator'];
        if (email && EmailPattern.test(email) && role && validRoles.includes(role as Role)) {
          invitees.push({ email, role: role as Role });
        } else {
          invalidRows.push(JSON.stringify(row));
        }
      });
    });

    return { invitees, invalidRows, filename };
  } catch (error) {
    throw new GraphQLError('Failed to process the file.', {
      extensions: {
        code: 'FILE_PROCESSING_ERROR',
      },
    });
  }
}
