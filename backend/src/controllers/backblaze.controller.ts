import fs from 'fs';
import B2 from 'backblaze-b2';

require('dotenv').config();

const b2 = new B2({
    applicationKeyId: process.env.B2_KEY_ID || '',
    applicationKey: process.env.B2_APP_KEY || ''
});

export class BackblazeController {
    public async uploadOneImage(filePath : string, fileName : string) {
        try {
            await b2.authorize();
            console.log(`[FileUploadController/uploadOneImage] Uploading ${fileName} to backblaze.`);
            const { data: uploadData } = await b2.getUploadUrl({
                bucketId: process.env.B2_BUCKET_ID || ''
            });

            const fileData = fs.readFileSync(filePath);

            const result = await b2.uploadFile({
                uploadUrl: uploadData.uploadUrl,
                uploadAuthToken: uploadData.authorizationToken,
                fileName: fileName,
                data: fileData,
            });
            
            // cleanup local file
            fs.unlinkSync(filePath)
            console.log(`[FileUploadController/uploadOneImage] File uploaded successfully`);
            return result.data.fileName;
        } catch(err)
        {
            console.log(`[FileUploadController/uploadOneImage] ${err}`);
            return null;
        }
    }

    public async deleteImage(fileName : string, fileId : string) {
        try {
            await b2.authorize();
            console.log(`[FileUploadController/deleteImage] Deleting ${fileName} from backblaze.`);
            await b2.deleteFileVersion({
                fileName: fileName,
                fileId: fileId
            });
            console.log(`[FileUploadController/deleteImage] File deleted successfully`);
            return true;
        } catch(err) {
            console.log(`[FileUploadController/deleteImage] ${err}`);
            return false;
        }
    }
}