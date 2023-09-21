<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
use App\Http\Controllers\Auth\LoginController;


Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/login', [LoginController::class, 'login'])->name('login.api');
    Route::post('/register', [LoginController::class, 'register'])->name('register.api');
});
Route::group(['middleware' => ['auth:api','cors', 'json.response']], function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout.api');

});


