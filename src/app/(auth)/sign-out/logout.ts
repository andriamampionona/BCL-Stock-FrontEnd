import { NextApiRequest, NextApiResponse } from 'next';
import { signOut } from 'next-auth/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Envoyer une requête au backend pour gérer la déconnexion
      const response = await fetch(`${apiUrl}/deconnection`, { // Modifier avec votre URL API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${req.cookies['next-auth.session-token']}` // Utilisez le token si nécessaire
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to logout on backend.' });
      }

      // Déconnecter l'utilisateur côté client
      await signOut({ redirect: true });
      
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}