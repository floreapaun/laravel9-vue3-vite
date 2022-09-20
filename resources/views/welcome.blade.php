<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel CRUD APP</title>

        @vite(['resources/sass/app.scss', 'resources/js/app.js'])
        
        <!--
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script type="module" scr="{{ asset('js/app.js') }}" defer></script>
        -->

    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
