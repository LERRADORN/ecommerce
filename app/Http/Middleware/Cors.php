<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
       /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Set CORS headers
        // $response->header('Access-Control-Allow-Origin', '*');
        // $response->header('Access-Control-Allow-Methods', '*');
        // $response->header('Access-Control-Allow-Headers', '*');

        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', '*');
        $response->header('Access-Control-Allow-Credentials', true);
        $response->header('Access-Control-Allow-Headers', '*');
        $response->header('Accept', 'application/json');

        return $response;
    }


}
