import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   try {
      const { topic } = await req.json();

      if (!topic) {
         return NextResponse.json(
            { error: 'O assunto é obrigatório.' },
            { status: 400 }
         );
      }

      const openaiResponse = await fetch(
         'https://api.openai.com/v1/images/generations',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
               model: 'dall-e-3',
               prompt: `Imagem criativa e impactante para um post no Facebook sobre: ${topic}`,
               n: 1, // Número de imagens
               size: '1024x1024', // Tamanho da imagem
            }),
         }
      );

      const data = await openaiResponse.json();
      const imageUrl = data.data?.[0]?.url || null;

      return NextResponse.json({ imageUrl });
   } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      return NextResponse.json(
         { error: 'Erro ao gerar imagem.' },
         { status: 500 }
      );
   }
}
