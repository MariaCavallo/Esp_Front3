import { NextRequest, NextResponse } from "next/server";

export function  middleware(req: NextRequest){
    const cookie = req.cookies.get('Access')
    const url = req.nextUrl.pathname

    if(url.includes("/home") || url.includes("/students")){
        if(!cookie){
            return NextResponse.redirect("http://localhost:3000/")
        }
    }
}



/*
 * Las rutas de la API proporcionan middlewares integrados que analizan la solicitud entrante
    (req). Estos middlewares son:
        ● req.cookies: un objeto que contiene las cookies enviadas por la solicitud.
        ● req.query: un objeto que contiene la cadena de consulta.
        ● req.body: un objeto que contiene el cuerpo analizado por el tipo de contenido, o null
        si no se envió ningún cuerpo.

 * Los auxiliares incluidos son:
        ● res.status(code): una función para establecer el código de estado. Debe ser un
        código de estado HTTP válido.
        ● res.json(body): envía una respuesta JSON. body debe ser un objeto serializable.
        ● res.send(body): envía la respuesta HTTP. body puede ser una cadena, un objeto o
        un buffer.
        ● res.redirect([status,] path): redirige a una ruta o URL especificada.
        ● res.unstable_revalidate(urlPath): revalida una página bajo demanda utilizando
        getStaticProps. urlPath debe ser una cadena.
*/