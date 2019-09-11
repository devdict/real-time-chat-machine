<?php

namespace App\Http\Controllers;

use App\Events\chatEvent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class chatControllar extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function home(){
        return view('welcome');
    }
    public function chat(){
        return view('chat');
    }
    public function send(Request $request){
        $user = User::find(Auth::user()->id);
        event(new chatEvent($request->message,$user));
    }

//    public function send(){
//        $message = "Hello";
//        $user = User::find(Auth::user()->id);
//        event(new chatEvent($message,$user));
//        return back();
//    }
}
