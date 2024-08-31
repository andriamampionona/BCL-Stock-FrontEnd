import axios from 'axios';
import { useSession } from 'next-auth/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export const updatePeriode = async (periodeId: string, data: any, bearerData: string) => {
  try {
    const response = await axios.put(`${apiUrl}/periode/${periodeId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating periode:', error);
    throw error;
  }
};

export const getAllPeriode = async () => {
  try {
    const response = await axios.get(`${apiUrl}/periode`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });

    if (response.data) {
    
      return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error updating periode:', error);
    throw error;
    return {Erreur: "Erreur lors de l' accès au donnée"}

  }

}

export const deleteperiode = async (periodeId: string, bearerData: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/periode/${periodeId}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });

    if (response.data?.Message) {
    return response.data;
        
    }else if(response.data?.Erreur){
      return response.data;
    }
    else {

        return {Erreur: "Impossible ...."};

    }
} catch (error) {
    console.error('Error updating periode:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}

  }
};

export const addperiode = async ( data: any) => {
  try {
    const response = await axios.post(`${apiUrl}/periode`, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },
    });
    if (response.data?.Message) {
    return response.data;
        
    }else{

        return {Erreur: "Impossible ...."};

    }

  } catch (error) {
    console.error('Error adding periode:', error);
    // throw error;
    return {"Erreur": "Erreur lors de l' accès au donnée"}
}
};


export const getPeriodeByID = async(id: string, bearerData: string) => {
 
 const response = await axios.get(`${apiUrl}/periode/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
      },})

    return response.data;


}