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
         'https://api.openai.com/v1/chat/completions',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
               model: 'gpt-4',
               messages: [
                  {
                     role: 'system',
                     content:
                        'Você é um especialista em posts criativos para Facebook.',
                  },
                  {
                     role: 'user',
                     content: `Crie um post otimizado sobre: "${topic}". Sugira hashtags. Sem observações adicionais referente ao conteúdo, somente o post.`,
                  },
               ],
               max_tokens: 300,
            }),
         }
      );

      const data = await openaiResponse.json();
      const postContent =
         data.choices?.[0]?.message?.content ||
         'Não foi possível gerar um post.';

      return NextResponse.json({ message: postContent });
   } catch (error) {
      console.error('Erro ao gerar post:', error);
      return NextResponse.json(
         { error: 'Erro interno ao gerar post.' },
         { status: 500 }
      );
   }
}
