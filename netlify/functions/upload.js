import sharp from "sharp";
import axios from "axios";
import FormData from "form-data";
import Airtable from 'airtable';

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

    const base = new Airtable({ apiKey: AIRTABLE_PAT }).base(AIRTABLE_BASE_ID);

    const body = JSON.parse(event.body);
    if (!body.image || !body.recordId) {
      return { statusCode: 400, body: "No image or recordId provided" };
    }

    const imageBuffer = Buffer.from(body.image, "base64");

    const compressedImage = await sharp(imageBuffer)
      .resize(900) // Max breedte 800px
      .jpeg({ quality: 80 }) // Compressie: 80%
      .toBuffer();

    const formData = new FormData();
    formData.append("image", compressedImage.toString("base64"));
    formData.append("key", process.env.IMGBB_API_KEY);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    if (response.data.success) {
      const result = {
        url: response.data.data.url, // Geef de URL van de geüploade afbeelding terug
      };

      const imageUrl = result.url;

      const updatedData = {
        "image": imageUrl,
      };

      const recordId = body.recordId;

        await base(AIRTABLE_TABLE_NAME).update(recordId, updatedData, (err) => {
        if (err) {
          console.error('Fout bij het bijwerken van het record:', err);
          return;
        }
      });

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result), // Geef de URL van de geüploade afbeelding terug
      };
    } else {
      return {
        headers: {
            "Content-Type": "application/json",
        },
        statusCode: 400,
        body: JSON.stringify({ error: "Upload naar ImgBB mislukt" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
