import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Ajout de l'intercepteur de réponse
api.interceptors.response.use(
  (response) => {
    // Si la requête passe du premier coup, on retourne la réponse normalement
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 419 et qu'on n'a pas encore réessayé
    if (error.response && error.response.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true; // Marqueur pour éviter une boucle infinie

      try {
        // On va chercher un jeton tout neuf
        await api.get('/sanctum/csrf-cookie');

        // On relance la requête originale qui avait échoué, maintenant que le cookie est à jour
        return api(originalRequest);
      } catch (csrfError) {
        // Si même la récupération du jeton échoue, on rejette l'erreur
        return Promise.reject(csrfError);
      }
    }

    // Pour toutes les autres erreurs, on laisse passer l'erreur
    return Promise.reject(error);
  }
);

export default api;