import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
})

export const ModifArticleInSchema = z.object({
    
    nom: z.string().min(3),
    category: z.string().min(3),
    quantite: z.number().min(1),
    pu: z.number().min(1),
    periode: z.string().min(1),
})


export const OutArticleInSchema = z.object({
    description: z.string().min(5),
    quantite: z.string().min(1),
    
})

export const EditArticleOuSchema = z.object({
    description: z.string().min(5),
    quantite: z.string().min(1),
    
})


export const EditGroupSchema = z.object({
    groupName: z.string().min(2),    
})

export const ShearchSchema = z.object({
      
    periode: z.string().min(1),    
})


// USERS 

export const USERS = z.object({
    nom: z.string().min(5),
    email: z.string().email(),
    mdp: z.string().min(5),
    
})

export const USERS_EDIT = z.object({
    nom: z.string().min(5),
    email: z.string().email(),
    actif: z.boolean(),
    role: z.string().min(5),
    mdp: z.string().min(5),
    
})


export const PERIODE = z.object({
    dateDebut: z.date(),
    dateFin: z.date(),
    designation: z.string().min(2)
})

export type CardData = {
    id: string
    label: string
    nom: string
    montant: string    
}

export type STOCK_DATA = {
    nomArticle: string
    qte: number
    out: number
    stock: number    
}