const BASE_URL = process.env.BASE_URL ?? '';

type ResponseMapper<T> = (data: Response) => Promise<T>;

function handleResponse<R>(response: Response, responseMapper?: ResponseMapper<R>): Promise<R> {
  if (responseMapper) {
    return Promise.resolve(responseMapper(response));
  } else {
    const contentType: string | null = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return Promise.resolve<R>(response.json());
    } else {
      throw new Error('Default handler supports only json data');
    }
  }
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  responseMapper?: ResponseMapper<T>,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  });

  return handleResponse(response, responseMapper);
}
