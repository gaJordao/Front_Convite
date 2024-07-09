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

export type QrcodeResponseType = {
    nome: string;
    chavepix: string;
    valor: string;
    cidade: string;
    txtId: string;
    payload: string;
  };
  
export type DecodedTokenType = {
    exp: number;
    iat: number;
    jti: string;
    token_type: string;
    user_id: React.Key;
  };
  