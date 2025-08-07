
export function Documentation ({apiKey, user, pdf} : {apiKey?: string, user: string | null | undefined, pdf?: string}) {

    return (
       <>
      <div>
        api_key : Entrez l'api_key spécifiée pour le connecteur désiré afin d'effectuer l'impression.
      </div>
      <div className='ds-mb-8'>
        pdf : Entrez votre ticket à imprimer décodé selon le format Base64.
      </div>
      // Mettez votre api key, pdf et userId dans le body de l'url
       <div className='ds-mb-8'>
        Body :
        <br/>
        {`{
          "apiKey" : ${apiKey ? apiKey : 'api_key'},
          "userId" : ${user}, 
          "pdf" : ${pdf ? pdf : 'pdf'}
        }`} 
        </div>
      // Url d'impression
      <div>
        Url : '{import.meta.env.VITE_SERVER_URL}/impression'
      </div>
      <div>
        Method : POST
      </div>
       </>
    )
}