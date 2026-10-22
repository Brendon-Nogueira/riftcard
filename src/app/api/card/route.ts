import { NextRequest, NextResponse } from 'next/server';
import { generatePlayerCard } from '@/lib/riot/service';
import { RegionPlatform } from '@/lib/riot/types';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const gameName = searchParams.get('gameName');
    const tagLine = searchParams.get('tagLine');
    const region = (searchParams.get('region') || 'br1') as RegionPlatform;

    if (!gameName || !tagLine) {
      return NextResponse.json(
        {
          error: 'Parâmetros inválidos: "gameName" e "tagLine" são obrigatórios (ex: gameName=Faker&tagLine=T1).',
        },
        { status: 400 }
      );
    }


    const cleanGameName = gameName.trim();
    const cleanTagLine = tagLine.trim().replace(/^#/, '');

    if (cleanGameName.length === 0 || cleanTagLine.length === 0) {
      return NextResponse.json(
        { error: 'Nome de jogo ou TagLine vazios.' },
        { status: 400 }
      );
    }

    const cardData = await generatePlayerCard(cleanGameName, cleanTagLine, region);

    return NextResponse.json(cardData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API /api/card error:', err.message);

    let status = 500;
    let message = 'Ocorreu um erro interno ao gerar o card.';

    if (err.message.startsWith('NOT_FOUND')) {
      status = 404;
      message = 'Invocador não encontrado no servidor selecionado. Verifique o Nome e a Tag.';
    } else if (err.message.startsWith('API_KEY_INVALID')) {
      status = 401;
      message = 'Chave da Riot API expirada ou inválida. Atualize o arquivo .env.local no servidor.';
    } else if (err.message.startsWith('RATE_LIMITED')) {
      status = 429;
      message = 'Muitas requisições no momento. Por favor, aguarde alguns instantes.';
    } else if (err.message.startsWith('CONFIG_ERROR')) {
      status = 500;
      message = 'Configuração do servidor incompleta: Chave da Riot API ausente.';
    }

    return NextResponse.json(
      {
        error: message,
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      },
      { status }
    );
  }
}
