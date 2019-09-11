<?php
Route::get("/","chatControllar@home");
Route::get("chat","chatControllar@chat")->name("chat");
Route::post("send","chatControllar@send");
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
