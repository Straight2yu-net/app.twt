import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: ['.env.local', '.env'] });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Body parser with generous limit for image payloads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Shared Google Gen AI client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Copy & Bio Generation endpoint (gemini-3.8-flash)
app.post('/api/generate-copy', async (req: Request, res: Response) => {
  try {
    const { type, details, tone } = req.body;
    
    let systemInstruction = `You are an elite talent manager and digital publicist specializing in entertainment profiles, IMDb bios, and premium subscription creator pages (OnlyFans, Fansly, Patreon). Provide polished, engaging, top-tier copy.`;
    
    let prompt = '';
    if (type === 'imdb_bio') {
      prompt = `Write a comprehensive, professional IMDb-style Biography for entertainer Christina Lynn Peterson.
Key details:
- Born: June 8, 1986 in Sacramento, California, USA
- Stage Names / Aliases: Teena Fine, Tina Fine, Tina Fey, Christie Lynn Peterson
- Background: Dynamic performer, screen presence, credits and media appearances (including television spots like Sons of Anarchy, Private Practice, indie features, modeling, and acclaimed adult videography features)
- Tone: ${tone || 'Encyclopedic, respectful, industry-grade, engaging'}
- Highlight her versatility, on-camera charisma, verified adult videography (over 4.8M views), creative control over her brand, and Sacramento roots.
Provide:
1. Biography Overview (2-3 paragraphs)
2. Trivia facts (3 points)
3. Personal quote
Format clearly with Markdown.`;
    } else if (type === 'of_bio') {
      prompt = `Create a high-converting, magnetic, and polished profile biography for Christina Lynn Peterson (known widely as Teena Fine / Tina Fine)'s premium subscriber page (OF/Fansly).
Details:
- Performer: Teena Fine / Tina Fine (born 06/08/1986 in Sacramento, CA)
- Personality: Sacramento-born California beauty, confident, interactive, direct VIP connection, exclusive 4K adult clips, verified Pornhub catalog drops, 1-on-1 virtual video bookings
- Tone: ${tone || 'Alluring, warm, exclusive, VIP-focused, charismatic'}
- Extra instructions: ${details || 'Include welcome greeting, what subscribers receive (daily uncensored posts, PPV teasers, VIP priority DM, 1-on-1 private virtual cam bookings from $120), clear boundaries, and custom request instructions.'}
Provide:
1. Tagline / Headline
2. Main Bio
3. Subscriber Perks list
4. Tip Menu suggestions
5. 1-on-1 Virtual Session Booking info
6. Direct message welcome greeting`;
    } else if (type === 'post_caption') {
      prompt = `Write 3 engaging promotional captions for a media clip or photoshoot drop by entertainer Teena Fine (Christina Lynn Peterson).
Post Theme: ${details || 'Exclusive Sacramento sunset shoot, behind the scenes glam, and 1-on-1 virtual cam booking announcement'}
Tone: ${tone || 'Playful, magnetic, seductive, engaging'}
Provide:
1. High-energy teaser caption with call-to-action
2. VIP exclusive / locked post teaser caption
3. Casual/behind-the-scenes caption
Include relevant high-engagement hashtags for each.`;
    } else {
      prompt = `Write creative content for creator Christina Lynn Peterson based on this prompt: ${details || 'Profile highlights'}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    res.json({
      success: true,
      text: response.text || '',
    });
  } catch (error: any) {
    console.error('Error generating copy:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate copy',
    });
  }
});

// Image Creation & Editing Endpoint using gemini-nano-banana-2.1 or gemini-3.1-flash-lite-image
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      aspectRatio = '1:1',
      imageSize = '1K',
      inputImage, // optional data URL for image editing
      modelPreference = 'gemini-nano-banana-2.1',
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Supported aspect ratios
    const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9', '1:4', '4:1'];
    const chosenAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';
    const chosenImageSize = ['1K', '2K', '4K'].includes(imageSize) ? imageSize : '1K';

    // Model selection
    let targetModel = modelPreference === 'gemini-3.1-flash-lite-image'
      ? 'gemini-3.1-flash-lite-image'
      : 'gemini-nano-banana-2.1';

    let parts: any[] = [];

    // If editing an existing image
    if (inputImage && typeof inputImage === 'string') {
      const match = inputImage.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        parts.push({
          inlineData: {
            mimeType,
            data: base64Data,
          },
        });
      }
    }

    parts.push({
      text: prompt,
    });

    let config: any = {};
    if (targetModel === 'gemini-nano-banana-2.1') {
      config.imageConfig = {
        aspectRatio: chosenAspectRatio,
        imageSize: chosenImageSize,
      };
    } else {
      config.imageConfig = {
        aspectRatio: ['1:1', '3:4', '4:3', '9:16', '16:9'].includes(chosenAspectRatio)
          ? chosenAspectRatio
          : '1:1',
      };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: targetModel,
        contents: { parts },
        config,
      });
    } catch (primaryErr: any) {
      console.warn(`Primary model ${targetModel} encountered an issue, trying fallback:`, primaryErr?.message);
      // Fallback to gemini-3.1-flash-lite-image if nano-banana hit specific quota or permissions
      if (targetModel !== 'gemini-3.1-flash-lite-image') {
        targetModel = 'gemini-3.1-flash-lite-image';
        response = await ai.models.generateContent({
          model: targetModel,
          contents: { parts },
          config: {
            imageConfig: {
              aspectRatio: ['1:1', '3:4', '4:3', '9:16', '16:9'].includes(chosenAspectRatio) ? chosenAspectRatio : '1:1',
            },
          },
        });
      } else {
        throw primaryErr;
      }
    }

    // Search candidates for the image inlineData
    let imageUrl: string | null = null;
    let descriptionText: string | null = null;

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const base64EncodeString: string = part.inlineData.data;
        const mime = part.inlineData.mimeType ?? 'image/png';
        imageUrl = `data:${mime};base64,${base64EncodeString}`;
      } else if (part.text) {
        descriptionText = (descriptionText ? descriptionText + '\n' : '') + part.text;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        error: 'No image was generated by the model.',
        textOutput: descriptionText,
      });
    }

    res.json({
      success: true,
      imageUrl,
      modelUsed: targetModel,
      textOutput: descriptionText,
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate or edit image',
    });
  }
});

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
