interface ChampionSummary {
  id: string;
  key: string;
  name: string;
  title: string;
}

let cachedVersion: string | null = null;
let cachedVersionTimestamp = 0;
let cachedChampionsByKey: Map<string, ChampionSummary> | null = null;

const CACHE_DURATION_MS = 1000 * 60 * 60 * 6;

export async function getLatestDDragonVersion(): Promise<string> {
  const now = Date.now();
  if (cachedVersion && now - cachedVersionTimestamp < CACHE_DURATION_MS) {
    return cachedVersion;
  }

  try {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
      next: { revalidate: 21600 },
    });
    if (!res.ok) throw new Error('Failed to fetch ddragon versions');
    const versions = (await res.json()) as string[];
    cachedVersion = versions[0] || '14.24.1';
    cachedVersionTimestamp = now;
    return cachedVersion;
  } catch (err) {
    console.error('Error fetching latest DDragon version:', err);
    return cachedVersion || '14.24.1';
  }
}

export async function getChampionsMap(): Promise<Map<string, ChampionSummary>> {
  if (cachedChampionsByKey) {
    return cachedChampionsByKey;
  }

  const version = await getLatestDDragonVersion();
  const map = new Map<string, ChampionSummary>();

  try {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error('Failed to fetch champions data');

    const json = await res.json();
    const data = json.data as Record<string, { id: string; key: string; name: string; title: string }>;

    for (const key of Object.keys(data)) {
      const champ = data[key];
      map.set(champ.key, {
        id: champ.id,
        key: champ.key,
        name: champ.name,
        title: champ.title,
      });
    }

    cachedChampionsByKey = map;
    return map;
  } catch (err) {
    console.error('Error fetching champion map:', err);
    return map;
  }
}

export async function getChampionInfoById(champId: number) {
  const map = await getChampionsMap();
  const champ = map.get(champId.toString());
  const version = await getLatestDDragonVersion();

  if (!champ) {
    return {
      name: `Campeão #${champId}`,
      title: 'Invocador',
      id: 'Unknown',
      iconUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Annie.png`,
      splashUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Annie_0.jpg`,
    };
  }

  return {
    name: champ.name,
    title: champ.title,
    id: champ.id,
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`,
    splashUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
  };
}

export async function getProfileIconUrl(iconId: number): Promise<string> {
  const version = await getLatestDDragonVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;
}
