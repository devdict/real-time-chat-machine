@extends('layouts.app')
@section('content')
<div class="container">
    <div class="mt-3 row" id="app">
      <div class="offset-md-4 card main-content">
          <li class="list-group-item active">
              <h1>Real Time Chatting Machine</h1></li><br>
                <div class="px-3 pb-3">
                    <small class="badge badge-pill badge-primary float-left">@{{ activeUser }}</small><br>
                    <ul class="list-group msg" v-chat-scroll>
                        <message
                                v-for="value,index in chat.message"
                                :key=value.index
                                :color=chat.color[index]
                                :user=chat.user[index]
                                :time=chat.time[index]
                        >
                            @{{ value }}
                        </message>
                    </ul>
                    <small class="badge badge-light text-dark badge-pill">@{{ typing }}</small>
                <div class="input-group">
                    <input type="text" class="form-control" v-on:keyup.enter="send" v-model="message" id="inlineFormInputGroupUsername" placeholder="Type your message here....">
                </div>
            </div>
      </div>
    </div>
</div>
@endsection


