import React from "react"

export type DoacaoType = {
    id: React.Key
    usuario: {
        id: React.Key
        username: string
        email: string
    },
    comprovanteUrl: string
    valor:number
    criacao: string
    ativo: boolean
}

export type ItemListaType = {
    id: React.Key
    nome: string
    imagemUrl: string
    descricao: string
    valor: number
    qtdPessoa: number
    criacao: string
    doacoes: DoacaoType[]
}