import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const getTotal = async (bearerData: string) => {
  try {
    const response = await axios.get(`${apiUrl}/article/total-amount`, {
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
   
    return {Erreur: "Erreur lors de l' accès au donnée"}

  }

}



export const getTotalArticle = async ( bearerData: string) => {
       
        const res = await fetch(`${apiUrl}/article/total-amount/1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " +bearerData,
          },
          
         
        });

        if (res.ok){    
            const data = await res.json();      
            return data.Total
        }

        else
            return null;
        
         
      };

      
export const getTotalArticleOut = async (bearerData: string) => {
       
        const res = await fetch(`${apiUrl}/article/total-amount-out/1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + bearerData,
          },
          
         
        });

        if (res.ok){    
            const data = await res.json();      
            return data.Total
        }

        else
            return null;
        
};