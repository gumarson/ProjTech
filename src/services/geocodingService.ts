export async function getCoordinates(street: string, city: string, state: string) {
  const baseUrl = 'https://nominatim.openstreetmap.org/search';
  const query = `${street}, ${city}, ${state}, Brazil`;

  const url = `${baseUrl}?q=${encodeURIComponent(query)}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Projtech/1.0 (projtech@gmail.com)',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar coordenadas: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Nenhum resultado encontrado para o endereço informado.');
    }

    const { lat, lon } = data[0];

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    };
  } catch (error) {
    console.error('Erro em getCoordinates:', error);
    return null;
  }
}
